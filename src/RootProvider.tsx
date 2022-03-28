import React, { createContext, useContext, useState } from "react"
import type { FC } from "react"
import { Theme } from "@react-navigation/native"
import { DarkTheme, DayTheme } from "./Themes"

type ContextType = {
    user: {
        token: string,
        username: string
    },
    setUser: any,
    setting: {
        theme: Theme
    },
    setSetting: any
}

const defaultContext = {
    user: {
        token: '',
        username: ''
    },
    setUser: undefined,
    setting: {
        theme: DarkTheme
    },
    setSetting: undefined
}

const RootContext = createContext<ContextType>(defaultContext)

export const RootProvider: FC<{}> = ({ children }) => {
    const [user, setUser] = useState({
        token: '', username: ''
    })
    const [setting, setSetting] = useState({ theme: DayTheme })
    const value = { user, setUser, setting, setSetting }
    return <RootContext.Provider value={value}>
        {children}
    </RootContext.Provider>
}

export const useRootContext = () => {
    return useContext(RootContext)
}