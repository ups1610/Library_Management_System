import axios from 'axios';
import config from '../config/config';

// const token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIzYjg1MjNjZS05ZjlmLTQyMjktOGEwYi02M2ExOTJjOGY5MzEiLCJpc3MiOiJTYWdhclRlY2giLCJzdWIiOiJzYWtzaGkiLCJpYXQiOjE3MTI1NTU0NDEsImV4cCI6MTcxMjU5MTQ0MX0.tjKSzCcYJW0DACLq4kc42LUG7X7xdJvsD7xkIrLZkbw"
const url= config.server_url+"/catalog";
const fetchBooks = async (token) => {
    try {
      const response = await axios.get(url+'/books/all', {
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

  export { fetchBooks };

  const fetchBooksById = async (bookId,token) => {
    try {
      const response = await axios.get(`${url}/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data
    } catch (error) {
      console.error('Error fetching authors:', error);
      return [];
    }
  };
  export { fetchBooksById };

  const fetchInstanceById = async (bookId,token) => {
    console.log("--bid--",bookId);
    try {
      const response = await axios.get(`${url}/books/${bookId}/instances`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data
    } catch (error) {
      console.error('Error fetching authors:', error);
      return [];
    }
  };
  export { fetchInstanceById };

  const createBooks = async (bookData,token) => {
    try {
      const response = await axios.post(
        `${url}/books/create`,
        bookData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating author:', error);
      throw error;
    }
  };
  
  export { createBooks };

  const updateBook = async (bookId, bookData,token) => {
    try {
      const response = await axios.put(
        `${url}/books/${bookId}/update`,
        bookData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating author:', error);
      throw error;
    }
  };
  
  export { updateBook };

  const deleteBook = async (bookId,token) => {
    try {
      const response = await axios.delete(
        `${url}/books/${bookId}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating author:', error);
      throw error;
    }
  };
  
  export { deleteBook };


  const fetchAuthors = async (token) => {
    try {
      const response = await axios.get(`${url}/authors/all`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const formattedAuthors = response.data.map(author => {
        // Parse DOB string to Date object
        const dobDate = new Date(author.dob);
        const day = dobDate.getDate();
        const month = dobDate.getMonth() + 1;
        const year = dobDate.getFullYear();
  
        const formattedDOB = `${day}/${month}/${year}`;
        return { ...author, dob: formattedDOB };
      });
  
      return formattedAuthors;
    } catch (error) {
      console.error('Error fetching authors:', error);
      return [];
    }
  };
  export { fetchAuthors };

  const fetchAuthorsById = async (authorId,token) => {
    try {
      const response = await axios.get(`${url}/authors/${authorId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data
    } catch (error) {
      console.error('Error fetching authors:', error);
      return [];
    }
  };
  export { fetchAuthorsById };

  const fetchAuthorsBookById = async (authorId,token) => {
    try {
      const response = await axios.get(`${url}/authors/${authorId}/books`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data
    } catch (error) {
      console.error('Error fetching authors:', error);
      return [];
    }
  };
  export { fetchAuthorsBookById };


  const createAuthor = async (authorData,token) => {
    try {
      const response = await axios.post(
        `${url}/authors/create`,
        authorData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating author:', error);
      throw error;
    }
  };
  
  export { createAuthor };

  const updateAuthor = async (authorId, authorData,token) => {
    try {
      const response = await axios.put(
        `${url}/authors/${authorId}/update`,
        authorData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating author:', error);
      throw error;
    }
  };
  
  export { updateAuthor };
  
  
  const deleteAuthor = async (authorId,token) => {
    try {
      const response = await axios.delete(
        `${url}/authors/${authorId}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating author:', error);
      throw error;
    }
  };
  
  export { deleteAuthor };


  const fetchBookshelf = async (token) => {
    try {
      const response = await axios.get(`${url}/bookshelves/all`, {
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

  export { fetchBookshelf };

  const fetchBookshelfById = async (bookshelfId,token) => {
    try {
      const response = await axios.get(`${url}/bookshelves/${bookshelfId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data
    } catch (error) {
      console.error('Error fetching authors:', error);
      return [];
    }
  };
  export { fetchBookshelfById };

  const createBookshelf = async (bookshelfData,token) => {
    try {
      const response = await axios.post(
        `${url}/bookshelves/create`,
        bookshelfData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating author:', error);
      throw error;
    }
  };
  
  export { createBookshelf };

  const fetchBookshelfBookById = async (bookshelfId,token) => {
    try {
      const response = await axios.get(`${url}/bookshelves/${bookshelfId}/books`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data
    } catch (error) {
      console.error('Error fetching authors:', error);
      return [];
    }
  };
  export { fetchBookshelfBookById };

  const updateBookshelf = async (bookshelfId, bookshelfData,token) => {
    try {
      const response = await axios.put(
        `${url}/bookshelves/${bookshelfId}/update`,
        bookshelfData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating author:', error);
      throw error;
    }
  };
  
  export { updateBookshelf };

  const deleteBookshelf = async (bookshelfId, token) => {
    try {
      const response = await axios.delete(
        `${url}/bookshelves/${bookshelfId}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating author:', error);
      throw error;
    }
  };
  
  export { deleteBookshelf };


  const fetchGenre = async (token) => {
    try {
      const response = await axios.get(`${url}/genre/all`, {
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

  export { fetchGenre };

  const fetchGenreById = async (genreId, token) => {
    try {
      const response = await axios.get(`${url}/genre/${genreId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data
    } catch (error) {
      console.error('Error fetching authors:', error);
      return [];
    }
  };
  export { fetchGenreById };

  const fetchGenreBookById = async (genreId, token) => {
    try {
      const response = await axios.get(`${url}/genre/${genreId}/books`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data
    } catch (error) {
      console.error('Error fetching authors:', error);
      return [];
    }
  };
  export { fetchGenreBookById };

  const createGenre = async (genreData, token) => {
    try {
      const response = await axios.post(
        `${url}/genre/create`,
        genreData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating author:', error);
      throw error;
    }
  };
  
  export { createGenre };

  const updateGenre = async (genreId, genreData, token) => {
    try {
      const response = await axios.put(
        `${url}/genre/${genreId}/update`,
        genreData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating author:', error);
      throw error;
    }
  };
  
  export { updateGenre };

  const deleteGenre = async (genreId, token) => {
    try {
      const response = await axios.delete(
        `${url}/genre/${genreId}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating author:', error);
      throw error;
    }
  };
  
  export { deleteGenre };

  const fetchInstance = async (token) => {
    try {
      const response = await axios.get(`${url}/book-instances`, {
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

  export { fetchInstance };

  const createInstance = async (instanceData, token) => {
    try {
      const response = await axios.post(
        `${url}/book-instances`,
        instanceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating author:', error);
      throw error;
    }
  };
  
  export { createInstance };

  const deleteInstance = async (instanceId, token) => {
    try {
      const response = await axios.delete(
        `${url}/book-instances/${instanceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating author:', error);
      throw error;
    }
  };
  
  export { deleteInstance };


  

