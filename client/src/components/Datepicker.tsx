import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


interface DatepickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const Datepicker: React.FC<DatepickerProps> = ({ selectedDate, onDateChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(selectedDate);

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date) {
      onDateChange(date);
    }
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleDateChange}

    />
  );
};

export default Datepicker;
