import { SHOW_MODAL, HIDE_MODAL } from "./constants";

export const showModal = (modalType: string, modalProps?: any) => ({
  type: SHOW_MODAL,
  modalType,
  modalProps,
});

export const hideModal = () => ({
  type: HIDE_MODAL,
});
