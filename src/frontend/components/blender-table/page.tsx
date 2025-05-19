import { useEffect, useState } from 'react';

import { columns } from '@/frontend/components/blender-table/columns';

import { DataTable } from '@/frontend/components/ui/data-table/data-table';

const oses = [
  {
    value: 'Windows',
    label: 'Windows',
  },
  {
    value: 'macOS',
    label: 'macOS',
  },
  {
    value: 'Linux',
    label: 'Linux',
  },
];

const arches = [
  {
    value: 'x64',
    label: 'x64',
  },
  {
    value: 'arm',
    label: 'Arm',
  },
];

const facetedFilters = [
  {
    columnId: 'os',
    label: 'OS',
    options: oses,
  },
  {
    columnId: 'arch',
    label: 'Arch',
    options: arches,
  },
];

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
      <DataTable columns={columns} data={data} facetedFilters={facetedFilters} />
    </div>
  );
}
