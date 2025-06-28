import React, { useEffect } from 'react';
import { ShoppingBag, Monitor, Laptop, Cpu } from 'lucide-react';

interface InitialLoadingProps {
  onLoadingComplete?: () => void;
}

const InitialLoading: React.FC<InitialLoadingProps> = ({ onLoadingComplete }) => {
  useEffect(() => {
    const completeTimeout = setTimeout(() => {
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }, 8000);

    return () => {
      clearTimeout(completeTimeout);
    };
  }, [onLoadingComplete]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">

        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">PixelKart</h1>
          <p className="text-gray-500 text-sm">Your shopping destination</p>
        </div>


        <div className="mb-8">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg">
            <ShoppingBag className="w-8 h-8 text-gray-600 animate-pulse" />
          </div>
        </div>


        <div className="mb-8">
          <p className="text-lg text-gray-700 font-medium mb-4">Loading...</p>
          
          <div className="flex justify-center space-x-4">
            <Laptop className="w-6 h-6 text-gray-400 animate-pulse" style={{ animationDelay: '0s' }} />
            <Monitor className="w-6 h-6 text-gray-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <Cpu className="w-6 h-6 text-gray-400 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        <div className="w-full max-w-xs mx-auto">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gray-600 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialLoading;