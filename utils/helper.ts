export const shortenAddress = (address: string): string | null => {
    if(!address) return null
    return `${address.substr(0, 6)}...${address.substr(address.length - 4 , address.length)}`
}