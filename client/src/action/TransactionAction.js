import axios from 'axios';


const url = 'http://localhost:8088';

const token = localStorage.getItem('token')

export const getTodayTransaction = () => {

    return axios.post(url + '/', {
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
