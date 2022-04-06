import React, { createContext, useContext, useState } from "react"
import type { FC } from "react"

type ContextType = {
    boards: {
        boardName: string,
        id: string
    }[],
    setBoards,
    currentBoard: number,
    setCurrentBoard
}

const defaultContext = {
    boards: [
        {
            boardName: '숙플레이스',
            id: '1'
        },
        {
            boardName: '소융아이티컴과',
            id: '2'
        },
        {
            boardName: '홍보게시판',
            id: '3'
        }
    ],
    setBoards: undefined,
    currentBoard: -1,
    setCurrentBoard: undefined
}

const HomeContext = createContext<ContextType>(defaultContext)

export const HomeProvider: FC<{}> = ({ children }) => {
    const [boards, setBoards] = useState([
        {
            boardName: '숙플레이스',
            id: '1'
        },
        {
            boardName: '소융아이티컴과',
            id: '2'
        },
        {
            boardName: '홍보게시판',
            id: '3'
        }
    ])
    const [currentBoard, setCurrentBoard] = useState(-1)
    const value = { boards, setBoards, currentBoard, setCurrentBoard }
    return <HomeContext.Provider value={value}>
        {children}
    </HomeContext.Provider>
}

export const useHomeContext = () => {
    return useContext(HomeContext)
}