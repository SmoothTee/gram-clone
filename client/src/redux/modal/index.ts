import { SHOW_MODAL, HIDE_MODAL } from "./constants";
import { ModalState, ModalActionTypes } from "./types";

const initialState: ModalState = {
  modalType: null,
  modalProps: {},
};

export const modal = (state = initialState, action: ModalActionTypes) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        modalType: action.modalType,
        modalProps: action.modalProps,
      };
    case HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
};
