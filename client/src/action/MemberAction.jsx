import axios from "axios";

const MEMBERSHIP_API_BASE_URL = "http://localhost:8088/membershipService/member";

class MemberAction {
  addNewMember(member,token) {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return axios.post(MEMBERSHIP_API_BASE_URL + "/newMember", member, { headers });
  }
  addNewPlan(plan,token) {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return axios.post("http://localhost:8088/membershipService/membership-plans/addNew", plan, { headers });
  }
  addMembership(memberId, membershipData, token) {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return axios.post(`http://localhost:8088/membershipService/membership/newMemebership`, {
      memberId: memberId,
      startDate: membershipData.startDate,
      modeOfPayment: membershipData.modeOfPayment,
      membershipPlanId: membershipData.membershipPlanId
    }, { headers });
  }
  getMemberMembership(memberId, token) {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return axios.get(`http://localhost:8088/membershipService/membership/member/${memberId}`, { headers });
  }

  getAllMembers(token) {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return axios.get(MEMBERSHIP_API_BASE_URL + "/all", { headers });
  }
  getAllMemberPlans(token) {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return axios.get("http://localhost:8088/membershipService/membership-plans/all", { headers });
  }


  deleteMember(id, token) {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return axios.delete(MEMBERSHIP_API_BASE_URL + `/${id}/delete`, { headers });
  }
  deletePlan(id, token) {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return axios.delete(`http://localhost:8088/membershipService/membership-plans/${id}/delete`, { headers });
  }

  getMemberById(id, token) {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return axios.get(`${MEMBERSHIP_API_BASE_URL}/${id}`, { headers });
  }


  updateMember(member, id, token) {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return axios.put(MEMBERSHIP_API_BASE_URL + `/${id}/update`, member, { headers });
  }
  updatePlan(plan, id, token) {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return axios.put(`http://localhost:8088/membershipService/membership-plans/${id}/update`, plan, { headers });
  }

  getMemberTransactions(id) {
    return axios.get(MEMBERSHIP_API_BASE_URL + `/transaction/${id}`);
  }
}

export default new MemberAction();

const getAllMembership = async (token) => {
  try {
    const response = await axios.get('http://localhost:8088/membershipService/membership/all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

export { getAllMembership };


