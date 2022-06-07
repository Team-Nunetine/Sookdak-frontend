import React, { createContext, useContext, useState } from "react"
import type { FC } from "react"

type ContextType = {
    boards: {
        name: string,
        boardId: number
    }[],
    setBoards,
    currentBoard: number,
    setCurrentBoard
}

const defaultContext = {
    boards: [
        {
            name: '숙플레이스',
            boardId: 0
        },
        {
            name: '소융아이티컴과',
            boardId: 1
        },
        {
            name: '홍보게시판',
            boardId: 2
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
            name: '숙플레이스',
            boardId: 0
        },
        {
            name: '소융아이티컴과',
            boardId: 1
        },
        {
            name: '홍보게시판',
            boardId: 2
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