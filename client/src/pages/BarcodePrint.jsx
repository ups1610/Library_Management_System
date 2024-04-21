import React, { useEffect, useState } from 'react'
import { fetchBooks, fetchInstanceById } from '../action/CatalogAction';
import { useAuth } from '../context/Authetication';
import { getBookInstances, getBooks } from '../action/OperationsAction';
import { BarcodeGenrator } from '../utils/BarcodeGenrator';

export const BarcodePrint = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [bookInstances, setBookInstances] = useState([]);
    const [selectedBookInstance, setSelectedBookInstance] = useState('');
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    const getAllBooks = async () => {
          try {
          const response = await fetchBooks(token);
         
            setBooks(response);
            console.log(response,"--")
            console.log("--",books);
         
        } catch (error) {
          console.error("Error fetching books:", error);
        }
    };

    const getAllBookInstances = async (bookId) => {
        try {
            const resp = await fetchInstanceById(bookId, token);
            setBookInstances(resp);
        } catch (error) {
            console.error('Error fetching book instances:', error);
        }
    };

    useEffect(() => {
         getAllBooks();
          setLoading(false);

    }, []);

    const handleBookSelect = (event) => {
        const selectedBookId = event.target.value;
        setSelectedBook(selectedBookId);
        console.log(selectedBookId);
        getAllBookInstances(selectedBookId);
    };

    const handleBookInstanceSelect = (event) => {
        const selectedInstanceId = event.target.value;
        setSelectedBookInstance(selectedInstanceId);
    };

    if (loading) return <p className='text-xs'>Loading..</p>;

    return (
        <div>
    <h1 className='text-lg'>Issue Book</h1>
    <div className="w-full mt-5 rounded-lg bg-white p-4 flex  gap-5 flex-wrap shadow-sm border-t-2 border-black">
   
            <div className='w-full'>
                <label className='"block mb-2 text-sm font-medium text-gray-900 dark:text-white"'>Select Book:</label>
                <select value={selectedBook} onChange={handleBookSelect} className='"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "'>
                             <option value=""> Select Book</option>


                    {books  && books.map((book) => (
                     
                        <option key={book.id} value={book.id}>
                            {book.title}
                        </option>
                    ))}
                
                </select>
            </div>
            {selectedBook && (
                <div className='w-full'>
                    <label className='"block mb-2 text-sm font-medium text-gray-900 dark:text-white"'>Select Book Instance:</label>
                    <select value={selectedBookInstance} onChange={handleBookInstanceSelect}  className='"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 w-full  "'>
                    <option> Select Instance</option>
                        {bookInstances && bookInstances.map((instance) => (
                          
                            <option key={instance.id} value={instance.id}>
                                {instance.id} {instance.imprint}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div>

            </div>
            {selectedBookInstance && <BarcodeGenrator bookInstance={selectedBookInstance} />}
        </div>
        </div>

    );
};

