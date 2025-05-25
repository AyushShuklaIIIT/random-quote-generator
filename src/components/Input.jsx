import React, { useContext } from 'react'
import { searchContext } from '../context/contexts';

const isDarkColor = (colorObj) => {
    const {r, g, b} = colorObj;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
}

const Input = () => {
    const value = useContext(searchContext);
    const colorObj = {r: value.r, g: value.g, b: value.b};

  return (
    <div>
      <input type="text" className='fixed top-2 w-[90%] max-w-[550px] text-lg p-2 rounded-sm m-2' style={{
        backgroundColor: `${isDarkColor(colorObj) ? "rgba(255, 255, 255, 0.1)": "rgba(0, 0, 0, 0.05)"}`, color: `${isDarkColor(colorObj) ? "white": "black"}`
      }} placeholder='Search quotes by keywords'/>
    </div>
  )
}

export default Input
