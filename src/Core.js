import React, { useState, useEffect } from 'react'
import App from './App'
import { auth } from './services'
import { Cookies } from 'react-cookie'
import moment from 'moment'

export const GlobalState = React.createContext();
const Provider = GlobalState.Provider;

const Core = () => {

    const [User, setUser] = useState(false)
    const [Playlist, setPlaylist] = useState([ { filename : null, title : null, artist : null } ])
    const dailyLimit = 3;
    
    const refreshUser = () => {
        let cookie = new Cookies();
        let m = cookie.get('auth')
        
        auth.refreshToken(m).then( res => {
            setUser(res.data[0])
            cookie.set('auth', res.data[1] , { path : '/' })
        })
    }
    
    useEffect(() => {
        // Refresh Limiter
        if (User && User.roles === 'rakyat') 
            auth.get('limit', User.id).then(res => {
                if (res.data.length && res.data[0].total > dailyLimit-1) setUser(e => ({ ...e, limit : true }))
            }).catch(err => console.log(err, 'err'))

    }, [Playlist, User])

    useEffect(() => {
        if ( User && moment(User.premiumend).isBefore( new Date() ) ) {
            if (User.roles !== "presiden")
                auth.update({ table : 'premiumend', id : User.id }).then(res => {refreshUser(); console.log('jalannn')}).catch(err => console.log(err))
        }
    }, [User])

    return (
        <Provider value={{ User, setUser, Playlist, setPlaylist, refreshUser }} >
            <App />
        </Provider>
    )
}

export default Core