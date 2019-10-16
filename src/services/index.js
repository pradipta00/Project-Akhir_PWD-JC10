const axios = require('axios');
const link = 'http://localhost:8080/'

const Register = data => {

    const promise = new Promise( (resolve, reject) => {
        axios.post(link + 'register', data)
        .then( res => resolve(res.data) )
        .catch( err => reject(err) )
    });

    return promise;
    
}

const Login = data => {

    console.log(data)

    return new Promise( (resolve , reject) => {
        axios.post(link + 'login', data)
        .then(res => resolve(res.data) )
        .catch(err => reject(err))
    })
}

export { Register, Login }