import React, { createContext, useContext, useState } from "react"
import type { FC } from "react"

type ContextType = {
    boards: string[],
    setBoards,
    currentBoard: number,
    setCurrentBoard
}

const defaultContext = {
    boards: ['숙플레이스', '소융아이티컴과', '홍보게시판'],
    setBoards: undefined,
    currentBoard: -1,
    setCurrentBoard: undefined
}

const HomeContext = createContext<ContextType>(defaultContext)

export const HomeProvider: FC<{}> = ({ children }) => {
    const [boards, setBoards] = useState(['숙플레이스', '소융아이티컴과', '홍보게시판'])
    const [currentBoard, setCurrentBoard] = useState(-1)
    const value = { boards, setBoards, currentBoard, setCurrentBoard }
    return <HomeContext.Provider value={value}>
        {children}
    </HomeContext.Provider>
}

export const useHomeContext = () => {
    return useContext(HomeContext)
}