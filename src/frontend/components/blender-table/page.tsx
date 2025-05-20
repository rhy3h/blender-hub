import { useEffect, useState } from 'react';

import { columns } from '@/frontend/components/blender-table/columns';

import { DataTable } from '@/frontend/components/ui/data-table/data-table';

async function getData(): Promise<BlenderInfo[]> {
  const data = await window.Blender.fetchVersion();
  return data;
}

export default function BlenderTablePage() {
  const [data, setData] = useState<BlenderInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
