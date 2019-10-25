const axios = require('axios');
const link = 'http://localhost:8080/'

const auth = {
    Register : data => {
        return new Promise( (resolve, reject) => {
            axios.post(link + 'register', data)
            .then( res => resolve(res.data) )
            .catch( err => reject(err) )
        });    
    },
    
    Login : data => {
       return new Promise( (resolve , reject) => {
            axios.post(link + 'login', data)
            .then(res => resolve(res.data) )
            .catch(err => reject(err))
        })
    },
    
    getToken : data => {
        return new Promise( (resolve, reject) => {
            axios.post( link+'gettoken' , data )
            .then( res => resolve(res) )
            .catch( err => reject(err) )
        })
    },
    
    verifyToken : data => {
        return new Promise( (resolve, reject) => {
            axios.post( link+'verifytoken' , null, { headers : { Authorization : data } } )
            .then( res => resolve(res) )
            .catch( err => reject(err) )
        })
    }

}

const music = {
    GetMusicAlbum : _ => {
        return new Promise( (resolve, reject) => {
            axios.get( link + 'getlist').then(res => resolve(res.data)).catch(err => reject(err))
        })
    },

    Get : data => {
        return new Promise( (resolve, reject) => {
            axios.get( link + `get?get=${data}` ).then(res => resolve(res.data)).catch(err => reject(err))
        })
    },

    Insert : data => {
        return new Promise( (resolve, reject) =>{
            axios.post( link+'insert', data ).then( res => resolve(res) ).catch( err => reject(err) )
        })
    },

    UploadThumbnail : data => {
        return new Promise( (resolve, reject) => {
            axios.post( link+'upload/thumbnail', data, { headers : {'Content-Type' : 'multipart/form-data'}} )
            .then( res => resolve(res.data) ).catch( err => reject(err) )
        })
    },
    
    UploadMusic : data => {
        return new Promise( (resolve, reject) => {
            axios.post( link+'upload/music', data, { headers : {'Content-Type' : 'multipart/form-data'}} )
            .then( res => resolve(res.data) ).catch( err => reject(err) )
        })
    }
}

export { auth, music }