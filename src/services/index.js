const axios = require('axios');
const mainLink = 'http://localhost:8080/'

const auth = {
    Login : data => {
       return new Promise((resolve , reject) => {
            axios.post(mainLink + 'auth/login', data)
            .then(res => resolve(res.data) )
            .catch(err => reject(err))
        })
    },
    
    getToken : data => {
        return new Promise((resolve, reject) => {
            axios.post( mainLink + 'auth/gettoken' , data )
            .then( res => resolve(res) )
            .catch( err => reject(err) )
        })
    },
    
    verifyToken : data => {
        return new Promise((resolve, reject) => {
            axios.post( mainLink + 'auth/verifytoken' , null, { headers : { Authorization : data } } )
            .then( res => resolve(res) )
            .catch( err => reject(err) )
        })
    },

    refreshToken : data => {
        return new Promise((resolve, reject) => {
            axios.post( mainLink + 'auth/refreshtoken' , null, { headers : { Authorization : data } } )
            .then( res => resolve(res) )
            .catch( err => reject(err) )
        })
    },

    Register : data => {
        return new Promise((resolve, reject) => {
            axios.post(mainLink + 'user/register', {...data, table : 'users'})
            .then( res => resolve(res.data) )
            .catch( err => reject(err) )
        });    
    },
    
    transaction : data => {
        return new Promise((resolve, reject) => {
            axios.post( mainLink + 'user/transaction' , {...data, table : 'transaction'})
            .then( res => resolve(res) )
            .catch( err => reject(err) )
        })
    },

    get : (data, id = 'userId') => {
        return new Promise((resolve, reject) => {
            axios.get( mainLink + `user/get?table=${data}&id=${id}`)
            .then( res => resolve(res) )
            .catch( err => reject(err) )
        })
    },

    update : data => {
        return new Promise((resolve, reject) => {
            axios.post( mainLink + 'user/update', data)
            .then( res => resolve(res) )
            .catch( err => reject(err) )
        })
    },
    
    delete : data => {
        return new Promise((resolve, reject) => {
            axios.delete( mainLink + 'user/delete', { params : data })
            .then( res => resolve(res) )
            .catch( err => reject(err) )
        })
    }
}

const music = {
    Get : (table, id='id', albumId) => {
        return new Promise((resolve, reject) => {
            axios.get( mainLink + `data/get`, { params : { table, id, albumId } } ).then(res => resolve(res.data)).catch(err => reject(err))
        })
    },

    Insert : data => {
        return new Promise((resolve, reject) =>{
            axios.post( mainLink + 'data/insert', data ).then( res => resolve(res) ).catch( err => reject(err) )
        })
    },

    Delete : data => {
        return new Promise((resolve , reject) => {
            axios.delete( mainLink + 'data/delete', { params : data} ).then(res => resolve(res)).catch( err => reject(err))
        })
    },

    Update : data => {
        return new Promise((resolve, reject) => {
            axios.post(mainLink + 'data/update', data).then( res => resolve(res) ).catch( err => reject(err) )
        })
    }
}

const files = {
    thumbnail : link => `${mainLink}thumbnails/${link}`,
    music : link => `${mainLink}music/${link}`,
    banner : link => `${mainLink}banner/${link}`,
    payment : link => `${mainLink}payment/${link}`,

    UploadThumbnail : data => {
        return new Promise((resolve, reject) => {
            axios.post( mainLink + 'upload/thumbnail', data, { headers : {'Content-Type' : 'multipart/form-data'}} )
            .then( res => resolve(res.data) ).catch( err => reject(err) )
        })
    },
    
    UploadMusic : data => {
        return new Promise((resolve, reject) => {
            axios.post( mainLink + 'upload/music', data, { headers : {'Content-Type' : 'multipart/form-data'}} )
            .then( res => resolve(res.data) ).catch( err => reject(err) )
        })
    },

    UploadPayment : data => {
        return new Promise((resolve, reject) => {
            axios.post( mainLink + 'upload/payment', data )
            .then( res => resolve(res.data) ).catch( err => reject(err) )
        })
    },
}

export { auth, music, files }