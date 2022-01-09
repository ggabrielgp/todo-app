import React, { useState } from "react";

const Context = React.createContext({})

export function TaskContextProvider({ children }) {
    const [taskList, setList] = useState([])

    return <Context.Provider value={{ taskList, setList }}>
        {children}
    </Context.Provider>
}

export default Context