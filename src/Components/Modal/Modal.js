import { useEffect } from "react";

import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import s from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root");

const Modal = ({ onClose, url }) => {
  useEffect(() => {
    const closeModal = (e) => {
      if (e.code === "Escape") {
        onClose();
      }
    };
    
    window.addEventListener("keydown", closeModal);

    return () => {
      window.removeEventListener("keydown", closeModal);
    };
  }, [onClose]);

  

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img src={url} alt="" width={800} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
