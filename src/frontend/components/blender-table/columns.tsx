import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/frontend/components/ui/badge"

export const columns: ColumnDef<BlenderInstaller>[] = [
  {
    accessorKey: "version",
    header: "Version",
  },
  {
    accessorKey: "uploadTime",
    header: "Upload Time",
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusVariant = status === "Installed" ? "default" : "secondary";
      return <Badge variant={statusVariant}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      if (status === 'Installed') {
        return <Badge>Uninstall</Badge>;
      } else {
        return <Badge>Install</Badge>;
      }
    },
  },
]
