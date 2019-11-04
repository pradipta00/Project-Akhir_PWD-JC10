import React, { useState } from 'react'
import App from './App'

export const GlobalState = React.createContext();
const Provider = GlobalState.Provider;

const Core = () => {

    const [User, setUser] = useState(false)
    const [Playlist, setPlaylist] = useState([{ filename : '.mp3', title : 'Play a song', artist_name : 'Start Listening' }])

    return (
        <Provider value={{ User, setUser, Playlist, setPlaylist }} >
            <App />
        </Provider>
    )
}

export default Core