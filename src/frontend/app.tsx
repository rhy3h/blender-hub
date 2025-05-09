import { createRoot } from 'react-dom/client';

import Layout from '@/frontend/layouts/layout';

const App = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">Welcome to Blender Hub</h2>
      </div>
    </Layout>
  );
};

const root = createRoot(document.body);
root.render(<App />);