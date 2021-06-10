import React, { createContext, useContext, useReducer } from "react";
import {reducer, initialState} from './reducer'

const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({children}) => (
    <AppContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </AppContext.Provider>
)