import React, { ReactNode } from "react";

import styles from "./PostMenuModal.module.css";
import { RootModal } from "../RootModal";

interface PostMenuModalProps {
  children: ReactNode;
}

export const PostMenuModal = ({ children }: PostMenuModalProps) => {
  return <RootModal blank={true}>{children}</RootModal>;
};
