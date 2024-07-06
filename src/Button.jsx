import { useNavigate } from 'react-router-dom';

function Button() {
    const navigate = useNavigate();

    const handleBreeds = () => {
        navigate('/breeds'); 
    };

    const handleFacts = () => {
        navigate('/facts'); 
    };

    const handleFact = () => {
        navigate('/fact'); 
    };

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
            <div className='space-y-4'>
                <div className="relative z-10 hover:z-20 transition-all duration-200">
                    <button
                        onClick={handleBreeds}
                        className="w-40 h-16 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                    >
                        BREEDS
                    </button>
                </div>
                <div className="relative z-10 hover:z-20 transition-all duration-200">
                    <button
                        onClick={handleFacts}
                        className="w-40 h-16 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
                    >
                        FACTS
                    </button>
                </div>
                <div className="relative z-10 hover:z-20 transition-all duration-200">
                    <button
                        onClick={handleFact}
                        className="w-40 h-16 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
                    >
                        FACT
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Button;



