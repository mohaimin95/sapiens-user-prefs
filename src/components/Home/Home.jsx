import React, { useContext } from "react";
import "./Home.css";
import ColorPalette from "./ColorPalette";
import { mainContext } from "../../contexts/MainContext";
import axios from "../../utils/axios";

export default function Home() {
  const { primaryColor, setPrimaryColor, setUser, user } = useContext(mainContext);
  const colors = ["1877F2", "2700b5", "d102c0", "d10282", "6b02c7", "f70264", "222222"];
  const onClickColor = (color) => {
    axios.put('/api/user', {
        preferences: {
            primaryColor: color
        }
    }).then(()=>{
        setUser(prev => ({
            ...prev,
            preferences: {
                primaryColor: color
            }
            
        }))
        setPrimaryColor(color);
    }).catch(()=>{
        alert("Something went wrong")
    })
  };
  return (
    <div className="container">
      <h2>User Preferences</h2>
      <div className="settings">
        <div className="settings-item">
          <h3>Choose color</h3>
          <div className="settings-item-content">
            {colors.map((color) => (
              <ColorPalette
                key={color}
                color={color}
                onClick={onClickColor}
                active={primaryColor === color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
