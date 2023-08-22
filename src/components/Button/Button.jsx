import React, { useContext } from "react";
import "./Button.css";
import { mainContext } from "../../contexts/MainContext";

export default function Button({ children, type = "button", ...rest }) {
  const { primaryColor } = useContext(mainContext);
  return (
    <button
      className="btn-primary"
      type={type}
      {...rest}
      style={{ backgroundColor: `#${primaryColor}` }}
    >{children}</button>
  );
}
