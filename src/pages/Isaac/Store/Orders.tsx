import { useState } from 'react';
import MerchantOrder from './Order-components/Merchant-order';
import BondytOrder from './Order-components/Bondyt-order';

interface OrderProduct {
  name: string;
  year: number;
  color: string;
  price: number;
  images: string[];
}

interface OrderSender {
  name: string;
  note: string;
}

// Base interface for common order properties
interface BaseOrder {
  id: string;
  product: OrderProduct;
  paymentStatus: string;
  sender: OrderSender;
  reviewer: string;
  address: string;
}

// Type discriminated merchant orders
interface MerchantOrder extends BaseOrder {
  type: 'merchant';
  merchantId: string;
  status: 'Incomplete' | 'In progress' | 'Complete';
}

// Type discriminated bondyt orders
interface BondytOrder extends BaseOrder {
  type: 'bondyt';
  status: 'Incomplete' | 'In progress' | 'Complete';
}

// Union type for all order types
type Order = MerchantOrder | BondytOrder;

interface OrdersProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const Orders: React.FC<OrdersProps> = ({ filter }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderType, setOrderType] = useState<'merchant' | 'bondyt' | null>(null);

  const orders: Order[] = [
    {
      id: "1",
      type: 'merchant',
      product: {
        name: "Mercedes GLK350",
        year: 2014,
        color: "Grey",
        price: 3000,
        images: Array(4).fill("/api/placeholder/400/320"),
      },
      paymentStatus: "Payment confirmed",
      sender: {
        name: "Michel",
        note: "Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapie",
      },
      reviewer: "Maria",
      address: "House 1 Amore street Katampe Abuja, Nigeria",
      status: "Incomplete",
      merchantId: "MER-101",
    },
    {
      id: "2",
      type: 'bondyt',
      product: {
        name: "Mercedes GLK350",
        year: 2014,
        color: "Grey",
        price: 3000,
        images: Array(4).fill("/api/placeholder/400/320"),
      },
      paymentStatus: "Payment confirmed",
      sender: {
        name: "Michel",
        note: "Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapie",
      },
      reviewer: "Maria",
      address: "House 1 Amore street Katampe Abuja, Nigeria",
      status: "Incomplete",
    },
  ];

  const filteredOrders = filter === "all"
    ? orders
    : orders.filter(order => 
        order.paymentStatus.toLowerCase().includes(filter.toLowerCase())
      );

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setOrderType(order.type);
  };

  const handleBack = () => {
    setSelectedOrder(null);
    setOrderType(null);
  };

  if (selectedOrder?.type === 'merchant' && orderType === 'merchant') {
    return (
      <MerchantOrder
        order={selectedOrder}
        onBack={handleBack}
      />
    );
  }

  if (selectedOrder?.type === 'bondyt' && orderType === 'bondyt') {
    return (
      <BondytOrder
        order={selectedOrder}
        onBack={handleBack}
      />
    );
  }

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
          <div key={order.id} className="grid grid-cols-4 gap-4 p-6">
            <div className="flex gap-4">
              <div className="w-32 space-y-2">
                <img
                  src={order.product.images[0]}
                  alt={`${order.product.name} main`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <div className="grid grid-cols-3 gap-1">
                  {order.product.images.slice(1, 4).map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${order.product.name} view ${i + 2}`}
                      className="w-full h-8 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {order.product.year} {order.product.name}
                </h3>
                <p className="text-gray-500">{order.product.color}</p>
                <span
                  className="inline-block mt-2 px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium"
                >
                  {order.paymentStatus}
                </span>
                <p className="mt-2 font-bold text-xl text-gray-900">
                  ${order.product.price.toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                {order.sender.name}
              </button>
              <p className="mt-2 text-sm text-gray-600 border border-gray-200 rounded-lg p-3">
                {order.sender.note}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">{order.address}</p>
              <button className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md text-sm font-medium hover:bg-indigo-200 transition-colors">
                {order.reviewer}
              </button>
            </div>

            <div className="flex items-start justify-end">
              <button 
                onClick={() => handleOrderClick(order)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;