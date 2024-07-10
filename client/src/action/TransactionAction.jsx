import axios from "axios";
import config from "../config/config";

const url = `${config.server_url}/transaction`;

export const getAllTransaction = (token) => {
  return axios
    .get(url + "/all", {
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
};

export const getTodayTransaction = (token) => {
  return axios
    .get(url + "/today", {
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
};
