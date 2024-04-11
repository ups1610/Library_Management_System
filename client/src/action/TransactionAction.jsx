import axios from 'axios';



const url = 'http://localhost:8088/transaction';



export const getAllTransaction=(token)=>{
  
    return axios.get(url + '/all',{
        headers: {
            'token':token,
            'Content-Type': 'application/json',
        }
    })
    .then((resp) => {
        console.log(resp)
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
            data: err.message
        };
    });
}

