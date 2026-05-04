import { Brand, Metric, Order, Product, Chat } from './types';

export const MOCK_BRANDS: Brand[] = [
  { id: '1', name: 'Luxe Cosmetics', logo: '✨', color: '#8B5CF6' },
  { id: '2', name: 'Eco-Jewels', logo: '💍', color: '#10B981' },
  { id: '3', name: 'Urban Threads', logo: '👕', color: '#F59E0B' },
];

export const MOCK_METRICS: Metric[] = [
  { label: 'Total Revenue', value: '$124,592', change: 12.5, trend: 'up' },
  { label: 'Active Orders', value: '842', change: 8.2, trend: 'up' },
  { label: 'Avg. Order Value', value: '$148.50', change: -2.4, trend: 'down' },
  { label: 'Conversion Rate', value: '3.2%', change: 0.5, trend: 'up' },
];

export const MOCK_ORDERS: Order[] = [
  { id: '1', orderNumber: '#ORD-1002', customerName: 'Sarah Jenkins', date: '2024-05-03T10:00:00Z', amount: 245.00, status: 'Processing', items: 3, channel: 'Shopify' },
  { id: '2', orderNumber: '#ORD-1003', customerName: 'Michael Chen', date: '2024-05-03T11:15:00Z', amount: 89.99, status: 'Shipped', items: 1, channel: 'Instagram' },
  { id: '3', orderNumber: '#ORD-1004', customerName: 'Emma Watson', date: '2024-05-03T12:30:00Z', amount: 512.40, status: 'Processing', items: 5, channel: 'WhatsApp' },
  { id: '4', orderNumber: '#ORD-1005', customerName: 'John Doe', date: '2024-05-02T15:45:00Z', amount: 120.00, status: 'Delivered', items: 2, channel: 'Shopify' },
  { id: '5', orderNumber: '#ORD-1006', customerName: 'Alice Springs', date: '2024-05-04T08:20:00Z', amount: 45.00, status: 'Processing', items: 1, channel: 'Shopify' },
  { id: '6', orderNumber: '#ORD-1007', customerName: 'Bob Vance', date: '2024-05-04T09:10:00Z', amount: 890.00, status: 'Cancelled', items: 12, channel: 'Shopify' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', title: 'Velvet Matte Lipstick', sku: 'VM-LP-01', price: 24.00, image: 'https://images.unsplash.com/photo-1586776977607-310e9c725c37?w=400&q=80', status: 'Published', lastSynced: '2 mins ago' },
  { id: '2', title: 'Midnight Serum', sku: 'MS-SR-02', price: 68.00, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80', status: 'Published', lastSynced: '15 mins ago' },
  { id: '3', title: 'Golden Hour Palette', sku: 'GH-PL-03', price: 45.00, image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80', status: 'Draft', lastSynced: 'Never' },
];

export const MOCK_CHATS: Chat[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    lastMessage: 'Where is my order #1002?',
    timestamp: '10:45 AM',
    unreadCount: 1,
    channel: 'WhatsApp',
    messages: [
      { id: 'm1', sender: 'Sarah Jenkins', text: 'Hi, I placed an order this morning.', timestamp: '10:40 AM', channel: 'WhatsApp', isCustomer: true },
      { id: 'm2', sender: 'Sarah Jenkins', text: 'Where is my order #1002?', timestamp: '10:45 AM', channel: 'WhatsApp', isCustomer: true },
      { id: 'm3', sender: 'AI Agent', text: 'Hello Sarah! Checking your order status now. One moment...', timestamp: '10:46 AM', channel: 'WhatsApp', isCustomer: false },
    ]
  },
  {
    id: '2',
    name: 'Michael Chen',
    lastMessage: 'Thanks for the quick response!',
    timestamp: 'Yesterday',
    unreadCount: 0,
    channel: 'Instagram',
    messages: [
      { id: 'm4', sender: 'Michael Chen', text: 'Can I change my shipping address?', timestamp: 'May 2nd, 2:00 PM', channel: 'Instagram', isCustomer: true },
      { id: 'm5', sender: 'Support', text: 'Of course! Please provide the new address.', timestamp: 'May 2nd, 2:05 PM', channel: 'Instagram', isCustomer: false },
      { id: 'm6', sender: 'Michael Chen', text: 'Thanks for the quick response!', timestamp: 'May 2nd, 2:10 PM', channel: 'Instagram', isCustomer: true },
    ]
  },
  {
    id: '3',
    name: 'Emma Watson',
    lastMessage: 'Do you have this in blue?',
    timestamp: '2 hours ago',
    unreadCount: 2,
    channel: 'WhatsApp',
    messages: [
      { id: 'm7', sender: 'Emma Watson', text: 'I saw the Midnight Serum.', timestamp: '12:00 PM', channel: 'WhatsApp', isCustomer: true },
      { id: 'm8', sender: 'Emma Watson', text: 'Do you have this in blue?', timestamp: '12:01 PM', channel: 'WhatsApp', isCustomer: true },
    ]
  }
];

export const MOCK_ACTIVITY = [
  { id: 1, type: 'order', text: 'New order #ORD-1004 from Emma Watson', time: '2 mins ago', icon: '🛍️' },
  { id: 2, type: 'message', text: 'New WhatsApp message from Sarah Jenkins', time: '15 mins ago', icon: '💬' },
  { id: 3, type: 'stock', text: 'Midnight Serum is running low (4 left)', time: '1 hour ago', icon: '⚠️' },
  { id: 4, type: 'payout', text: 'Payout of $4,200.00 processed', time: '3 hours ago', icon: '💰' },
  { id: 5, type: 'system', text: 'Shopify sync completed successfully', time: '4 hours ago', icon: '🔄' },
];

export const TOP_PRODUCTS = [
  { id: '1', name: 'Velvet Matte Lipstick', sales: 142, revenue: 3408, growth: 12 },
  { id: '2', name: 'Midnight Serum', sales: 89, revenue: 6052, growth: 24 },
  { id: '3', name: 'Golden Hour Palette', sales: 64, revenue: 2880, growth: -5 },
];
