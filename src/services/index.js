const axios = require('axios');
const link = 'http://localhost:8080/'

const Register = data => {
    return new Promise( (resolve, reject) => {
        axios.post(link + 'register', data)
        .then( res => resolve(res.data) )
        .catch( err => reject(err) )
    });    
}

const Login = data => {
   return new Promise( (resolve , reject) => {
        axios.post(link + 'login', data)
        .then(res => resolve(res.data) )
        .catch(err => reject(err))
    })
}

const getToken = data => {
    return new Promise( (resolve, reject) => {
        axios.post( link+'gettoken' , data )
        .then( res => resolve(res) )
        .catch( err => reject(err) )
    })
}

const verifyToken = data => {
    return new Promise( (resolve, reject) => {
        axios.post( link+'verifytoken' , null, { headers : { Authorization : data } } )
        .then( res => resolve(res) )
        .catch( err => reject(err) )
    })
}

export { Register, Login, getToken, verifyToken }