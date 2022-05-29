export interface FinancialTypeData {
  id: string;
  description: string;
  type: string;
  date: Date;
  value: number;
  created_at: Date;
  updated_at: Date;
}

export interface FinancialTypeMapper {
  id: string;
  description: string;
  type: string;
  date: string;
  value: number;
}
