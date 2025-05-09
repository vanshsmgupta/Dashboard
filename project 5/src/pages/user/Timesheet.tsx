import React, { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Clock, FilePlus, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

interface DayHours {
  day: string;
  date: string;
  hours: number;
  notes: string;
}

const Timesheet: React.FC = () => {
  const [frequency, setFrequency] = useState<'weekly' | 'bi-weekly' | 'monthly'>('weekly');
  const [weekStarting, setWeekStarting] = useState('May 20, 2025');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  
  // Mock data for timesheet entries
  const initialTimesheet: DayHours[] = [
    { day: 'Monday', date: 'May 20', hours: 8, notes: 'Project X development' },
    { day: 'Tuesday', date: 'May 21', hours: 7.5, notes: 'Team meeting, Project X' },
    { day: 'Wednesday', date: 'May 22', hours: 8, notes: 'Project X testing' },
    { day: 'Thursday', date: 'May 23', hours: 6, notes: 'Client meeting, documentation' },
    { day: 'Friday', date: 'May 24', hours: 8, notes: 'Bug fixes, code review' },
    { day: 'Saturday', date: 'May 25', hours: 0, notes: '' },
    { day: 'Sunday', date: 'May 26', hours: 0, notes: '' },
  ];
  
  const [timesheet, setTimesheet] = useState<DayHours[]>(initialTimesheet);
  
  const handleHoursChange = (index: number, hours: number) => {
    const updatedTimesheet = [...timesheet];
    updatedTimesheet[index].hours = hours;
    setTimesheet(updatedTimesheet);
  };
  
  const handleNotesChange = (index: number, notes: string) => {
    const updatedTimesheet = [...timesheet];
    updatedTimesheet[index].notes = notes;
    setTimesheet(updatedTimesheet);
  };
  
  const totalHours = timesheet.reduce((total, day) => total + day.hours, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Timesheet</h1>
          <p className="text-gray-500">Record and submit your working hours</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            size="sm"
            className="flex items-center"
          >
            <FilePlus size={16} className="mr-2" />
            New Timesheet
          </Button>
          <Button 
            onClick={() => setShowSubmitModal(true)}
            size="sm"
            className="flex items-center"
          >
            <Send size={16} className="mr-2" />
            Submit Timesheet
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b">
          <CardTitle>Current Timesheet</CardTitle>
          <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
            <div className="flex border rounded-md overflow-hidden">
              <button 
                className={`px-3 py-1 text-sm ${frequency === 'weekly' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                onClick={() => setFrequency('weekly')}
              >
                Weekly
              </button>
              <button 
                className={`px-3 py-1 text-sm ${frequency === 'bi-weekly' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                onClick={() => setFrequency('bi-weekly')}
              >
                Bi-weekly
              </button>
              <button 
                className={`px-3 py-1 text-sm ${frequency === 'monthly' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                onClick={() => setFrequency('monthly')}
              >
                Monthly
              </button>
            </div>
            <div className="flex items-center border rounded-md">
              <button className="px-2 py-1 hover:bg-gray-100">
                <ChevronLeft size={16} />
              </button>
              <span className="px-2 text-sm">{weekStarting}</span>
              <button className="px-2 py-1 hover:bg-gray-100">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-12 text-sm font-medium text-gray-500 p-3 border-b bg-gray-50">
            <div className="col-span-3">Day</div>
            <div className="col-span-3">Date</div>
            <div className="col-span-2">Hours</div>
            <div className="col-span-4">Notes</div>
          </div>
          
          {timesheet.map((day, index) => (
            <div 
              key={day.day} 
              className="grid grid-cols-12 p-3 border-b last:border-0 items-center"
            >
              <div className="col-span-3 font-medium">{day.day}</div>
              <div className="col-span-3 text-sm text-gray-500">{day.date}</div>
              <div className="col-span-2">
                <Input
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={day.hours}
                  onChange={(e) => handleHoursChange(index, parseFloat(e.target.value) || 0)}
                  className="w-20"
                />
              </div>
              <div className="col-span-4">
                <Input
                  type="text"
                  value={day.notes}
                  onChange={(e) => handleNotesChange(index, e.target.value)}
                  placeholder="Add notes"
                />
              </div>
            </div>
          ))}
          
          <div className="flex justify-between items-center p-4 bg-gray-50 font-medium">
            <span>Total Hours</span>
            <span className="text-lg">{totalHours}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Previous Timesheets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: 1, period: 'May 13 - May 19, 2025', hours: 38, status: 'approved' },
              { id: 2, period: 'May 6 - May 12, 2025', hours: 40, status: 'approved' },
              { id: 3, period: 'Apr 29 - May 5, 2025', hours: 36, status: 'approved' },
            ].map((sheet) => (
              <div 
                key={sheet.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1 text-gray-500" />
                    <span className="font-medium">{sheet.period}</span>
                  </span>
                  <span className="text-sm text-gray-500">{sheet.hours} hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="success" className="flex items-center">
                    <Check size={12} className="mr-1" />
                    {sheet.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {showSubmitModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Submit Timesheet</h2>
            <div className="mb-4">
              <p className="mb-2">You're about to submit the following timesheet:</p>
              <ul className="bg-gray-50 rounded-md p-3 mb-3">
                <li className="flex justify-between py-1 border-b">
                  <span>Period:</span>
                  <span className="font-medium">{weekStarting} (Weekly)</span>
                </li>
                <li className="flex justify-between py-1">
                  <span>Total Hours:</span>
                  <span className="font-medium">{totalHours}</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500">
                Once submitted, your timesheet will be reviewed by your manager.
              </p>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowSubmitModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowSubmitModal(false);
                  // Submit logic would go here
                }}
              >
                Confirm Submission
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timesheet;