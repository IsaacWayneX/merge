import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface BondytOrderProps {
  order: {
    product: {
      name: string;
      year: number;
      color: string;
      price: number;
      images: string[];
    };
    sender: {
      name: string;
      note: string;
    };
    address: string;
    status: 'Incomplete' | 'In progress' | 'Complete';
    paymentStatus: string;
  };
  onBack: () => void;
}

const BondytOrder: React.FC<BondytOrderProps> = ({ order, onBack }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gray-100 border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="hover:bg-gray-200 p-1 rounded">
            <ChevronLeft className="w-5 h-5 text-gray-900" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Bondyt order</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow border border-gray-200">
          {/* Product Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex gap-6">
              <div className="space-y-2">
                <img
                  src={order.product.images[0]}
                  alt={order.product.name}
                  className="w-48 h-36 object-cover rounded-lg border border-gray-200"
                />
                <div className="grid grid-cols-3 gap-2">
                  {order.product.images.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${order.product.name} view ${index + 2}`}
                      className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {order.product.year} {order.product.name}
                    </h2>
                    <p className="text-gray-700">{order.product.color}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                      {order.paymentStatus}
                    </span>
                    <p className="mt-2 text-2xl font-bold text-gray-900">${order.product.price.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <div className="mt-2">
                      <select
                        value={order.status}
                        onChange={() => {}}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option>Incomplete</option>
                        <option>In progress</option>
                        <option>Complete</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sender/Receiver Info */}
          <div className="grid grid-cols-2 gap-6 p-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sender</h3>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm mb-4 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                {order.sender.name}
              </button>
              <p className="text-sm text-gray-700 p-4 border border-gray-200 rounded-lg bg-gray-50">
                {order.sender.note}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Receiver</h3>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm mb-4 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                {order.sender.name}
              </button>
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-700">Address</p>
                <p className="text-sm text-gray-900 mt-1">{order.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BondytOrder;