import React, { useContext } from "react"
import { mainContext } from "../contexts/MainContext"
import { Navigate } from "react-router-dom";

const createGuest = comp => {
    const { user } = useContext(mainContext);
    if(user) {
        return <Navigate to="/" />
    }
    return comp;
}

export default createGuest;