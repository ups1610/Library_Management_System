import axios from 'axios';


const url = 'http://localhost:8088';

const token = localStorage.getItem('token')

export const login = (userName, password) => {

    return axios.post(url + '/auth/login', {
        userName,
        password
    }, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((resp) => {
        if (resp.status === 200) {
            return {
                success: true,
                data: resp.data
            };  
        } else {
            return {
                success: false,
                data: 'Bad credentials. Please check your username and password.'
            };
        }
    })
    .catch((error) => {
        if (error.response && error.response.status === 401) {
          
            return {
                success: false,
                data: 'Bad credentials. Please check your username and password.'
            };
        } else {
            console.error('Something went wrong: ', error);
            return {
                success: false,
                data: 'Something went wrong. Please try again later.'
            };
        }
    });
};

export const logout=()=>{
    console.debug('Login Request');
    return axios.post(url + '/auth/logout', {
        headers: {
            'token': token.token,
            'Content-Type': 'application/json',
        }
    })
    .then((resp) => {
        if (resp.status === 200) {
            return {
                success: true,
                data: resp.data
            };
        } else {
            return {
                success: false,
                data: 'Invalid Request.'
            };
        }
    })
    .catch((err) => {
        console.error('Something went wrong: ', err);
        return {
            success: false,
            data: 'Something went wrong. Please try again later.'
        };
    });
}
