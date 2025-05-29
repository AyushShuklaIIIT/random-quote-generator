import React, { useContext, useEffect, useState } from "react";
import { searchContext } from "../context/contexts";
import Modal from "./Modal";

const History = () => {
  const [first, setFirst] = useState([]);
  const { color, currQuote, setcurrQuote } = useContext(searchContext);
  const colorObj = { r: color.r, g: color.g, b: color.b };
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setFirst(prevFirst => {
      if (prevFirst.length < 5) {
        return [...prevFirst, currQuote];
      } else {
        const newFirst = prevFirst.slice(1);
        return [...newFirst, currQuote];
      }
    });
  }, [currQuote]); 
  
  const handleClick = (item) => {
    setcurrQuote(item);
    setIsModalOpen(false);
  }

  return (
  <div className="fixed w-full flex items-center justify-center z-10">
    <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-white rounded montserrat-content mt-3 font-semibold transition-all duration-1000 cursor-pointer" style={{color: `rgb(${color.r}, ${color.g}, ${color.b})`}}>Last 5 Quotes</button>
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} color={colorObj}>
      <h2 className="text-2xl font-semibold mb-4 playfair-display-content" style={{color: `rgb(${color.r}, ${color.g}, ${color.b})`}}>Last 5 viewed quotes</h2>
      {first.map((item) => {
        return (
          <div key={item?.id} className="montserrat-content w-full mb-2 bg-white rounded-xl outline outline-black/5 shadow-lg p-3 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer" style={{color: `rgb(${color.r}, ${color.g}, ${color.b})`}} onClick={() => handleClick(item)}>
            <p className="font-semibold">{item?.quote.length > 100 ? item?.quote.slice(0, 100) + "...": item?.quote}</p>
            <p>{`${item?.author ? "--" + item.author : ""}`}</p>
          </div>
        )
      })}
      <button onClick={() => setIsModalOpen(false)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 playfair-display-content cursor-pointer">Close</button>
    </Modal>
  </div>
  );
};

export default History;
