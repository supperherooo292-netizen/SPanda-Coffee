import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem, CartItem, Order, User, Testimonial } from '../types';

interface AppContextType {
  // Menu
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  
  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  
  // Users
  users: User[];
  currentUser: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;

  // Testimonials
  testimonials: Testimonial[];
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'createdAt'>) => void;
  toggleTestimonialApproval: (id: string) => void;
  deleteTestimonial: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial mock data
const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Cappuccino',
    description: 'Kopi Italia klasik dengan busa susu premium yang lembut',
    price: 69750,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1667388363683-a07bbf0c84b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwbGF0dGUlMjBhcnR8ZW58MXx8fHwxNzY5NjkxNTY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
  {
    id: '2',
    name: 'Espresso',
    description: 'Espresso Italia yang kuat dan kaya dengan rasa mendalam',
    price: 46500,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1528401635478-821b5f89ff94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGRyaW5rJTIwY29mZmVlfGVufDF8fHx8MTc2OTc2MDI5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
  {
    id: '3',
    name: 'Iced Latte',
    description: 'Latte dingin yang menyegarkan dengan es batu sempurna',
    price: 77500,
    category: 'coffee',
    image: 'https://images.unsplash.com/photo-1684439670717-b1147a7e7534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwY29mZmVlJTIwYmV2ZXJhZ2V8ZW58MXx8fHwxNzY5NzYwMjkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
  {
    id: '4',
    name: 'Matcha Latte',
    description: 'Teh hijau matcha Jepang premium dengan susu yang lembut dan creamy',
    price: 85250,
    category: 'non-coffee',
    image: 'https://images.unsplash.com/photo-1708572727896-117b5ea25a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBsYXR0ZSUyMGdyZWVufGVufDF8fHx8MTc2OTc1Mzk3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
  {
    id: '5',
    name: 'Croissant',
    description: 'Pastry Perancis yang garing dan berlapis mentega autentik',
    price: 54250,
    category: 'snacks',
    image: 'https://images.unsplash.com/photo-1751151856149-5ebf1d21586a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnklMjBiYWtlcnl8ZW58MXx8fHwxNzY5NzE1OTYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
  {
    id: '6',
    name: 'Chocolate Cake',
    description: 'Kue cokelat berlapis yang kaya, lembab, dan lezat',
    price: 93000,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3Njk2NzkwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('menuItems');
    return saved ? JSON.parse(saved) : initialMenuItems;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [
      { id: '1', username: 'admin', role: 'admin', createdAt: new Date() },
      { id: '2', username: 'cashier', role: 'cashier', createdAt: new Date() },
    ];
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('testimonials');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Sarah Johnson', text: 'Kopi terbaik di kota! Suasana yang begitu nyaman dan hangat, membuat saya ingin kembali lagi.', rating: 5, approved: true, createdAt: new Date() },
      { id: '2', name: 'Michael Chen', text: 'Cappuccino yang menakjubkan dan staf yang sangat ramah! Ini adalah tempat favorit saya setiap pagi.', rating: 5, approved: true, createdAt: new Date() },
      { id: '3', name: 'Emma Davis', text: 'Suka sekali dengan pastri mereka dan vibes kafe yang sempurna. Tempat yang ideal untuk bekerja atau bersantai.', rating: 5, approved: true, createdAt: new Date() },
    ];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('menuItems', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Menu functions
  const addMenuItem = (item: MenuItem) => {
    setMenuItems([...menuItems, item]);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  // Cart functions
  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Order functions
  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setOrders([newOrder, ...orders]);
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status } : order
    ));
  };

  // User functions
  const login = (username: string, password: string) => {
    // Simple mock authentication (in production, use proper auth)
    const user = users.find(u => u.username === username);
    if (user && password === 'password') {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addUser = (userData: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setUsers([...users, newUser]);
  };

  // Testimonial functions
  const addTestimonial = (testimonialData: Omit<Testimonial, 'id' | 'createdAt'>) => {
    const newTestimonial: Testimonial = {
      ...testimonialData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTestimonials([newTestimonial, ...testimonials]);
  };

  const toggleTestimonialApproval = (id: string) => {
    setTestimonials(testimonials.map(t =>
      t.id === id ? { ...t, approved: !t.approved } : t
    ));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        orders,
        addOrder,
        updateOrderStatus,
        users,
        currentUser,
        login,
        logout,
        addUser,
        testimonials,
        addTestimonial,
        toggleTestimonialApproval,
        deleteTestimonial,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
