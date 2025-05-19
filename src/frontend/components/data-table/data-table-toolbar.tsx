import { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import { Button } from '@/frontend/components/ui/button';
import { Input } from '@/frontend/components/ui/input';

import { DataTableFacetedFilter } from '@/frontend/components/data-table/data-table-faceted-filter';
import { DataTableViewOptions } from '@/frontend/components/data-table/data-table-view-options';
import { FilterValue, FacetedFilters } from '@/frontend/components/data-table/data-table-types';

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filterValue?: FilterValue[]
  facetedFilters?: FacetedFilters[]
}

export function DataTableToolbar<TData>({
  table,
  filterValue,
  facetedFilters,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {filterValue && filterValue.map((filterColumn) => {
          const column = table.getColumn(filterColumn.columnId);
          if (!column) return null;

          return (
            <Input
              key={filterColumn.columnId}
              placeholder={filterColumn.placeholder}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(e) => column.setFilterValue(e.target.value)}
              className="h-8 w-[150px] lg:w-[250px]"
            />
          );
        })}
        {
          facetedFilters && facetedFilters.map((facetedFilter) => {
            const column = table.getColumn(facetedFilter.columnId);
            if (!column) return null;
            return (
              <DataTableFacetedFilter
                column={column}
                title={facetedFilter.label}
                options={facetedFilter.options}
              />
            );
          })
        }
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
