import React, { createContext, useState, useContext } from 'react';
import Modal from '../components/Modal/Modal';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info', // Defines color theme: 'success', 'error', 'info', 'confirm'
    onConfirm: null
  });

  // Helper method invoked by any component to trigger a popup
  const showModal = (message, type = 'info', title = '', onConfirm = null) => {
    setModalState({
      isOpen: true,
      title,
      message,
      type,
      onConfirm
    });
  };

  const closeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      <Modal 
        isOpen={modalState.isOpen} 
        title={modalState.title} 
        message={modalState.message} 
        type={modalState.type} 
        onClose={closeModal} 
        onConfirm={modalState.onConfirm}
      />
    </ModalContext.Provider>
  );
};
