export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'non-coffee' | 'snacks' | 'desserts';
  image: string;
  available: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  customerName: string;
  phone?: string;
  tableNumber?: string;
  orderType: 'dine-in' | 'takeaway';
  paymentMethod: 'cash' | 'qr' | 'e-wallet';
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'cashier';
  createdAt: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  approved: boolean;
  createdAt: Date;
}

export interface BaristaTeam {
  id: string;
  name: string;
  role: string;
  image: string;
}
