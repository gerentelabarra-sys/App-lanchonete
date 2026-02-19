
import { Product, User, UserPermissions } from './types';

export const ADMIN_PERMISSIONS: UserPermissions = {
  canViewReports: true,
  canManageProducts: true,
  canManageUsers: true,
  canManageLosses: true,
  canManageCashier: true
};

export const DEFAULT_SELLER_PERMISSIONS: UserPermissions = {
  canViewReports: false,
  canManageProducts: false,
  canManageUsers: false,
  canManageLosses: true,
  canManageCashier: true
};

export const INITIAL_PRODUCTS: Product[] = [
  { id: '1', name: 'Açaí Rafaela', price: 25.0, cost: 12.0, category: 'Açaí' },
  { id: '2', name: 'Banana', price: 3.5, cost: 1.0, category: 'Frutas' },
  { id: '3', name: 'Ninho Trufado', price: 5.0, cost: 2.5, category: 'Adicionais' },
  { id: '4', name: 'Brownie', price: 8.0, cost: 4.0, category: 'Doces' },
  { id: '5', name: 'Chocolate Suíço', price: 6.0, cost: 3.0, category: 'Adicionais' },
  { id: '6', name: 'Oreo', price: 4.5, cost: 2.0, category: 'Adicionais' },
  { id: '7', name: 'Morango Natural', price: 5.0, cost: 2.5, category: 'Frutas' },
  { id: '8', name: 'Kinder', price: 7.0, cost: 3.5, category: 'Doces' },
  { id: '9', name: 'Morango ao Leite', price: 5.5, cost: 2.8, category: 'Adicionais' },
  { id: '10', name: 'Sorvete', price: 12.0, cost: 6.0, category: 'Sobremesas' },
  { id: '11', name: 'Coxinha', price: 7.0, cost: 3.0, category: 'Salgados' },
  { id: '12', name: 'Enrolado de Presunto', price: 7.0, cost: 3.0, category: 'Salgados' },
];

export const CATEGORIES = ['Açaí', 'Frutas', 'Adicionais', 'Doces', 'Sobremesas', 'Salgados', 'Bebidas'];
