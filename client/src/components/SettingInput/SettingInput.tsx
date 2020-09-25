import React, { forwardRef } from "react";

import styles from "./SettingInput.module.css";

interface SettingInputProps {
  label: string;
  name: string;
  type?: string;
}

export const SettingInput = forwardRef<HTMLInputElement, SettingInputProps>(
  ({ label, name, type = "text" }, ref) => {
    return (
      <div className={styles.container}>
        <label className={styles.label} htmlFor={label}>
          {label}
        </label>
        <input
          className={styles.input}
          id={label}
          name={name}
          type={type}
          placeholder={label}
          ref={ref}
        />
      </div>
    );
  }
);
