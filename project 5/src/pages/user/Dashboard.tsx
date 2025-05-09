import React from 'react';
import { Calendar, Clock, DollarSign, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const RecentOffers = () => {
  const offers = [
    { id: 1, title: 'Web Application Development', value: '$5,000', date: '2 days ago', status: 'pending' },
    { id: 2, title: 'Content Creation Package', value: '$1,200', date: '1 week ago', status: 'accepted' },
    { id: 3, title: 'SEO Optimization', value: '$800', date: '2 weeks ago', status: 'rejected' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Offers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {offers.map((offer) => (
            <div key={offer.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex justify-between">
                <h4 className="font-medium">{offer.title}</h4>
                <Badge 
                  variant={
                    offer.status === 'accepted' ? 'success' : 
                    offer.status === 'pending' ? 'warning' : 'danger'
                  }
                >
                  {offer.status}
                </Badge>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-sm font-medium text-green-600">{offer.value}</p>
                <p className="text-xs text-gray-500">{offer.date}</p>
              </div>
            </div>
          ))}
          <Button variant="link" className="w-full mt-2">View all offers</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const TimesheetSummary = () => {
  const weekData = [
    { day: 'Mon', hours: 8 },
    { day: 'Tue', hours: 7.5 },
    { day: 'Wed', hours: 8 },
    { day: 'Thu', hours: 6 },
    { day: 'Fri', hours: 8 },
    { day: 'Sat', hours: 0 },
    { day: 'Sun', hours: 0 },
  ];
  
  const totalHours = weekData.reduce((total, day) => total + day.hours, 0);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Timesheet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Week of May 20, 2025</span>
            <Badge variant="primary">Weekly</Badge>
          </div>
          <div className="flex items-end space-x-2 h-24">
            {weekData.map((day) => (
              <div key={day.day} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-blue-200 rounded-t" 
                  style={{ 
                    height: `${(day.hours / 8) * 100}%`,
                    minHeight: day.hours > 0 ? '4px' : '0' 
                  }}
                ></div>
                <span className="text-xs mt-1">{day.day}</span>
                <span className="text-xs font-medium">{day.hours}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-2 mt-2 border-t">
            <span className="text-sm font-medium">Total Hours</span>
            <span className="text-sm font-bold">{totalHours}</span>
          </div>
          <Button variant="primary" fullWidth className="mt-2">
            <Send size={16} className="mr-2" />
            Submit Timesheet
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  // Mock data for the dashboard stats
  const stats = [
    { 
      title: 'Current Hours', 
      value: '37.5', 
      change: '4 remaining', 
      changeType: 'neutral',
      icon: <Clock size={20} className="text-blue-600" />,
    },
    { 
      title: 'Total Offers', 
      value: '12', 
      change: '+2 new', 
      changeType: 'positive',
      icon: <DollarSign size={20} className="text-green-600" />,
    },
    { 
      title: 'Next Timesheet', 
      value: 'May 27', 
      change: '6 days away', 
      changeType: 'neutral',
      icon: <Calendar size={20} className="text-indigo-600" />,
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
        <p className="text-gray-500">Your timesheet and offer summary</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-full">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <div className="flex items-baseline space-x-2">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <span className={`text-xs font-medium rounded-full px-1.5 py-0.5 ${
                      stat.changeType === 'positive' ? 'text-green-800 bg-green-100' : 
                      stat.changeType === 'negative' ? 'text-red-800 bg-red-100' : 
                      'text-gray-800 bg-gray-100'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimesheetSummary />
        <RecentOffers />
      </div>
    </div>
  );
};

export default Dashboard;