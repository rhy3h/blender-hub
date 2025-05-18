import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/frontend/components/ui/badge';

export const columns: ColumnDef<BlenderInfo>[] = [
  {
    accessorKey: 'version',
    header: 'Version',
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      return <div>{name}</div>;
    },
  },
  {
    accessorKey: 'modifiedDate',
    header: 'Modified Date',
    cell: ({ row }) => {
      const modifiedDate = row.getValue('modifiedDate') as string;
      return <div>{modifiedDate}</div>;
    },
  },
  {
    accessorKey: 'size',
    header: 'Size',
    cell: ({ row }) => {
      const size = row.getValue('size') as string;
      return <div>{size}</div>;
    },
  },
  {
    accessorKey: 'os',
    header: 'OS',
    cell: ({ row }) => {
      const os = row.getValue('os') as string;
      return <Badge>{os}</Badge>;
    },
  },
  {
    accessorKey: 'arch',
    header: 'Arch',
    cell: ({ row }) => {
      const arch = row.getValue('arch') as string;
      return <Badge>{arch}</Badge>;
    },
  },
];
