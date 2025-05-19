import * as React from 'react';

export interface FilterValue {
  columnId: string
  placeholder: string
}

export interface FacetedFilters {
  columnId: string
  label: string
  options: IDataTableFacetedFilterOption[]
}

export interface IDataTableFacetedFilterOption {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}
