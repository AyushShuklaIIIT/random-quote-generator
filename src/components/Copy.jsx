import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { toast } from "react-toastify"

const Copy = ({ quote, author, color }) => {
  const copyText = () => {
    navigator.clipboard.writeText(`"${quote}" by ${author}`);
    toast.success("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });
  };

  return (
    <Tippy content="Copy" trigger="mouseenter focus">
      <button
        style={{
          backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
        }}
        className="text-white p-2 rounded-sm cursor-pointer transition duration-1000"
        onClick={copyText}
      >
        <lord-icon
          src="https://cdn.lordicon.com/cfkiwvcc.json"
          trigger="hover"
          stroke="bold"
          colors="primary:#ffffff"
        ></lord-icon>
      </button>
    </Tippy>
  );
};

export default Copy;
