import {
  MetaStockResponse,
  TimeSeriesResponse,
  TimeSeriesValue,
} from "./api/types";

export type IStock = MetaStockResponse;
export type IValuesStockData = TimeSeriesValue;
export type IStockData = TimeSeriesResponse;

interface IOption {
  value: string;
  label: string;
}

export interface IRadioButtonProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export interface IDateInputProps {
  disabled: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

export interface ISelectInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: IOption[];
}

export interface IButtonProps {
  type: "submit" | "button" | "reset";
  variant: "contained" | "outlined" | "text";
  children: React.ReactNode;
  style?: React.CSSProperties
}

export interface IntervalSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  style?: React.CSSProperties;
}

export interface IStockPreferenceFormProps {
  symbol: string;
  handleSetStockData: React.Dispatch<React.SetStateAction<IStockData | null>>;
}
