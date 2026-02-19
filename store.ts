
import { useState, useEffect, useCallback } from 'react';
import { User, Product, Sale, Table, Loss, CashSession, ViewType } from './types';
import { INITIAL_PRODUCTS, ADMIN_PERMISSIONS, CATEGORIES as INITIAL_CATEGORIES } from './constants';

const STORAGE_KEYS = {
  USERS: 'snack_users',
  PRODUCTS: 'snack_products',
  SALES: 'snack_sales',
  TABLES: 'snack_tables',
  LOSSES: 'snack_losses',
  CASH_SESSIONS: 'snack_cash_sessions',
  CURRENT_USER: 'snack_current_user',
  CATEGORIES: 'snack_categories'
};

const INITIAL_ADMIN: User = {
  id: 'admin-1',
  name: 'Gabriel Labarra',
  role: 'ADMIN',
  password: '22/11/1984',
  permissions: ADMIN_PERMISSIONS
};

export const useStore = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    return saved ? JSON.parse(saved) : [INITIAL_ADMIN];
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [sales, setSales] = useState<Sale[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SALES);
    return saved ? JSON.parse(saved) : [];
  });

  const [tables, setTables] = useState<Table[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TABLES);
    if (saved) return JSON.parse(saved);
    return Array.from({ length: 20 }, (_, i) => ({
      number: i + 1,
      isOpen: false,
      items: []
    }));
  });

  const [losses, setLosses] = useState<Loss[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOSSES);
    return saved ? JSON.parse(saved) : [];
  });

  const [cashSessions, setCashSessions] = useState<CashSession[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CASH_SESSIONS);
    return saved ? JSON.parse(saved) : [];
  });

  const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);

  // Persistence
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SALES, JSON.stringify(sales)); }, [sales]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.TABLES, JSON.stringify(tables)); }, [tables]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.LOSSES, JSON.stringify(losses)); }, [losses]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CASH_SESSIONS, JSON.stringify(cashSessions)); }, [cashSessions]);

  const login = (name: string, password?: string) => {
    const user = users.find(u => u.name === name && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveView(ViewType.DASHBOARD);
  };

  const addCategory = (name: string) => {
    if (categories.includes(name)) return;
    setCategories(prev => [...prev, name]);
  };

  const removeCategory = (name: string) => {
    setCategories(prev => prev.filter(c => c !== name));
  };

  const addSale = (sale: Omit<Sale, 'id'>) => {
    const newSale = { ...sale, id: crypto.randomUUID() };
    setSales(prev => [...prev, newSale]);
  };

  const updateTable = (tableNumber: number, items: Table['items'], isOpen: boolean) => {
    setTables(prev => prev.map(t => 
      t.number === tableNumber ? { ...t, items, isOpen, openedAt: isOpen ? (t.openedAt || Date.now()) : undefined } : t
    ));
  };

  const addLoss = (loss: Omit<Loss, 'id'>) => {
    const newLoss = { ...loss, id: crypto.randomUUID() };
    setLosses(prev => [...prev, newLoss]);
  };

  const addProduct = (p: Omit<Product, 'id'>) => {
    setProducts(prev => [...prev, { ...p, id: crypto.randomUUID() }]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const addUser = (u: Omit<User, 'id'>) => {
    setUsers(prev => [...prev, { ...u, id: crypto.randomUUID() }]);
  };

  const updateUserPermissions = (id: string, permissions: User['permissions']) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, permissions } : u));
  };

  const openCashier = (amount: number) => {
    if (!currentUser) return;
    const session: CashSession = {
      id: crypto.randomUUID(),
      openedAt: Date.now(),
      initialAmount: amount,
      isOpen: true,
      sellerId: currentUser.id
    };
    setCashSessions(prev => [...prev, session]);
  };

  const closeCashier = (amount: number) => {
    setCashSessions(prev => prev.map(s => s.isOpen ? { ...s, isOpen: false, closedAt: Date.now(), finalAmount: amount } : s));
  };

  const resetTables = () => {
    setTables(Array.from({ length: 20 }, (_, i) => ({
      number: i + 1,
      isOpen: false,
      items: []
    })));
  };

  return {
    currentUser, login, logout,
    users, addUser, updateUserPermissions,
    categories, addCategory, removeCategory,
    products, addProduct, updateProduct,
    sales, addSale,
    tables, updateTable, resetTables,
    losses, addLoss,
    cashSessions, openCashier, closeCashier,
    activeView, setActiveView
  };
};
