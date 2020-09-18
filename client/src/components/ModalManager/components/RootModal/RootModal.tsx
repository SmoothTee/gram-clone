import React, { ReactNode } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

import styles from "./RootModal.module.css";
import { hideModal } from "../../../../redux/modal/actions";

Modal.setAppElement("#root");

interface RootModalProps {
  children: ReactNode;
}

export const RootModal = ({ children }: RootModalProps) => {
  const dispatch = useDispatch();

  const hide = () => dispatch(hideModal());

  return (
    <div>
      <Modal
        isOpen={true}
        onRequestClose={hide}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.header}>
          <button className={styles.close_button} onClick={hide}>
            <AiOutlineClose />
          </button>
        </div>
        {children}
      </Modal>
    </div>
  );
};
