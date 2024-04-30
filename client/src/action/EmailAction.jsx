import axios from "axios";

const url = "http://localhost:8088/communicate";

export  const setEmailConfigurations=(config,token)=>{
    return axios
    .post(url + "/emailConfig", config, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((resp) => {
      return {
        success: true,
        data: resp.data,
      };
    })
    .catch((err) => {
      if (err.response) {
        return {
          success: false,
          data: err.response.data.error,
        };
      } else {
        return {
          success: false,
          data: "Something Went wrong. Try later!",
        };
      }
    });


}




export  const getEmailConfigurations=(token)=>{
    return axios
    .get(url + "/emailConfig", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((resp) => {
      return {
        success: true,
        data: resp.data,
      };
    })
    .catch((err) => {
      if (err.response) {
        return {
          success: false,
          data: err.response.data.error,
        };
      } else {
        return {
          success: false,
          data: "Something Went wrong. Try later!",
        };
      }
    });


}