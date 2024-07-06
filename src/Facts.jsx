import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Facts = () => {
  const [facts, setFacts] = useState([]);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/button'); 
  };

  useEffect(() => {
    fetchFacts();
  }, []);

  useEffect(() => {
    if (facts.length > 0) {
      const interval = setInterval(() => {
        setIsVisible(false); // Trigger the fade-out transition
        setTimeout(() => {
          setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
          setIsVisible(true); // Trigger the fade-in transition
        }, 500); // Match the duration of the transition
      }, 2000); // Change fact every 2 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [facts]);

  const fetchFacts = async () => {
    try {
      const response = await axios.get('https://catfact.ninja/facts?max_length=100&limit=2000');
      setFacts(response.data.data);
    } catch (error) {
      console.error('Error fetching facts', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-6">
      {facts.length > 0 && (
        <div className={`fact-container bg-white rounded-lg shadow-lg p-6 max-w-md text-center `}>
          <h2 className="text-2xl font-bold text-green-700 mb-4">Cat Fact</h2>
          <p className="text-gray-700 mb-6 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}">{facts[currentFactIndex].fact}</p>
          <button 
            onClick={handleBack} 
            className="w-32 h-10 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-200"
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default Facts;



