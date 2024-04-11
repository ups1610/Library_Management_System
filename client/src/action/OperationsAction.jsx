import axios from 'axios';
import { useAuth } from '../context/Authetication';


const url = 'http://localhost:8088/library';



export const issueBook=(book,token)=>{
  
    return axios.post(url + '/books/issue', book,{
        headers: {
            'token':token,
            'Content-Type': 'application/json',
        }
    })
    .then((resp) => {
        console.log(resp)
        if (resp.status === 201) {
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



export const returnBook=(book,token)=>{
  
    return axios.post(url + '/books/return', book,{
        headers: {
            'token':token,
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



export const getParticularReturnBook=(id,token)=>{
  
    return axios.get(url + `/books/return/${id}`,{
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
            data: err.message
        };
    });
}


export const allReturnBooks=(token)=>{
  
    return axios.get(url + '/books/return/all',{
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
            data: err.message
        };
    });
}





export const calculateFine=(bookIssueID,token)=>{
  
    return axios.get(url + `/books/return/calculate-fine/${bookIssueID}`,{
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
            data: err.message
        };
    });
}




export const getParticularIssueBook=(bookIssueID,token)=>{
  
    return axios.get(url + `/books/issue/${bookIssueID}`,{
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
            data: err.message
        };
    });
}


export const getIssueBookByMember=(memberID,token)=>{
  
    return axios.get(url + `/books/issue/member/${memberID}`,{
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
            data: err.message
        };
    });
}


export const getAllIssueBook=(token)=>{
  
    return axios.get(url + `/books/issue/all`,{
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
            data: err.message
        };
    });
}


export const dueReturnBook=(token)=>{
  
    return axios.get(url + `/books/issue/due-return`,{
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
            data: err.message
        };
    });
}
export const getBookInstanceIssueHistory=(bookInstanceID,token)=>{
  
    return axios.get(url + `/books/issue/instance/${bookInstanceID}`,{
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
            data: err.message
        };
    });
}


export const fineByID=(id,token)=>{
  
    return axios.get(url + `/fine/${id}`,{
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
            data: err.message
        };
    });
}





export const getBookInstances=(id,token)=>{
  
    return axios.get(url + `/book/${id}/instances`,{
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
            data: err.message
        };
    });
}


export const getBooks=(token)=>{
  
    return axios.get(url + '/book/all',{
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
            data: err.message
        };
    });
}




export const getmember=(token)=>{
  
    return axios.get(url + '/member/all',{
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
            data: err.message
        };
    });


}