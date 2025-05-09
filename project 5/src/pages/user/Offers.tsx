import React, { useState } from 'react';
import { Check, DollarSign, Search, X } from 'lucide-react';
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
  marketerId: string;
  marketerName: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const UserOffers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);
  
  // Mock data for offers
  const mockOffers: Offer[] = [
    {
      id: '1',
      title: 'Web Application Development',
      description: 'Full-stack development of a customer portal with authentication and payment processing.',
      value: 15000,
      date: '2025-05-18',
      marketerId: '201',
      marketerName: 'John Marketer',
      status: 'pending',
    },
    {
      id: '2',
      title: 'Mobile App Enhancement',
      description: 'Add new features to existing iOS and Android apps including push notifications and analytics.',
      value: 8500,
      date: '2025-05-15',
      marketerId: '202',
      marketerName: 'Lisa Sales',
      status: 'accepted',
    },
    {
      id: '3',
      title: 'SEO Package',
      description: 'Three-month SEO optimization package including keyword research, on-page optimization, and content strategy.',
      value: 4000,
      date: '2025-05-10',
      marketerId: '201',
      marketerName: 'John Marketer',
      status: 'accepted',
    },
    {
      id: '4',
      title: 'Website Redesign',
      description: 'Complete redesign of corporate website with modern UI/UX and improved mobile responsiveness.',
      value: 12000,
      date: '2025-05-05',
      marketerId: '203',
      marketerName: 'David Thompson',
      status: 'rejected',
    },
  ];

  // Filter offers based on search query and status filter
  const filteredOffers = mockOffers
    .filter(offer => 
      (offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       offer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
       offer.marketerName.toLowerCase().includes(searchQuery.toLowerCase())) &&
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

  const handleAcceptOffer = (id: string) => {
    // In a real app, this would call an API
    console.log(`Accepting offer ${id}`);
    setActiveOfferId(null);
  };
  
  const handleRejectOffer = (id: string) => {
    // In a real app, this would call an API
    console.log(`Rejecting offer ${id}`);
    setActiveOfferId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Offers</h1>
        <p className="text-gray-500">Review and manage offers from marketers</p>
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
                  className={`
                    border rounded-lg overflow-hidden transition-all
                    ${activeOfferId === offer.id ? 'border-blue-400 shadow-md' : 'hover:border-blue-300 hover:shadow-sm'}
                  `}
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
                            {offer.status === 'pending' ? 'Pending' : 
                             offer.status === 'accepted' ? 'Accepted' : 'Rejected'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">{formatCurrency(offer.value)}</p>
                        <p className="text-xs text-gray-500">{formatDate(offer.date)}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t">
                      <div>
                        <span className="text-sm text-gray-600">From: </span>
                        <span className="text-sm font-medium">{offer.marketerName}</span>
                      </div>
                      
                      {offer.status === 'pending' ? (
                        <div className="flex space-x-2">
                          {activeOfferId === offer.id ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setActiveOfferId(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                className="flex items-center"
                                onClick={() => handleRejectOffer(offer.id)}
                              >
                                <X size={14} className="mr-1" />
                                Reject
                              </Button>
                              <Button
                                variant="success"
                                size="sm"
                                className="flex items-center bg-green-600 text-white hover:bg-green-700"
                                onClick={() => handleAcceptOffer(offer.id)}
                              >
                                <Check size={14} className="mr-1" />
                                Accept
                              </Button>
                            </>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setActiveOfferId(offer.id)}
                            >
                              Respond
                            </Button>
                          )}
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                        >
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <DollarSign size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No offers found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserOffers;