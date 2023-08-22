import React, { createContext, useState } from "react";

export const mainContext = createContext({ })

export function MainProvider({ children }) {
    const [primaryColor, setPrimaryColor] = useState("1877F2");
    const [user, setUser] = useState(null);

    return (
        <mainContext.Provider value={{ primaryColor, user, setPrimaryColor, setUser }}>
            {children}
        </mainContext.Provider>
    )
}