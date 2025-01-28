

// TypeScript interfaces
interface OrderProduct {
  name: string;
  year: number;
  color: string;
  price: number;
  images: string[];
}

interface OrderSender {
  name: string;
  note?: string;
}

interface Order {
  id: string;
  product: OrderProduct;
  paymentStatus: string;
  sender: OrderSender;
  reviewer: string;
  address: string;
  status: string;
}

interface OrdersProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const Orders = ({ filter, }: OrdersProps) => {
  const orders: Order[] = [
    {
      id: "1",
      product: {
        name: "Mercedes GLK350",
        year: 2014,
        color: "Grey",
        price: 3000,
        images: [
          "/api/placeholder/400/320",
          "/api/placeholder/400/320",
          "/api/placeholder/400/320",
          "/api/placeholder/400/320"
        ]
      },
      paymentStatus: "Payment confirmed",
      sender: {
        name: "Michael",
        note: "Finibus phasellus faucibus scelerisque eleifend donec pretium vulputate sapien"
      },
      reviewer: "Maria",
      address: "House 1 Amara street Example World, Nigeria",
      status: "View"
    },
    {
      id: "2",
      product: {
        name: "Mercedes GLK350",
        year: 2014,
        color: "Grey",
        price: 3000,
        images: [
          "/api/placeholder/400/320",
          "/api/placeholder/400/320",
          "/api/placeholder/400/320",
          "/api/placeholder/400/320"
        ]
      },
      paymentStatus: "Payment confirmed",
      sender: {
        name: "Michael",
        note: "Finibus phasellus faucibus scelerisque eleifend donec pretium vulputate sapien"
      },
      reviewer: "Maria",
      address: "House 1 Amara street Example World, Nigeria",
      status: "View"
    }
  ];

  // Filter orders based on filter state
  const filteredOrders = filter === 'all' ? orders : orders.filter(order => 
    order.paymentStatus.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
      <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 border-b border-gray-200">
        <div className="text-sm font-semibold text-gray-500">Product details</div>
        <div className="text-sm font-semibold text-gray-500">Sender/Note</div>
        <div className="text-sm font-semibold text-gray-500">Reviewer's Address</div>
        <div className="text-sm font-semibold text-gray-500">Status</div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredOrders.map((order) => (
          <div key={order.id} className="grid grid-cols-4 gap-4 p-4">
            <div className="flex gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden">
                <img 
                  src={order.product.images[0]} 
                  alt={`${order.product.name} main`} 
                  className="w-full h-16 object-cover" 
                />
                <div className="grid grid-cols-3 gap-0.5 mt-0.5">
                  {order.product.images.slice(1, 4).map((img, i) => (
                    <img 
                      key={i} 
                      src={img} 
                      alt={`${order.product.name} view ${i + 2}`} 
                      className="w-full h-8 object-cover" 
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{order.product.year} {order.product.name}</h3>
                <p className="text-gray-500 font-semibold">{order.product.color}</p>
                <div className="mt-2">
                  <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                    {order.paymentStatus}
                  </span>
                </div>
                <p className="mt-2 font-bold text-gray-900">${order.product.price.toLocaleString()}</p>
              </div>
            </div>
            
            <div>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-600 text-white rounded-md text-xs font-semibold">
                <span className="w-1.5 h-1.5 bg-white rounded-sm"></span>
                {order.sender.name}
              </span>
              {order.sender.note && (
                <p className="mt-2 text-sm text-gray-500 font-semibold border border-gray-300 rounded-md p-2">
                  {order.sender.note}
                </p>
              )}
            </div>
            
            <div>
              <p className="mt-2 text-sm text-gray-500 font-semibold border border-gray-300 rounded-md p-2">
                {order.address}
              </p>
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-600 text-white rounded-md text-xs font-semibold">
                <span className="w-1.5 h-1.5 bg-white rounded-sm"></span>
                {order.reviewer}
              </span>
            </div>
            
            <div>
              <button className="px-4 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-semibold transition-colors">
                {order.status}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;