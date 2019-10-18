import React from 'react'

const GlobalState = React.createContext({})

export const StateProvider = GlobalState.Provider
export const StateConsumer = GlobalState.Consumer
export default GlobalState