import axios from "axios";

const MEMBERSHIP_API_BASE_URL =
  "http://localhost:8088/membershipService/member";

class MemberAction {
  addNewMember(member, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

   return axios
      .post(MEMBERSHIP_API_BASE_URL + "/newMember", member, { headers })
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
  addNewPlan(plan, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

   return axios
      .post(
        "http://localhost:8088/membershipService/membership-plans/addNew",
        plan,
        { headers }
      )
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
  addMembership(memberId, membershipData, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

   return axios
      .post(
        `http://localhost:8088/membershipService/membership/newMemebership`,
        {
          memberId: memberId,
          startDate: membershipData.startDate,
          modeOfPayment: membershipData.modeOfPayment,
          membershipPlanId: membershipData.membershipPlanId,
        },
        { headers }
      )
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
  getMemberMembership(memberId, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

  return  axios
      .get(
        `http://localhost:8088/membershipService/membership/member/${memberId}`,
        { headers }
      )
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

  getAllMembers(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

  return  axios
      .get(MEMBERSHIP_API_BASE_URL + "/all", { headers })
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
  getAllMemberPlans(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

  return  axios
      .get("http://localhost:8088/membershipService/membership-plans/all", {
        headers,
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

  deleteMember(id, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

   return axios
      .delete(MEMBERSHIP_API_BASE_URL + `/${id}/delete`, { headers })
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
  deletePlan(id, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

   return axios
      .delete(
        `http://localhost:8088/membershipService/membership-plans/${id}/delete`,
        { headers }
      )
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

  getMemberById(id, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

   return axios
      .get(`${MEMBERSHIP_API_BASE_URL}/${id}`, { headers })
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
  getMemberPlanById(id, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

   return axios
      .get(`http://localhost:8088/membershipService/membership-plans/${id}`, {
        headers,
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

  updateMember(member, id, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

   return axios
      .put(MEMBERSHIP_API_BASE_URL + `/${id}/update`, member, { headers })
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
  updatePlan(plan, id, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

   return  axios
      .put(
        `http://localhost:8088/membershipService/membership-plans/${id}/update`,
        plan,
        { headers }
      )
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

  getMemberTransactions(id) {
   return axios
      .get(MEMBERSHIP_API_BASE_URL + `/transaction/${id}`)
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
}

export default new MemberAction();

const getAllMembership = async (token) => {
 return  axios
    .get("http://localhost:8088/membershipService/membership/all", {
      headers: {
        Authorization: `Bearer ${token}`,
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

export { getAllMembership };
