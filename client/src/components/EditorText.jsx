import React, { useContext, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import * as api from "../api/Api";
import { varCtx } from "../shared/shared";
import { refreshPage } from "./../shared/shared";

export default function EditorText() {
  const [state, setState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const { value, setValue } = useContext(varCtx);

  const onEditorStateChange = (editorState) => {
    setState(editorState);
  };
  const create = async (formdata) => {
    try {
      await api.create(formdata);
    } catch (error) {
      const { data } = error.response;
      console.log(data);
    }
  };
  const handleSubmit = async () => {
    await create({
      title: title,
      body: draftToHtml(convertToRaw(state.getCurrentContent())),
    });
    setValue([
      ...value,
      {
        title: title,
        body: draftToHtml(convertToRaw(state.getCurrentContent())),
        date: new Date(),
      },
    ]);
    refreshPage();
  };

  function uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://api.cloudinary.com/v1_1/harishmahadhev/image/upload"
      );
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "harishmahadhev");
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        resolve({ data: { link: response.secure_url } });
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        console.log(error);
        reject(error);
      });
    });
  }
  return (
    <div className="editor createEntry">
      <div className="createEntryTitle">
        <input
          type="text"
          name="title"
          value={title}
          autoComplete="off"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give me a title"
        />
        <button type="submit" onClick={handleSubmit}>
          Save now
        </button>
      </div>
      <div className="editor">
        <Editor
          editorState={state}
          onEditorStateChange={onEditorStateChange}
          placeholder="Let's write about today..."
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: false },
            history: { inDropdown: false },
            image: {
              uploadCallback: uploadImageCallBack,
              alt: { present: true, mandatory: false },
            },
          }}
        />
      </div>
    </div>
  );
}
