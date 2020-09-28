import React, { forwardRef } from "react";

import styles from "./SettingInput.module.css";

interface SettingInputProps {
  label: string;
  name: string;
  type?: string;
  error?: string;
}

export const SettingInput = forwardRef<HTMLInputElement, SettingInputProps>(
  ({ label, name, type = "text", error }, ref) => {
    return (
      <div className={styles.container}>
        <label className={styles.label} htmlFor={label}>
          {label}
        </label>
        <div className={styles.input_wrapper}>
          <input
            className={`${styles.input} ${error ? styles.input_error : ""}`}
            id={label}
            name={name}
            type={type}
            placeholder={label}
            ref={ref}
          />
          <span className={styles.error_message}>{error}</span>
        </div>
      </div>
    );
  }
);
