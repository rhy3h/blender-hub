import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/frontend/components/ui/badge';

import { DataTableColumnHeader } from '@/frontend/components/ui/data-table/data-table-column-header';

export const columns: ColumnDef<BlenderInfo>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const name = row.getValue('name') as string;
      return <div>{name}</div>;
    },
  },
  {
    accessorKey: 'version',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Version" />
    ),
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
    header: 'Size (MB)',
    cell: ({ row }) => {
      const size = parseInt(row.getValue('size'), 10);
      return <div>{Math.round(size / (1024 * 1024))}</div>;
    },
  },
  {
    accessorKey: 'os',
    header: 'OS',
    cell: ({ row }) => {
      const os = row.getValue('os') as string;
      return <Badge>{os}</Badge>;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: 'arch',
    header: 'Arch',
    cell: ({ row }) => {
      const arch = row.getValue('arch') as string;
      return <Badge>{arch}</Badge>;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
];
