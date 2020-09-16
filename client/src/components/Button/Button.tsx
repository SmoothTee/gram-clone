import React, { HTMLProps } from "react";

import styles from "./Button.module.css";
import { ButtonLoading } from "./components/ButtonLoading";

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  type?: "submit";
  loading?: boolean;
  disabled?: boolean;
}

export const Button = ({
  children,
  loading,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={styles.button}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {loading ? <ButtonLoading /> : children}
    </button>
  );
};
