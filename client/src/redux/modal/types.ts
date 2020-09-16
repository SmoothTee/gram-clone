import { SHOW_MODAL, HIDE_MODAL } from "./constants";

export interface ModalState {
  modalType: string | null;
  modalProps: any;
}

interface ShowModalAction {
  type: typeof SHOW_MODAL;
  modalType: string;
  modalProps: any;
}

interface HideModalAction {
  type: typeof HIDE_MODAL;
}

export type ModalActionTypes = ShowModalAction | HideModalAction;
