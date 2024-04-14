import axios from "axios";
import { useAuth } from "../context/Authetication";
import toast from "react-hot-toast";
const url = "http://localhost:8088/library";

export const issueBook = (book, token) => {
  return axios
    .post(url + "/books/issue", book, {
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

export const returnBook = (book, token) => {
  return axios
    .post(url + "/books/return", book, {
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

export const getParticularReturnBook = (id, token) => {
  return axios
    .get(url + `/books/return/${id}`, {
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

export const allReturnBooks = (token) => {
  return axios
    .get(url + "/books/return/all", {
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

export const calculateFine = (bookIssueID, token) => {
  return axios
    .get(url + `/books/return/calculate-fine/${bookIssueID}`, {
      headers: {
       Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((resp) => {
        console.log("getting resp")
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

export const getParticularIssueBook = (bookIssueID, token) => {
  return axios
    .get(url + `/books/issue/${bookIssueID}`, {
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

export const getIssueBookByMember = (memberID, token) => {
  return axios
    .get(url + `/books/issue/member/${memberID}`, {
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

export const getAllIssueBook = (token) => {
  return axios
    .get(url + `/books/issue/all`, {
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

export const dueReturnBook = (token) => {
  return axios
    .get(url + `/books/issue/due-return`, {
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
export const getBookInstanceIssueHistory = (bookInstanceID, token) => {
  return axios
    .get(url + `/books/issue/instance/${bookInstanceID}`, {
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

export const fineByID = (id, token) => {
  return axios
    .get(url + `/fine/${id}`, {
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

export const getBookInstances = (id, token) => {
  return axios
    .get(url + `/book/${id}/instances`, {
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

export const getBooks = (token) => {
  return axios
    .get(url + "/book/all", {
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

export const getMember = (token) => {
  return axios
    .get(url + "/member/all", {
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
