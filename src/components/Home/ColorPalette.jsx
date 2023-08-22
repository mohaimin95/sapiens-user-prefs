import React from "react";
import "./Home.css";

export default function ColorPalette({ color, onClick, active }) {
  return (
    <button
        style={{ backgroundColor: `#${color}` }}
      className={`color-palette ${active ? 'active' : ''}`}
      onClick={() => onClick(color)}
    ></button>
  );
}
