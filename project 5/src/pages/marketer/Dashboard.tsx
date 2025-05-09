import React from 'react';
import { Calendar, DollarSign, Phone, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const RecentActivity = () => {
  const activities = [
    { id: 1, type: 'call', title: 'Call with ABC Corp', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'offer', title: 'New offer for Project X', time: '1 day ago', status: 'pending' },
    { id: 3, type: 'call', title: 'Follow-up with XYZ Inc', time: '2 days ago', status: 'scheduled' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className={`
                mt-0.5 rounded-full p-1.5
                ${activity.type === 'call' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}
              `}>
                {activity.type === 'call' ? (
                  <Phone size={16} />
                ) : (
                  <DollarSign size={16} />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
              <Badge 
                variant={
                  activity.status === 'completed' ? 'success' : 
                  activity.status === 'pending' ? 'warning' : 'primary'
                }
              >
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const UpcomingCalls = () => {
  const calls = [
    { id: 1, title: 'Product Demo', client: 'Acme Inc', time: 'Today, 3:00 PM', duration: 45 },
    { id: 2, title: 'Initial Consultation', client: 'NewCo', time: 'Tomorrow, 10:00 AM', duration: 60 },
    { id: 3, title: 'Contract Review', client: 'Big Corp', time: 'Friday, 1:30 PM', duration: 30 },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Calls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {calls.map((call) => (
            <div key={call.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{call.title}</h4>
                <span className="text-xs bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
                  {call.duration} min
                </span>
              </div>
              <p className="text-sm text-gray-500">{call.client}</p>
              <p className="text-xs text-gray-500 mt-2">{call.time}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  // Mock data for the dashboard stats
  const stats = [
    { 
      title: 'Total Calls', 
      value: '42', 
      change: '+12%', 
      changeType: 'positive',
      icon: <Phone size={20} className="text-blue-600" />,
    },
    { 
      title: 'Offers Generated', 
      value: '24', 
      change: '+18%', 
      changeType: 'positive',
      icon: <DollarSign size={20} className="text-green-600" />,
    },
    { 
      title: 'Upcoming Meetings', 
      value: '8', 
      change: '-3%', 
      changeType: 'negative',
      icon: <Calendar size={20} className="text-indigo-600" />,
    },
    { 
      title: 'Active Users', 
      value: '15', 
      change: '0%', 
      changeType: 'neutral',
      icon: <Users size={20} className="text-amber-600" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Marketer Dashboard</h1>
        <p className="text-gray-500">Your performance and activity overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <UpcomingCalls />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;