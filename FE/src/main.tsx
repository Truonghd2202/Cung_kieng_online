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

if ("serviceWorker" in navigator && import.meta.env.DEV) {
  // A previously installed PWA worker can serve stale JS/config during local development.
  window.addEventListener("load", () => {
    void navigator.serviceWorker.getRegistrations().then((registrations) =>
      Promise.all(registrations.map((registration) => registration.unregister())),
    );
    void caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key.startsWith("tltl-")).map((key) => caches.delete(key))),
    );
  }, { once: true });
} else if ("serviceWorker" in navigator && !window.location.pathname.startsWith("/admin")) {
  window.addEventListener("load", () => {
    void navigator.serviceWorker.register("/service-worker.js").catch(() => {
      // The app remains usable online when service workers are unavailable.
    });
  }, { once: true });
}
