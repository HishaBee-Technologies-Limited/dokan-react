import { DateRange } from 'react-day-picker';

type DateRangeDef = {
  from: string | undefined;
  to: string | undefined;
};

export type DatePickerWithRangePropsDef = {
  dateRange: DateRangeDef;
  onChange: (dateRange: DateRange | undefined) => void;
};
