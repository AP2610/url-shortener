import DatePicker, { type DatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const MyDatePicker = ({ ...props }: DatePickerProps) => {
  return <DatePicker {...props} />;
};
