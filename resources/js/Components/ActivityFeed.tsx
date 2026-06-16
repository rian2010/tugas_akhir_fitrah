// resources/js/Components/ActivityFeed.tsx
import React from 'react';
import { Clock, User, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import type { Activity } from '@/types/type';

type ActivityFeedProps = {
    activities: Activity[];
    emptyMessage?: string;
    className?: string;
};

const ActivityIcon: React.FC<{ activity: Activity }> = ({ activity }) => {
    if (activity.type === 'warga') {
        return <User className="h-5 w-5 text-green-500" />;
    }

    // For surat type, show status-based icon
    switch (activity.status) {
        case 'approved':
            return <CheckCircle className="h-5 w-5 text-green-500" />;
        case 'rejected':
            return <XCircle className="h-5 w-5 text-red-500" />;
        case 'pending':
            return <AlertCircle className="h-5 w-5 text-yellow-500" />;
        default:
            return <FileText className="h-5 w-5 text-blue-500" />;
    }
};

const ActivityFeed: React.FC<ActivityFeedProps> = ({
    activities,
    emptyMessage = 'Tidak ada aktivitas',
    className = ''
}) => {
    if (activities.length === 0) {
        return (
            <div className={`bg-white rounded-lg shadow p-8 text-center ${className}`}>
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="bg-gray-100 rounded-full p-4">
                        <Clock className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500">{emptyMessage}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
            <ul className="divide-y divide-gray-200">
                {activities.map((activity) => (
                    <li key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 mt-1">
                                <ActivityIcon activity={activity} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {activity.title}
                                    </p>
                                    <time className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                        {activity.created_at_formatted}
                                    </time>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">
                                    {activity.description}
                                </p>
                                {activity.status && (
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2
                                        ${activity.status === 'approved' ? 'bg-green-100 text-green-800' :
                                            activity.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-800'}`}
                                    >
                                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityFeed;
