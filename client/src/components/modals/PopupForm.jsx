import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddBookForm = () => {
  // State variables to store form data
  const [title, setTitle] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [genre, setGenre] = useState([]);
  const [ISBN, setISBN] = useState('');

  // State variables to store data fetched from APIs
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  // Fetch authors and genres data from APIs
  useEffect(() => {
    axios.get('/catalog/authors/all')
      .then(response => {
        setAuthors(response.data);
      })
      .catch(error => {
        console.error('Error fetching authors:', error);
      });

    axios.get('/catalog/genre/all')
      .then(response => {
        setGenres(response.data);
      })
      .catch(error => {
        console.error('Error fetching genres:', error);
      });
  }, []);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form data to send in the POST request
    const formData = {
      title,
      authorId,
      genre,
      ISBN
    };

    axios.post('/catalog/books/create', formData)
      .then(response => {
        console.log('Book added successfully:', response.data);
        // Reset form fields after successful submission
        setTitle('');
        setAuthorId('');
        setGenre([]);
        setISBN('');
      })
      .catch(error => {
        console.error('Error adding book:', error);
      });
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <br />
        <label>Author:</label>
        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} required>
          <option value="">Select an author</option>
          {authors.map(author => (
            <option key={author.id} value={author.id}>{`${author.firstName} ${author.familyName}`}</option>
          ))}
        </select>
        <br />
        <label>Genre:</label>
        <select multiple value={genre} onChange={(e) => setGenre(Array.from(e.target.selectedOptions, option => option.value))} required>
          <option value="">Select genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.genreName}</option>
          ))}
        </select>
        <br />
        <label>ISBN:</label>
        <input type="text" value={ISBN} onChange={(e) => setISBN(e.target.value)} required />
        <br />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;
