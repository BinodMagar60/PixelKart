import React, { useEffect } from 'react';
import { CheckCircle, ShoppingCart, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Loading Component
const OrderLoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full mx-4 text-center">
        {/* Loading Icon */}
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
        </div>

        {/* Main Content */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Processing Your Order</h2>
        <p className="text-gray-600 mb-8">Please wait while we confirm your purchase...</p>

        {/* Shopping Cart Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center animate-pulse">
            <ShoppingCart className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>

        {/* Footer Message */}
        <p className="text-sm text-gray-500 mt-8">
          Please don't close this window
        </p>
      </div>
    </div>
  );
};



const OrderSuccessScreen = () => {
    const navigate = useNavigate()
      useEffect(() => {
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full mx-4 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
        <button className="w-full bg-green-200 rounded-lg hover:bg-green-300 transition-all ease-in-out p-4 mb-6 cursor-pointer" onClick={()=>{navigate('/account/mypurchase')}}>
          <p className="text-sm text-green-700 font-medium">Go to My Purchases</p>
        </button>
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 cursor-pointer" onClick={()=> {navigate('/')}}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};


export { OrderLoadingScreen, OrderSuccessScreen };
