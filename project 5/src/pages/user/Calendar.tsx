import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

interface Meeting {
  id: string;
  title: string;
  date: Date;
  time: string;
  duration: number;
  marketer: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showMeetingModal, setShowMeetingModal] = useState(false);

  // Mock meetings data
  const meetings: Meeting[] = [
    {
      id: '1',
      title: 'Project Discussion',
      date: new Date(2025, 4, 20),
      time: '10:00 AM',
      duration: 60,
      marketer: 'John Marketer',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Progress Review',
      date: new Date(2025, 4, 22),
      time: '2:00 PM',
      duration: 45,
      marketer: 'Lisa Sales',
      status: 'scheduled'
    }
  ];

  const selectedDayMeetings = meetings.filter(
    meeting => selectedDate && format(meeting.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <p className="text-gray-500">View and manage your scheduled meetings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="border rounded-lg p-3"
              modifiers={{
                meeting: (date) => 
                  meetings.some(meeting => 
                    format(meeting.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                  )
              }}
              modifiersStyles={{
                meeting: { color: '#2563eb', fontWeight: 'bold' }
              }}
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'No date selected'}
            </CardTitle>
            <Button
              onClick={() => setShowMeetingModal(true)}
              className="flex items-center"
            >
              Request Meeting
            </Button>
          </CardHeader>
          <CardContent>
            {selectedDayMeetings.length > 0 ? (
              <div className="space-y-4">
                {selectedDayMeetings.map(meeting => (
                  <div
                    key={meeting.id}
                    className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="p-2 bg-blue-100 rounded-full text-blue-700">
                      <CalendarIcon size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{meeting.title}</h3>
                        <Badge
                          variant={
                            meeting.status === 'completed' ? 'success' :
                            meeting.status === 'cancelled' ? 'danger' : 'primary'
                          }
                        >
                          {meeting.status}
                        </Badge>
                      </div>
                      <div className="mt-1 space-y-1">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock size={14} className="mr-1" />
                          {meeting.time} ({meeting.duration} minutes)
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <User size={14} className="mr-1" />
                          {meeting.marketer}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CalendarIcon size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No meetings scheduled for this day</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {showMeetingModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Request Meeting</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Meeting Title
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Time
                  </label>
                  <input
                    type="time"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Duration (minutes)
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>30</option>
                  <option>45</option>
                  <option>60</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Notes
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowMeetingModal(false)}
                >
                  Cancel
                </Button>
                <Button>
                  Request Meeting
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;