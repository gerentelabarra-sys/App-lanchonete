
export type UserRole = 'ADMIN' | 'SELLER';

export interface UserPermissions {
  canViewReports: boolean;
  canManageProducts: boolean;
  canManageUsers: boolean;
  canManageLosses: boolean;
  canManageCashier: boolean;
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  password?: string;
  permissions: UserPermissions;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  cost: number;
  category: string;
}

export type PaymentMethod = 'DINHEIRO' | 'CARTAO' | 'PIX';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Sale {
  id: string;
  timestamp: number;
  sellerId: string;
  sellerName: string;
  items: OrderItem[];
  total: number;
  paymentMethod: PaymentMethod;
  type: 'COUNTER' | 'TABLE';
  tableNumber?: number;
}

export interface Table {
  number: number;
  isOpen: boolean;
  items: OrderItem[];
  openedAt?: number;
}

export interface Loss {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  reason: string;
  employeeName: string;
  timestamp: number;
  costValue: number;
}

export interface CashSession {
  id: string;
  openedAt: number;
  closedAt?: number;
  initialAmount: number;
  finalAmount?: number;
  isOpen: boolean;
  sellerId: string;
}

export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  SALES = 'SALES',
  REPORTS = 'REPORTS',
  ADMIN = 'ADMIN',
  PRODUCTS = 'PRODUCTS',
  CASHIER = 'CASHIER',
  SETTINGS = 'SETTINGS',
  LOSSES = 'LOSSES'
}
