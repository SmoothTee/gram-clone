import React, { ReactNode } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

import styles from "./RootModal.module.css";
import { hideModal } from "../../../../redux/modal/actions";

Modal.setAppElement("#root");

interface RootModalProps {
  children: ReactNode;
  blank?: boolean;
}

export const RootModal = ({ children, blank = false }: RootModalProps) => {
  const dispatch = useDispatch();

  const hide = () => dispatch(hideModal());

  return (
    <div>
      <Modal
        isOpen={true}
        onRequestClose={hide}
        className={`${styles.modal} ${blank ? styles.no_padding : ""}`}
        overlayClassName={styles.overlay}
      >
        {blank ? null : (
          <div className={styles.header}>
            <button className={styles.close_button} onClick={hide}>
              <AiOutlineClose />
            </button>
          </div>
        )}
        {children}
      </Modal>
    </div>
  );
};
