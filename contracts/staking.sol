// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract staking {
  using SafeMath for uint256;
    IERC20 private lpToken;
    IERC20 private creatorToken;
    uint256 public id;

    struct Pool {
      uint256 totalStakers;
      uint256 totalStaked;
      uint256 rewardReserve;
      uint256 rewardRate; //daily
      mapping(address => uint256) stakersBalances;
      mapping(address => uint256) stakerRewardPerSec;
      mapping(address => uint256) stakerStoredReward;
      mapping(address => uint256) stakerLastUpdatedTime;
    }

    struct PoolDataReturnedType {
      uint256 totalStakers;
      uint256 totalStaked;
      uint256 rewardReserve;
      uint256 rewardRate;
    }

    mapping(uint256 => Pool) public pools;
    uint256[] internal poolIDs;
    event poolCreated(uint256 PoolID, uint256 poolReward, uint256 at, address by);
    event Stake(uint256 poolID, address indexed account, uint256 indexed amount, uint256 at);
    event Unstake(uint256 poolID, address indexed account, uint256 indexed amount, uint256 at);
    event RewardClaim(uint256 poolID, address indexed account, uint256 indexed amount, uint256 at);

    constructor(address _lpTokenAddress, address _creatorToken) {
      lpToken = IERC20(_lpTokenAddress);
      creatorToken = IERC20(_creatorToken);
    }

    function createPool(
      uint256 _rewardRate
    ) public {
      // widthrawing the 100 pool reward token from the pool creator
      creatorToken.transferFrom(msg.sender, address(this), 100E18);
      Pool storage p = pools[id];
      p.rewardRate = _rewardRate;
      p.rewardReserve = 100E18;
      // pushing the pools key into an array for retrieving all pools data later
      poolIDs.push(id);
      id++;
      emit poolCreated(id - 1, 100E18, block.timestamp, msg.sender);
    }

    function getPoolByID(uint256 _id) external view returns(PoolDataReturnedType memory _pool) {
       _pool = PoolDataReturnedType(pools[_id].totalStakers, pools[_id].totalStaked, pools[_id].rewardReserve, pools[_id].rewardRate);
    }


    function stake(uint256 _poolID, uint256 _amount) external {
      Pool storage p = pools[_poolID];
      lpToken.transferFrom(msg.sender, address(this), _amount);
      // calculate the user's reward up until this moment and add it to storedReward;
      uint256 userPreviousBalance = p.stakersBalances[msg.sender];
      if(userPreviousBalance > 0) {
        uint256 previousReward = _getUserReward(_poolID, msg.sender);
        p.stakerStoredReward[msg.sender] = previousReward;
      }
      // increment stakers if their previous balance is 0, it signifies new staker
      userPreviousBalance == 0 ? p.totalStakers++ : p.totalStakers+0;
      p.stakersBalances[msg.sender].add(_amount);
      p.totalStaked.add(_amount);
      p.stakerRewardPerSec[msg.sender] = _calculateRewardperSecond(_poolID,  p.stakersBalances[msg.sender]);
      p.stakerLastUpdatedTime[msg.sender] = block.timestamp;
      emit Stake(_poolID, msg.sender, _amount, block.timestamp);
    }

    function _calculateRewardperSecond(uint256 _poolID, uint256 _stakedAmount) private view returns(uint256 _rewardPerSecond) {
        uint256 secInDay = 1 days;
        _rewardPerSecond = _stakedAmount.mul(pools[_poolID].rewardRate).div(secInDay);
    }


    function _getUserReward(uint256 _poolID, address _account) internal view returns(uint256 _userReward) {
        uint256 userRewardPerSec = pools[_poolID].stakerRewardPerSec[_account];
        uint256 timeElapsed = block.timestamp - pools[_poolID].stakerLastUpdatedTime[_account];
        _userReward = userRewardPerSec.mul(timeElapsed).add(pools[_poolID].stakerStoredReward[_account]);
    }

    function getUserClaimableReward(uint256 _poolID, address _staker) external view returns(uint _reward) {
      _reward = _getUserReward(_poolID, _staker);
    }


    function unstake(uint256 _poolID) external {
        Pool storage p = pools[_poolID];
        uint256 balance = p.stakersBalances[msg.sender];
        require(balance > 0, "Staking pool contract: You do not have any token staked in this pool");
        uint256 reward = _getUserReward(_poolID, msg.sender);
        p.stakersBalances[msg.sender] = 0;
        p.totalStakers--;
        p.stakerStoredReward[msg.sender] = 0;
        p.totalStaked.sub(balance);
        lpToken.transfer(msg.sender, balance);
        creatorToken.transfer(msg.sender, reward);
        emit Unstake(_poolID, msg.sender, balance, block.timestamp);
    }

    function claimReward(uint256 _poolID) external {
        Pool storage p = pools[_poolID];
        uint256 reward = _getUserReward(_poolID, msg.sender);
        require(reward > 0, "Staking pool contract: You do not have any reward to be claimed in this pool");
        require((block.timestamp - p.stakerLastUpdatedTime[msg.sender]) > 1 days, "It is not up to a day since you last claimed in this pool");
        p.stakerLastUpdatedTime[msg.sender] = block.timestamp;
        p.rewardReserve.sub(reward);
        p.stakerStoredReward[msg.sender] = 0;
        creatorToken.transfer(msg.sender, reward);
        emit RewardClaim(_poolID, msg.sender, reward, block.timestamp);
    }
}
