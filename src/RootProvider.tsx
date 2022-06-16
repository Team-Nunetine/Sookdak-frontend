import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { FC } from "react"
import { Theme } from "@react-navigation/native"
import { DarkTheme, DayTheme } from "./Themes"
import axios, { AxiosInstance } from "axios"
import getAxiosInstance from "./api/Api"

type ContextType = {
    user: {
        token: string,
        username: string
    },
    setUser: any,
    setting: {
        theme: Theme
    },
    setSetting: any,
    api: AxiosInstance
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
    setSetting: undefined,
    api: axios.create()
}

const RootContext = createContext<ContextType>(defaultContext)

export const RootProvider: FC<{}> = ({ children }) => {
    const [user, setUser] = useState({
        token: '', username: ''
    })
    const [setting, setSetting] = useState({ theme: DayTheme })
    const api = useMemo(() => getAxiosInstance(user.token), [user.token])
    const value = { user, setUser, setting, setSetting, api }

    return <RootContext.Provider value={value}>
        {children}
    </RootContext.Provider>
}

export const useRootContext = () => {
    return useContext(RootContext)
}