export type RaffleType = 'matching' | 'winner' | 'grouping' | 'backup' | 'gold-day';

export interface Participant {
  name: string;
  date: string;
}

export interface GoldDayRaffle {
  startDate: string;
  participants: Participant[];
  dayOfMonth: number;
  schedule: Array<{
    date: string;
    participant: string;
  }>;
}