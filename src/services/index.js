const axios = require('axios');
const mainLink = 'http://localhost:8080/'

const auth = {
    Register : data => {
        return new Promise((resolve, reject) => {
            axios.post(mainLink + 'auth/register', data)
            .then( res => resolve(res.data) )
            .catch( err => reject(err) )
        });    
    },
    
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
    
    transaction : data => {
        return new Promise((resolve, reject) => {
            axios.post( mainLink + 'auth/transaction' , data)
            .then( res => resolve(res) )
            .catch( err => reject(err) )
        })
    },

    get : data => {
        return new Promise((resolve, reject) => {
            axios.get( mainLink + 'auth/get?table=' + data)
            .then( res => resolve(res) )
            .catch( err => reject(err) )
        })
    },

    update : data => {
        return new Promise((resolve, reject) => {
            axios.post( mainLink + 'auth/update', data)
            .then( res => resolve(res) )
            .catch( err => reject(err) )
        })
    },
    
    delete : data => {
        return new Promise((resolve, reject) => {
            axios.delete( mainLink + 'auth/delete', { params : data })
            .then( res => resolve(res) )
            .catch( err => reject(err) )
        })
    }
}

const music = {
    Get : (data, id='') => {
        return new Promise((resolve, reject) => {
            axios.get( mainLink + `music/get?get=${data}&id=${id}` ).then(res => resolve(res.data)).catch(err => reject(err))
        })
    },

    Insert : data => {
        return new Promise((resolve, reject) =>{
            axios.post( mainLink + 'music/insert', data ).then( res => resolve(res) ).catch( err => reject(err) )
        })
    },

    Delete : data => {
        return new Promise((resolve , reject) => {
            axios.delete( mainLink + 'music/delete', { params : data} ).then(res => resolve(res)).catch( err => reject(err))
        })
    },

    Update : data => {
        return new Promise((resolve, reject) => {
            axios.post(mainLink + 'music/update', data).then( res => resolve(res) ).catch( err => reject(err) )
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