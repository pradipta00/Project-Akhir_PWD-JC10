const axios = require('axios');
const link = 'http://localhost:8080/'

const Register = data => {

    const promise = new Promise( (resolve, reject) => {
        axios.post(link + 'register', data)
        .then( res => {
            if(res.data.success){ resolve(res.data) }else { resolve(res.data) }
        })
        .catch( err => reject(err) )
    });

    return promise;
    
}

export { Register }