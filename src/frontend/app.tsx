import { createRoot } from 'react-dom/client';

import Layout from '@/frontend/layouts/layout';

import BlenderTablePage from '@/frontend/components/blender-table/page';

const App = () => (
  <Layout>
    <div className="container mx-auto">
      <BlenderTablePage />
    </div>
  </Layout>
);

const root = createRoot(document.body);
root.render(<App />);
