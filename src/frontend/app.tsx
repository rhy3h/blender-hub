import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import Layout from '@/frontend/layouts/layout';

import BlenderTablePage from '@/frontend/components/blender-table/page';

import { useBlender } from '@/frontend/store/use-blender';

const App = () => {
  const { setProgress } = useBlender.getState();

  useEffect(() => {
    window.BLENDER_CALLBACK.DOWNLOAD_ON_PROGRESS((_event, url: string, progress: number) => {
      setProgress(url, progress);
    });
  }, []);

  return (
    <Layout>
      <div className="container mx-auto">
        <BlenderTablePage />
      </div>
    </Layout>
  );
};

const root = createRoot(document.body);
root.render(<App />);
