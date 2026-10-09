import {StrictMode, Suspense, lazy} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const AdminApp = lazy(() => import('./admin/AdminApp'));
const isAdminPath = window.location.pathname.startsWith('/admin');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdminPath ? <Suspense fallback={<div role="status">Đang tải cổng quản trị…</div>}><AdminApp /></Suspense> : <App />}
  </StrictMode>,
);
