export interface User {
  id: string;
  name: string;
  email: string;
  role: 'marketer' | 'user';
  avatar?: string;
  phone?: string;
  dob?: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  value: number;
  date: string;
  marketerId: string;
  userId: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface ScheduleCall {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number; // in minutes
  marketerId: string;
  clientName: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Timesheet {
  id: string;
  userId: string;
  weekStarting: string;
  frequency: 'weekly' | 'bi-weekly' | 'monthly';
  hoursWorked: { [key: string]: number }; // date -> hours
  status: 'draft' | 'submitted' | 'approved';
  notes?: string;
}

export interface Notification {
  id: string;
  recipientId: string;
  message: string;
  date: string;
  read: boolean;
  type: 'offer' | 'schedule' | 'timesheet' | 'system';
  relatedItemId?: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  marketerId: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
}