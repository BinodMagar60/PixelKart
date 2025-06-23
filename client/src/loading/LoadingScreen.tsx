import { Package, Plus } from "lucide-react";
import type { ReactElement } from "react";

type LoadingKey = "addproduct" | "productloading";

const loadings: Record<LoadingKey, { text: string; icon: ReactElement }> = {
  addproduct: {
    text: "Adding Product",
    icon: <Package className="w-8 h-8 text-white" />,
  },
  productloading: {
    text: "Adding Category",
    icon: <Plus className="w-8 h-8 text-white"/>
  }
};

const LoadingScreen = ({ loadingObject }: { loadingObject: LoadingKey }) => {
  const loadingData = loadings[loadingObject];

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center animate-spin bg-blue-500">
            {loadingData.icon}
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {loadingData.text}
        </h2>
        <p className="text-gray-600">Please wait...</p>

        <div className="flex justify-center space-x-1 mt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
