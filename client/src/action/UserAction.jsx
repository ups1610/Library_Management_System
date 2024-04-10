import axios from 'axios';
import { useAuth } from '../context/Authetication';


const url = 'http://localhost:8088/auth';



export const login = (userName, password) => {

    return axios.post(url + '/login', {
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

export const logout=(token)=>{
  
    return axios.post(url + '/logout', {
        headers: {
            'token':token,
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



export const users=(token)=>{
    console.log(token)
    return axios.get(url + '/users', {
        headers: {
          
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            
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




export const particularUser=(id,token)=>{
   
    return axios.get(url + `/user/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`, 
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




export const addNewUser=(user,token)=>{
   
    return axios.post(url + '/addNew',user, {
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
        }
    })
    .then((resp) => {
        if (resp.status === 201) {
            return {
                success: true,
                data: resp.data
            };
        } else {
            return {
                success: false,
                data: resp.data
            };
        }
    })
    .catch((err) => {
        console.error('Something went wrong: ', err);
        return {
            success: false,
            data: err.message
        };
    });
}




export const updateUser=(id,user,token)=>{
   
    return axios.put(url + `/${id}`,user, {
        headers: {
            'Authorization': `Bearer ${token}`, 
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



export const changePassword=(id,password,token)=>{
   
    return axios.put(url + `/${id}/password`,password, {
        headers: {
            'Authorization': `Bearer ${token}`, 
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



export const changeStatus=(id,token)=>{
   
    return axios.put(url + `/Status?id=${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`, 
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

