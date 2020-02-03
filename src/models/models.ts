export interface DropdownOption {
  option_id: string,
  option_type_id: string,
  price: string,
  sku: string,
  sort_order: string,
  production_days: string,
  production_days_type: string,
  title: string
}

export interface Dropdown {
  title: string;
  id: string;
  values: DropdownOption[];
}

export type ExclusionRule = Object;
