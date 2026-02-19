
import React, { useState } from 'react';
import { useStore } from './store';
import { ViewType, UserRole } from './types';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Reports from './pages/Reports';
import Admin from './pages/Admin';
import Products from './pages/Products';
import Cashier from './pages/Cashier';
import Settings from './pages/Settings';
import Losses from './pages/Losses';

const App: React.FC = () => {
  const store = useStore();
  const { currentUser, activeView, setActiveView, logout } = store;

  if (!currentUser) {
    return <Login onLogin={store.login} />;
  }

  const renderView = () => {
    switch (activeView) {
      case ViewType.DASHBOARD: return <Dashboard store={store} />;
      case ViewType.SALES: return <Sales store={store} />;
      case ViewType.REPORTS: return <Reports store={store} />;
      case ViewType.ADMIN: return <Admin store={store} />;
      case ViewType.PRODUCTS: return <Products store={store} />;
      case ViewType.CASHIER: return <Cashier store={store} />;
      case ViewType.SETTINGS: return <Settings store={store} />;
      case ViewType.LOSSES: return <Losses store={store} />;
      default: return <Dashboard store={store} />;
    }
  };

  const navItems = [
    { type: ViewType.DASHBOARD, label: 'Início', icon: '🏠', roles: ['ADMIN', 'SELLER'] },
    { type: ViewType.SALES, label: 'Vendas', icon: '💰', roles: ['ADMIN', 'SELLER'] },
    { type: ViewType.CASHIER, label: 'Caixa', icon: '🏧', roles: ['ADMIN', 'SELLER'], permission: 'canManageCashier' },
    { type: ViewType.LOSSES, label: 'Perdas', icon: '📉', roles: ['ADMIN', 'SELLER'], permission: 'canManageLosses' },
    { type: ViewType.REPORTS, label: 'Relatórios', icon: '📊', roles: ['ADMIN', 'SELLER'], permission: 'canViewReports' },
    { type: ViewType.ADMIN, label: 'Admin', icon: '🔐', roles: ['ADMIN'] },
    { type: ViewType.PRODUCTS, label: 'Produtos', icon: '🍔', roles: ['ADMIN', 'SELLER'], permission: 'canManageProducts' },
    { type: ViewType.SETTINGS, label: 'Ajustes', icon: '⚙️', roles: ['ADMIN', 'SELLER'] },
  ];

  const filteredNav = navItems.filter(item => {
    if (item.roles && !item.roles.includes(currentUser.role)) return false;
    if (item.permission && !(currentUser.permissions as any)[item.permission]) return false;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-3 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-orange-600">Labarra <span className="text-slate-400 font-light text-sm">SnackManager</span></h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-slate-700">{currentUser.name}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">{currentUser.role === 'ADMIN' ? 'Administrador' : 'Vendedor'}</p>
          </div>
          <button 
            onClick={logout}
            className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors"
          >
            <span className="text-xl">🚪</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 sm:pb-4 p-4 max-w-7xl mx-auto w-full">
        {renderView()}
      </main>

      {/* Bottom Mobile Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t sm:hidden flex justify-around items-center p-2 pb-6 z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {filteredNav.slice(0, 5).map(item => (
          <button
            key={item.type}
            onClick={() => setActiveView(item.type)}
            className={`flex flex-col items-center p-2 rounded-xl transition-all ${
              activeView === item.type ? 'text-orange-600 scale-110' : 'text-slate-400'
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Desktop Sidebar (Optional, but using bottom nav as main metaphor for simplicity) */}
    </div>
  );
};

export default App;
