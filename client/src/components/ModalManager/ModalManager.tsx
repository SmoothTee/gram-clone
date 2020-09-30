import React from "react";

import { useTypedSelector } from "../../redux/hooks";
import { CreatePostModal } from "./components/CreatePostModal";
import { PostMenuModal } from "./components/PostMenuModal";
import { PostModal } from "./components/PostModal";

const modalComponents = {
  CreatePostModal,
  PostMenuModal,
  PostModal,
};

export const ModalManager = () => {
  const { modalType, modalProps } = useTypedSelector((state) => state.modal);

  if (!modalType) {
    return null;
  }

  const SpecificModal =
    modalComponents[modalType as keyof typeof modalComponents];

  return <SpecificModal {...modalProps} />;
};
