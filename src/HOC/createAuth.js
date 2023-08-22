import React, { useContext } from "react"
import { mainContext } from "../contexts/MainContext"
import { Navigate } from "react-router-dom";

const createAuth = comp => {
    const { user } = useContext(mainContext);
    if(!user) {
        return <Navigate to="/login" />
    }
    return comp;
}

export default createAuth;