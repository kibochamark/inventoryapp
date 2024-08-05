"use client"

import { Provider } from 'react-redux'

import * as React from "react"
import { store } from '@/redux/store'


export function ReactReduxProvider({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children} </Provider>
}

