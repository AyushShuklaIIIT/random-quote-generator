import React, { useState } from "react";

const Modal = ({ isOpen, onClose, color, children }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50"
      style={{ backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b})` }}
    >
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-[550px] w-full relative transition-all duration-1000 outline outline-black/5 m-3 max-h-screen overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-black font-bold text-3xl cursor-pointer"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
