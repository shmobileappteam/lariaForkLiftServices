// Static mock data for the entire app — no API calls needed

export const SERVICES = [
  { id: '1', title: 'Light Repairs', desc: 'Basic maintenance, brake adjustments, and minor component replacements for all forklift models.' },
  { id: '2', title: 'Heavy Repairs', desc: 'Engine rebuilds, hydraulic overhauls, transmission repairs and major structural work.' },
  { id: '3', title: 'Tire Services', desc: 'Tire replacement, rotation, balancing and pneumatic/solid tire conversions.' },
  { id: '4', title: 'Preventive Maintenance', desc: 'Scheduled inspections, fluid changes, filter replacements and safety checks.' },
  { id: '5', title: 'Electrical Services', desc: 'Battery maintenance, wiring repairs, control system diagnostics and electric motor service.' },
];

export const BOOKINGS = [
  { id: 'BK-1001', date: 'Oct 24, 2026', time: '09:00 AM', service: 'Light Repairs', status: 'Scheduled' },
  { id: 'BK-1002', date: 'Oct 20, 2026', time: '11:00 AM', service: 'Tire Services', status: 'Scheduled' },
  { id: 'BK-1003', date: 'Oct 15, 2026', time: '10:00 AM', service: 'Heavy Repairs', status: 'Completed' },
  { id: 'BK-1004', date: 'Oct 10, 2026', time: '13:00 PM', service: 'Preventive Maintenance', status: 'Completed' },
];

export const CATEGORIES = [
  { id: '1', name: 'Automation', icon: 'robot' },
  { id: '2', name: 'Seating', icon: 'seat' },
  { id: '3', name: 'Standing', icon: 'human-male' },
  { id: '4', name: 'Walkie', icon: 'walk' },
  { id: '5', name: 'Electric', icon: 'lightning-bolt' },
  { id: '6', name: 'Parts', icon: 'cog' },
];

// Product images using local assets as requested
const P_IMAGE_1 = require('../../assets/images/Frame-86-rdxqhuw28l53kzvfjwv73pghq9jrxb247yyzreg7ts.png');
const P_IMAGE_2 = require('../../assets/images/Frame-87-rdxqh3mqqe3s8az0z330lec4i3a4q31wg81wudkmu8.png');
const P_IMAGE_3 = require('../../assets/images/Frame-88-rdxqfz7okikgd2lqj3m246jayitcj3lfyo017h8k9s.png');

export const PRODUCTS = [
  { 
    id: '1', 
    name: 'Premium Forklift Seat', 
    price: '$120.00', 
    originalPrice: '$150.00', 
    discount: '20% OFF', 
    rating: 4, 
    category: '2',
    image: P_IMAGE_1
  },
  { 
    id: '2', 
    name: 'Hydraulic Pump Assembly', 
    price: '$450.00', 
    rating: 5, 
    category: '6',
    image: P_IMAGE_2
  },
  { 
    id: '3', 
    name: 'LED Work Light Kit', 
    price: '$45.00', 
    originalPrice: '$60.00', 
    discount: '25% OFF', 
    rating: 4, 
    category: '6',
    image: P_IMAGE_3
  },
  { 
    id: '4', 
    name: 'Heavy Duty Traction Tire', 
    price: '$200.00', 
    rating: 4, 
    category: '6',
    image: P_IMAGE_1
  },
  { 
    id: '5', 
    name: 'Electric Control Module', 
    price: '$320.00', 
    originalPrice: '$400.00', 
    discount: '20% OFF', 
    rating: 5, 
    category: '5',
    image: P_IMAGE_2
  },
  { 
    id: '6', 
    name: 'Safety Harness System', 
    price: '$85.00', 
    rating: 3, 
    category: '1',
    image: P_IMAGE_3
  },
  { 
    id: '7', 
    name: 'Operator Console Panel', 
    price: '$275.00', 
    rating: 4, 
    category: '1',
    image: P_IMAGE_1
  },
  { 
    id: '8', 
    name: 'Fork Extension Set', 
    price: '$190.00', 
    originalPrice: '$220.00', 
    discount: '14% OFF', 
    rating: 4, 
    category: '6',
    image: P_IMAGE_2
  },
];

export const CART_ITEMS = [
  { id: '1', name: 'Premium Forklift Seat', desc: 'Ergonomic design, adjustable', price: '$120.00', quantity: 1, rating: 4 },
  { id: '2', name: 'LED Work Light Kit', desc: 'High-brightness LED, waterproof', price: '$45.00', quantity: 1, rating: 4 },
];

export const CHATS = [
  { id: '1', name: 'Aria Support', message: 'Your booking BK-1001 has been confirmed.', time: '2:30 PM', unread: 2 },
  { id: '2', name: 'Technician Mike', message: 'I am on my way to the site now.', time: '1:15 PM', unread: 0 },
  { id: '3', name: 'Parts Dept.', message: 'Your order has been shipped!', time: 'Yesterday', unread: 1 },
  { id: '4', name: 'Service Manager', message: 'Reminder: maintenance due next week.', time: 'Yesterday', unread: 0 },
];

export const NOTIFICATIONS = {
  new: [
    { id: '1', title: 'Your booking is confirmed', time: '2 mins ago', type: 'booking' as const },
    { id: '2', title: '50% discount on first order', time: '1 hour ago', type: 'shop' as const },
    { id: '3', title: 'Your order has been shipped', time: '3 hours ago', type: 'shop' as const },
  ],
  earlier: [
    { id: '4', title: 'Reminder: appointment tomorrow', time: 'Yesterday', type: 'booking' as const },
    { id: '5', title: 'Password changed successfully', time: '2 days ago', type: 'booking' as const },
    { id: '6', title: 'Order delivered', time: '3 days ago', type: 'shop' as const },
  ],
};

export const USER = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 555-0198',
  avatar: null,
};

export const ORDERS = [
  { id: 'ORD-1001', name: 'Premium Forklift Seat', desc: 'Ergonomic design', price: '$120.00', rating: 4, status: 'ongoing' },
  { id: 'ORD-1002', name: 'LED Work Light Kit', desc: 'High-brightness LED', price: '$45.00', rating: 4, status: 'ongoing' },
  { id: 'ORD-1003', name: 'Safety Harness System', desc: 'Full body harness', price: '$85.00', rating: 3, status: 'history' },
  { id: 'ORD-1004', name: 'Fork Extension Set', desc: '72" heavy duty', price: '$190.00', rating: 4, status: 'history' },
];

export const ADDRESSES = [
  { id: '1', label: 'Workplace', address: '123 Industrial Blvd, Dallas, TX', icon: 'office-building' },
  { id: '2', label: 'Home', address: '456 Oak Street, Houston, TX', icon: 'home' },
];

export const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'];

export const DRAWER_ITEMS = [
  { icon: 'calendar-check', label: 'My Bookings', route: '/(tabs)/bookings' },
  { icon: 'wrench', label: 'Services', route: '/booking/services' },
  { icon: 'wifi', label: 'Network', route: null },
  { icon: 'message-text-outline', label: 'Messages', route: '/(tabs)/chat' },
  { icon: 'account-circle-outline', label: 'Profile', route: '/(tabs)/profile' },
];
