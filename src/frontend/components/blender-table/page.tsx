'use client';

import { columns } from "./columns"
import { DataTable } from "./data-table"
import { useEffect, useState } from "react"

async function getData(): Promise<BlenderInstaller[]> {
  const data = await window.Blender.fetchVersion();
  return data;
}

export default function BlenderTablePage() {
  const [data, setData] = useState<BlenderInstaller[]>([]);

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
  )
}
