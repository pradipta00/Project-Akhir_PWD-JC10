import React, { useState } from 'react'
import App from './App'
import { auth } from './services'
import { Cookies } from 'react-cookie'

export const GlobalState = React.createContext();
const Provider = GlobalState.Provider;

const Core = () => {

    const [User, setUser] = useState(false)
    const [Playlist, setPlaylist] = useState([{ filename : '.mp3', title : 'Play a song', artist_name : 'Start Listening' }])
    const refreshUser = _ => {
        let cookie = new Cookies();
        let m = cookie.get('auth')

        console.log(m)
        
        auth.refreshToken(m).then( res => {
            setUser(res.data[0])
            cookie.set('auth', res.data[1] , { path : '/' })
        })
    }

    return (
        <Provider value={{ User, setUser, Playlist, setPlaylist, refreshUser }} >
            <App />
        </Provider>
    )
}

export default Core