import axios from 'axios';

const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8088/catalog/books/all', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzYjg1MjNjZS05ZjlmLTQyMjktOGEwYi02M2ExOTJjOGY5MzEiLCJpc3MiOiJTYWdhclRlY2giLCJzdWIiOiJzYWtzaGkiLCJpYXQiOjE3MTI1NTU0NDEsImV4cCI6MTcxMjU5MTQ0MX0.tjKSzCcYJW0DACLq4kc42LUG7X7xdJvsD7xkIrLZkbw'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  };

  export { fetchBooks };

const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:8088/catalog/authors/all', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzYjg1MjNjZS05ZjlmLTQyMjktOGEwYi02M2ExOTJjOGY5MzEiLCJpc3MiOiJTYWdhclRlY2giLCJzdWIiOiJzYWtzaGkiLCJpYXQiOjE3MTI1NTU0NDEsImV4cCI6MTcxMjU5MTQ0MX0.tjKSzCcYJW0DACLq4kc42LUG7X7xdJvsD7xkIrLZkbw'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      return [];
    }
  };

  export { fetchAuthors };

