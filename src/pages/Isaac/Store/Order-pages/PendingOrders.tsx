import { ChevronLeft, Search, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PendingOrders() {
  const orders = [
    {
      id: 1,
      product: {
        name: '2014 Mercedes GLK350',
        color: 'Grey',
        price: 3000,
        images: Array(3).fill('/api/placeholder/400/300')
      },
      sender: 'Michael',
      receiver: 'Maria',
      paymentStatus: 'Payment confirmed',
      note: 'Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapie',
      address: 'House 1 Amore street Katampe Abuja, Nigeria',
      status: 'Pending'
    },
    {
      id: 2,
      product: {
        name: '2014 Mercedes GLK350',
        color: 'Grey',
        price: 3000,
        images: Array(3).fill('/api/placeholder/400/300')
      },
      sender: 'Michael',
      receiver: 'Maria',
      paymentStatus: 'Payment confirmed',
      note: 'Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapie',
      address: 'House 1 Amore street Katampe Abuja, Nigeria',
      status: 'Pending'
    },
    {
      id: 3,
      product: {
        name: '2014 Mercedes GLK350',
        color: 'Grey',
        price: 3000,
        images: Array(3).fill('/api/placeholder/400/300')
      },
      sender: 'Michael',
      receiver: 'Maria',
      paymentStatus: 'Payment confirmed',
      note: 'Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapie',
      address: 'House 1 Amore street Katampe Abuja, Nigeria',
      status: 'Pending'
    },
    {
      id: 4,
      product: {
        name: '2014 Mercedes GLK350',
        color: 'Grey',
        price: 3000,
        images: Array(3).fill('/api/placeholder/400/300')
      },
      sender: 'Michael',
      receiver: 'Maria',
      paymentStatus: 'Payment confirmed',
      note: 'Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapie',
      address: 'House 1 Amore street Katampe Abuja, Nigeria',
      status: 'Pending'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="flex items-center justify-between px-4 py-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
          <Link to="/admin/store"> <ChevronLeft className="w-6 h-6 text-gray-600" /> </Link>
          </button>
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-100 text-sm font-medium text-gray-600 rounded-md mx-4 mb-4">
          <div className="col-span-5">Product details</div>
          <div className="col-span-3">Sender/Note</div>
          <div className="col-span-3">Receiver's Address</div>
          <div className="col-span-1">Status</div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {orders.map((order, index) => (
          <div key={order.id} className={`grid grid-cols-12 gap-6 p-6 ${index !== 0 ? 'border-t border-gray-200' : ''}`}>
            {/* Product Details */}
            <div className="col-span-5 flex gap-6">
              <div className="space-y-2 w-40 flex-shrink-0">
                <div className="aspect-[4/3] relative rounded-md overflow-hidden bg-gray-100">
                  <img
                    src={order.product.images[0]}
                    alt={order.product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-1">
                  {order.product.images.map((image, index) => (
                    <div key={index} className="w-12 h-9 relative rounded overflow-hidden bg-gray-100">
                      <img
                        src={image}
                        alt={`${order.product.name} view ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2 flex-grow">
                <h3 className="font-medium text-gray-900 truncate">{order.product.name}</h3>
                <p className="text-sm text-gray-500">{order.product.color}</p>
                <div className="font-medium text-gray-900">${order.product.price.toLocaleString()}</div>
                <div className="inline-flex px-2 py-1 rounded-md text-xs bg-purple-100 text-purple-600 whitespace-nowrap">
                  {order.paymentStatus}
                </div>
              </div>
            </div>

            {/* Sender Note */}
            <div className="col-span-3 space-y-2">
              <span className="inline-flex px-3 py-1 rounded-md text-xs bg-[#5E17EB] text-white">
                {order.sender}
              </span>
              <div className="p-3 bg-gray-50 rounded-md text-xs text-gray-600">
                {order.note}
              </div>
            </div>

            {/* Address */}
            <div className="col-span-3 space-y-2">
              <div className="text-xs text-gray-600">
                {order.address}
              </div>
              <span className="inline-flex px-3 py-1 rounded-md text-xs bg-[#5E17EB] text-white">
                {order.receiver}
              </span>
            </div>

            {/* Status */}
            <div className="col-span-1">
              <span className="inline-flex px-3 py-1 rounded-md text-xs bg-yellow-100 text-yellow-600">
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}