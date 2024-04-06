import axios from 'axios'

const url = "http://localhost:8088";

export const login = (userName, password) => {
    console.debug("Login Request")
    return axios.post(url + "/auth/login", {
        userName,
        password
    }, {
        headers: {
            'Content-Type': 'application/json',
           
        }
    })
    .then((resp) => {
        console.log(resp);
        return resp.data; 
    })
    .catch((err) => {
        console.log("Something went wrong" + err.message);
        throw err; 
    })
}
