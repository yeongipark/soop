export interface KakaoLogin {
  code: string;
}

export interface DayInMonth {
  date: string;
  year: string;
  month: string;
  day: string;
  dayIndexOfWeek: number;
}

export interface CalendarBodyProps {
  isOverMax: (date: string) => boolean;
  before: (date: string) => boolean;
  today: (date: string) => boolean;
  currentDate: {
    year: string;
    month: string;
    day: string;
  };
  daysInMonth: DayInMonth[];
  dispatch: {
    handlePrevMonth: () => void;
    handleNextMonth: () => void;
  };
  selectedDate: {
    date: string;
    selectDate: (date: string) => void;
  };
}
