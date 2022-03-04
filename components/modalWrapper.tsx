import React from 'react'
import Modal from 'react-modal';
import clsx from 'clsx';
import styles from '../styles/modalWrapperStyles.module.css';
import { NextComponentType } from 'next';

type IModalWrapperProps = {
    open: boolean,
    children: any,
    onClose: any,
    label: string
}

Modal.setAppElement('#__next'); // this is for accessibility purpose. we want other page content to be hidden to assistive technology when this modal is opened
const ModalWrapper = ({open, children, onClose, label}: IModalWrapperProps) => {
  return (
    <Modal
      closeTimeoutMS={300}
      isOpen = {open}
      onRequestClose = {onClose}
      contentLabel = {label}
      overlayClassName = {styles.overlayClass}
      className = {styles.content}
    >
      {children}
    </Modal>
  )
}

export default ModalWrapper;