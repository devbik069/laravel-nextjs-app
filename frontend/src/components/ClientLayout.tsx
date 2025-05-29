'use client';

import Link from 'next/link';
import { Toaster } from 'react-hot-toast'; 
import { AuthProvider, useAuth } from './AuthContext';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  return (
    <>
      {/* Toast Container */}
      <Toaster position="top-right" /> 

      {/* Header */}
      <header className="bg-light py-3 shadow-sm">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="h4 m-0 text-secondary">Simple Auth App</h1>
            </div>
            <nav className="col-auto">
              <ul className="nav">
                <li className="nav-item">
                  <Link href="/" className="nav-link px-2 text-secondary">Home</Link>
                </li>
                {!loading && !isAuthenticated && (
                  <>
                    <li className="nav-item">
                      <Link href="/login" className="nav-link px-2 text-secondary">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link href="/register" className="nav-link px-2 text-secondary">Register</Link>
                    </li>
                  </>
                )}
                {!loading && isAuthenticated && (
                  <li className="nav-item">
                    <Link href="/dashboard" className="nav-link px-2 text-secondary">Dashboard</Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container flex-grow-1 py-4">{children}</main>

      {/* Footer */}
      <footer className="bg-light py-3 mt-auto">
        <div className="container text-center text-muted small">
          © 2025 Simple Auth App
        </div>
      </footer>
    </>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LayoutContent>{children}</LayoutContent>
    </AuthProvider>
  );
}
