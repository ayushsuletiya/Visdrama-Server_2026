export type Brand = {
  id: string;
  name: string;
  logo: string;
  color: string;
};

export type Metric = {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
};

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  date: string;
  amount: number;
  status: OrderStatus;
  items: number;
  channel: 'Shopify' | 'Instagram' | 'WhatsApp';
};

export type Product = {
  id: string;
  title: string;
  sku: string;
  price: number;
  image: string;
  status: 'Published' | 'Draft' | 'Out of Stock';
  lastSynced: string;
};

export type Message = {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  channel: 'WhatsApp' | 'Instagram' | 'Messenger';
  isCustomer: boolean;
};

export type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  channel: 'WhatsApp' | 'Instagram' | 'Messenger';
  messages: Message[];
};
