import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <main className="flex-grow p-4">
    {children}
  </main>
);

export default Layout;
