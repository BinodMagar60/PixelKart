import { useState, useEffect } from 'react';
import { Home } from 'lucide-react';

const Error = () => {
  const [glitchEffect, setGlitchEffect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">

          <div className={`text-8xl md:text-9xl font-black mb-6 transition-all duration-200 ${
            glitchEffect 
              ? 'text-red-500 transform skew-x-1' 
              : 'text-blue-600'
          }`}>
            404
          </div>


          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            The page you're looking for seems to have vanished into the digital void. 
            Don't worry, our PixelKart marketplace has plenty of other amazing products waiting for you!
          </p>


          <button 
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors transform hover:scale-105 shadow-lg"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;