import { memo } from 'react';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/frontend/components/ui/badge';

import { DataTableColumnHeader } from '@/frontend/components/ui/data-table/data-table-column-header';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/frontend/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/frontend/components/ui/dropdown-menu';

import { useBlender } from '@/frontend/store/use-blender';

export const ProgressBadge = memo(({ url } : { url: string }) => {
  const progress = useBlender((s) => s.progressMap[url]);

  return progress !== undefined ? (
    <Badge>
      {Math.round(progress * 100)}
      %
    </Badge>
  ) : null;
});

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
  {
    id: 'progress',
    header: 'Progress',
    cell: ({ row }) => {
      const { url } = row.original;

      return <ProgressBadge url={url} />;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => { window.BLENDER.DOWNLOAD_VERSION(row.original.url); }}
          >
            Download
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
