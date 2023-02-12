import React, { useState, useEffect } from "react";
import "./Modal.css";

const Modal = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = (e) => {
    setIsOpen(false);
    if (props.onClose) {
      props.onClose();
    }
  };

  useEffect(() => {
    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  useEffect(() => {
    const escKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
      }
    };
    const clickOutside = (event) => {
      if (event.target.className === "modal-wrapper") {
        closeModal();
      }
    };

    document.addEventListener("keydown", escKey);
    document.addEventListener("click", clickOutside);

    return () => {
      document.removeEventListener("keydown", escKey);
      document.removeEventListener("click", clickOutside);
    };
  });

  return (
    <div className={`${isOpen ? "modal-wrapper" : "modal-hidden"}`}>
      <i
        onClick={closeModal}
        className="close-icon fa fa-times-circle-o"
        aria-hidden="true"
      ></i>

      <div className="modal-content"></div>
      {props.children}
    </div>
  );
};

export default Modal;
