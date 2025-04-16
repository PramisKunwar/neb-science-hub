
import { Loader2 } from 'lucide-react';

const LoadingPage = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
      <h2 className="text-xl font-medium text-gray-700">Loading...</h2>
      <p className="text-gray-500 mt-2">Please wait while we prepare your content</p>
    </div>
  );
};

export default LoadingPage;
