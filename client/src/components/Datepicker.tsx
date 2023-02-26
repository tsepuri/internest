import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatepickerProps {
  onDateChange: (date: Date) => void;
}

const Datepicker: React.FC<DatepickerProps> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
    />
  );
};

export default Datepicker;
