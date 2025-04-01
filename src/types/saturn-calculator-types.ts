
export interface ReturnPeriod {
  date: string;
  time: string;
  age: number;
}

export interface SaturnReturnData {
  birthInfo: {
    date: string;
    time: string;
    age: number;
  };
  firstReturn: {
    periods: ReturnPeriod[];
  };
  secondReturn: {
    periods: ReturnPeriod[];
  };
  thirdReturn: {
    periods: ReturnPeriod[];
  };
  fourthReturn?: {
    periods: ReturnPeriod[];
  };
  fifthReturn?: {
    periods: ReturnPeriod[];
  };
  currentPhase: string;
  saturnSign: string;
  insights: string[];
}
