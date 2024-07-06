import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const CatBreeds = () => {
  const [data, setData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const itemsPerPage = 5;

  const handleBack = () => {
    navigate('/button');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchTerm, data]);

  useEffect(() => {
    updateDisplayedData();
  }, [currentPage,searchTerm]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://catfact.ninja/breeds?limit=100');
      const fetchedData = response.data.data || [];
      setData(fetchedData);
      setTotalPages(Math.ceil(fetchedData.length / itemsPerPage));
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const filterData = () => {
    const filtered = data.filter(breed =>
      breed.breed.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setDisplayedData(filtered.slice(0, itemsPerPage));
    setCurrentPage(1);
  };

  const updateDisplayedData = () => {
    const filtered = data.filter(breed =>
      breed.breed.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedData(filtered.slice(startIndex, endIndex));
  };

  return (
    <div className='min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-200 to-purple-300 p-4'>
      <input
        type="text"
        placeholder="Search For Breed"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-5xl">
        <ul>
          {Array.isArray(displayedData) && displayedData.map((breed) => (
            <li key={breed.breed} className="mb-4 p-4 border-b border-gray-200">
              <h2 className='text-2xl font-bold text-gray-800'>{breed.breed}</h2>
              <p className='text-gray-600'>Country: {breed.country}</p>
              <p className='text-gray-600'>Origin: {breed.origin}</p>
              <p className='text-gray-600'>Coat: {breed.coat}</p>
              <p className='text-gray-600'>Pattern: {breed.pattern}</p>
            </li>
          ))}
        </ul>
        <div className="pagination flex justify-center mt-6">
          <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-3 py-1 mx-1 bg-gray-300 rounded hover:bg-gray-400">
            <MdKeyboardArrowLeft />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-3 py-1 mx-1 bg-gray-300 rounded hover:bg-gray-400">
            <MdKeyboardArrowRight />
          </button>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleBack}
            className="w-32 h-10 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatBreeds;


