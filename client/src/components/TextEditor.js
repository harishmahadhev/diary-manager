import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import '../../node_modules/react-quill/dist/quill.snow.css'

export default function TextEditor() {
    const [body, setBody] = useState("")
    const handleBody = e => {
        setBody(e);
    }
    return (
        <div>
            <ReactQuill
                placeholder="write Something.."
                modules={TextEditor.modules}
                // formats={App.formats}
                onChange={handleBody}
                value={body}
            />
        </div>
    )
}

TextEditor.modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6] }, { font: [] }],
        [{ size: ['small', false, 'large'] }],
        ["bold", "italic", "underline", "strike", "blockquote",],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        [{ indent: '-1' }, { indent: '+1' }],
        ["link", "image", "video"],
        ["clean"],
        ["code-block"],
    ],
};

TextEditor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "background",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "code-block",
];

