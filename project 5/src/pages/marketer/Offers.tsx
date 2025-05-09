import React, { useState } from 'react';
import { DollarSign, Plus, Search, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

interface Offer {
  id: string;
  title: string;
  description: string;
  value: number;
  date: string;
  userId: string;
  userName: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const Offers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Mock data for offers
  const mockOffers: Offer[] = [
    {
      id: '1',
      title: 'Web Application Development',
      description: 'Full-stack development of a customer portal with authentication and payment processing.',
      value: 15000,
      date: '2025-05-18',
      userId: '101',
      userName: 'Jane Smith',
      status: 'pending',
    },
    {
      id: '2',
      title: 'Mobile App Enhancement',
      description: 'Add new features to existing iOS and Android apps including push notifications and analytics.',
      value: 8500,
      date: '2025-05-15',
      userId: '102',
      userName: 'Mike Johnson',
      status: 'accepted',
    },
    {
      id: '3',
      title: 'SEO Package',
      description: 'Three-month SEO optimization package including keyword research, on-page optimization, and content strategy.',
      value: 4000,
      date: '2025-05-10',
      userId: '101',
      userName: 'Jane Smith',
      status: 'accepted',
    },
    {
      id: '4',
      title: 'Website Redesign',
      description: 'Complete redesign of corporate website with modern UI/UX and improved mobile responsiveness.',
      value: 12000,
      date: '2025-05-05',
      userId: '103',
      userName: 'Sarah Williams',
      status: 'rejected',
    },
  ];

  // Filter offers based on search query and status filter
  const filteredOffers = mockOffers
    .filter(offer => 
      (offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       offer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
       offer.userName.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === 'all' || offer.status === statusFilter)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const statusLabels = {
    pending: 'Pending',
    accepted: 'Accepted',
    rejected: 'Rejected',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Offers</h1>
          <p className="text-gray-500">Create and manage client offers</p>
        </div>
        <Button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Create New Offer
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>All Offers</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search offers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mt-4">
            {filteredOffers.length > 0 ? (
              filteredOffers.map(offer => (
                <div 
                  key={offer.id}
                  className="border rounded-lg overflow-hidden hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div>
                        <div className="flex items-start space-x-2">
                          <h4 className="font-medium text-lg">{offer.title}</h4>
                          <Badge
                            variant={
                              offer.status === 'accepted' ? 'success' :
                              offer.status === 'rejected' ? 'danger' : 'warning'
                            }
                          >
                            {statusLabels[offer.status]}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">{formatCurrency(offer.value)}</p>
                        <p className="text-xs text-gray-500">{formatDate(offer.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center mt-3 pt-3 border-t">
                      <User size={14} className="text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">Assigned to: </span>
                      <span className="text-sm font-medium ml-1">{offer.userName}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-2 flex justify-end space-x-2 border-t">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <DollarSign size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No offers found</p>
                <Button 
                  variant="link" 
                  onClick={() => setShowAddModal(true)}
                  className="mt-2"
                >
                  Create your first offer
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Create New Offer</h2>
            <form className="space-y-4">
              <Input label="Title" type="text" required />
              <Input label="Description" as="textarea" rows={3} required />
              <Input label="Value" type="number" min="0" step="100" required />
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Assign to User
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="">Select a user</option>
                  <option value="101">Jane Smith</option>
                  <option value="102">Mike Johnson</option>
                  <option value="103">Sarah Williams</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button>
                  Create Offer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offers;