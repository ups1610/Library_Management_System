import axios from "axios";

const MEMBERSHIP_API_BASE_URL = "http://localhost:8088/membershipService/member";

class MemberAction {
  addNewMember(member) {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhZDFmMzgyMS1iNTAwLTQ1Y2YtOWY4My1lZThlNzkyMjlmY2IiLCJpc3MiOiJTYWdhclRlY2giLCJzdWIiOiJzYWtzaGkiLCJpYXQiOjE3MTI2MjkzODksImV4cCI6MTcxMjY2NTM4OX0.Me4Al1uR8zOhOPOCs9y0BziAogCRt7YOrE9BzNQSh3Y';
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return axios.post(MEMBERSHIP_API_BASE_URL + "/newMember", member, { headers });
  }

  getAllMembers() {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhZDFmMzgyMS1iNTAwLTQ1Y2YtOWY4My1lZThlNzkyMjlmY2IiLCJpc3MiOiJTYWdhclRlY2giLCJzdWIiOiJzYWtzaGkiLCJpYXQiOjE3MTI2MjkzODksImV4cCI6MTcxMjY2NTM4OX0.Me4Al1uR8zOhOPOCs9y0BziAogCRt7YOrE9BzNQSh3Y';
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    return axios.get(MEMBERSHIP_API_BASE_URL + "/all", { headers });
  }
  

  deleteMember(id) {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhZDFmMzgyMS1iNTAwLTQ1Y2YtOWY4My1lZThlNzkyMjlmY2IiLCJpc3MiOiJTYWdhclRlY2giLCJzdWIiOiJzYWtzaGkiLCJpYXQiOjE3MTI2MjkzODksImV4cCI6MTcxMjY2NTM4OX0.Me4Al1uR8zOhOPOCs9y0BziAogCRt7YOrE9BzNQSh3Y';
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return axios.delete(MEMBERSHIP_API_BASE_URL + `/${id}/delete`, { headers });
  }

  getMemberById(id) {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhZDFmMzgyMS1iNTAwLTQ1Y2YtOWY4My1lZThlNzkyMjlmY2IiLCJpc3MiOiJTYWdhclRlY2giLCJzdWIiOiJzYWtzaGkiLCJpYXQiOjE3MTI2MjkzODksImV4cCI6MTcxMjY2NTM4OX0.Me4Al1uR8zOhOPOCs9y0BziAogCRt7YOrE9BzNQSh3Y';
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    return axios.get(`${MEMBERSHIP_API_BASE_URL}/${id}`, { headers });
  }
  

  updateMember(member, id) {
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhZDFmMzgyMS1iNTAwLTQ1Y2YtOWY4My1lZThlNzkyMjlmY2IiLCJpc3MiOiJTYWdhclRlY2giLCJzdWIiOiJzYWtzaGkiLCJpYXQiOjE3MTI2MjkzODksImV4cCI6MTcxMjY2NTM4OX0.Me4Al1uR8zOhOPOCs9y0BziAogCRt7YOrE9BzNQSh3Y';
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return axios.put(MEMBERSHIP_API_BASE_URL + `/${id}/update`, member, { headers });
  }

  getMemberTransactions(id) {
    return axios.get(MEMBERSHIP_API_BASE_URL + `/transaction/${id}`);
  }
}

export default new MemberAction();


