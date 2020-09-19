import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import styles from "./CreatePostModal.module.css";
import { RootModal } from "../RootModal";
import { Button } from "../../../Button";
import { useDispatch } from "react-redux";
import { createPostAction } from "../../../../redux/post/actions";

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export const CreatePostModal = () => {
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((f) =>
      f.concat(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*, video/*",
  });

  const thumbs = files.map((file: any, index) => (
    <div
      className={styles.thumb}
      key={index}
      onClick={() => setSelectedFile(index)}
    >
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt={file.name} />
      </div>
    </div>
  ));

  // useEffect(
  //   () => () => {
  //     // Make sure to revoke the data uris to avoid memory leaks
  //     files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  //   },
  //   [files]
  // );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("media", file);
    });
    formData.append("caption", caption);

    dispatch(createPostAction(formData));
  };

  return (
    <RootModal>
      <div className={styles.container}>
        <div className={styles.images}>
          <div {...getRootProps()} className={styles.dropzone}>
            <input {...getInputProps()} />
            {files.length > 0 ? (
              <img
                src={(files[selectedFile] as any).preview}
                className={styles.image}
                alt="selected image"
              />
            ) : (
              <span className={styles.image_text}>
                Drop your images here or click to select.
              </span>
            )}
          </div>
          <aside className={styles.thumbs_container}>{thumbs}</aside>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <textarea
            className={styles.caption}
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
          />
          <Button type="submit">Create Post</Button>
        </form>
      </div>
    </RootModal>
  );
};
