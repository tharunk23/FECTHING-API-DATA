import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Fact = () => {
  const [fact, setFact] = useState('');
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/button'); 
  };

  

  useEffect(() => {
    fetchRandomFact();
  }, []);

  const fetchRandomFact = async () => {
    try {
      const response = await axios.get('https://catfact.ninja/facts?max_length=100&limit=2000');
      const facts = response.data.data;
      const randomIndex = Math.floor(Math.random() * facts.length);
      setFact(facts[randomIndex].fact);
    } catch (error) {
      console.error('Error fetching facts', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Random Cat Fact</h1>
        <p className="text-gray-700 mb-4">{fact}</p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={fetchRandomFact} 
            className="w-40 h-12 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200"
          >
            Get Another Fact
          </button>
          <button 
            onClick={handleBack} 
            className="w-40 h-12 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-200"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fact;



