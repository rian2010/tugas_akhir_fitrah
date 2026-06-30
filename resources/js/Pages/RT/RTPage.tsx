import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import React from 'react';
import {
    Users,
    Clock,
    FileText,
    CheckCircle,
    TrendingUp,
    TrendingDown,
    UserPlus,
    Activity,
    Bell,
    AlertCircle
} from 'lucide-react';

interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    change?: {
        value: number;
        type: 'increase' | 'decrease' | 'neutral';
        period?: string;
    };
    description?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, description }) => {
    const changeStyles: Record<string, string> = {
        increase: 'text-green-600 bg-green-50',
        decrease: 'text-red-600 bg-red-50',
        neutral: 'text-gray-600 bg-gray-50',
    };

    const ChangeIcon = change?.type === 'increase' ? TrendingUp
        : change?.type === 'decrease' ? TrendingDown
            : null;

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
                    {description && (
                        <p className="text-xs text-gray-500 mt-1">{description}</p>
                    )}
                </div>
                <div className="p-3 bg-blue-50 rounded-lg shrink-0">
                    <div className="text-blue-600">{icon}</div>
                </div>
            </div>

            {change && (
                <div className={`mt-4 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${changeStyles[change.type]}`}>
                    {ChangeIcon && <ChangeIcon className="w-3 h-3" />}
                    <span>{change.value > 0 ? '+' : ''}{change.value}</span>
                    <span className="font-normal opacity-75">{change.period || 'bulan ini'}</span>
                </div>
            )}
        </div>
    );
};

type SuratStatus = 'Menunggu' | 'Setuju' | 'Tolak';

interface PengajuanItem {
    name: string;
    type: string;
    date: string;
    status: SuratStatus;
    id: number;
}

interface ActivityItem {
    id: string;
    type: 'warga' | 'surat';
    title: string;
    description: string;
    created_at: string;
    created_at_formatted: string;
    status?: string;
}

const statusBadge: Record<SuratStatus, string> = {
    Menunggu: 'text-yellow-600 bg-yellow-50',
    Tolak: 'text-red-600 bg-red-50',
    Setuju: 'text-green-600 bg-green-50',
};

interface DashboardStats {
    totalPenduduk: number;
    pengajuanMenunggu: number;
    suratDiproses: number;
    selesaiBulanIni: number;
    pendingSuratCount: number;
}

const quickActions = [
    { href: '/rt/verifikasi-surat', icon: Clock, color: 'yellow', label: 'Verifikasi', sub: 'Pengajuan' },
    { href: '/rt/data-warga', icon: Users, color: 'green', label: 'Data Warga', sub: 'Kelola' },
] as const;

const colorClasses: Record<string, { bg: string; icon: string }> = {
    blue: { bg: 'bg-blue-50 hover:bg-blue-100', icon: 'text-blue-600' },
    yellow: { bg: 'bg-yellow-50 hover:bg-yellow-100', icon: 'text-yellow-600' },
    green: { bg: 'bg-green-50 hover:bg-green-100', icon: 'text-green-600' },
    purple: { bg: 'bg-purple-50 hover:bg-purple-100', icon: 'text-purple-600' },
};

interface DashboardRTProps {
    stats?: DashboardStats;
    recentApplications?: PengajuanItem[];
    recentActivities?: ActivityItem[];
    changeSelesai?: number;
    hasWargaData?: boolean;
    user?: {
        id: number;
        name: string;
        email: string;
    };
}

const DashboardRT: React.FC<DashboardRTProps> = ({
    stats = {
        totalPenduduk: 0,
        pengajuanMenunggu: 0,
        suratDiproses: 0,
        selesaiBulanIni: 0,
        pendingSuratCount: 0
    },
    recentApplications = [],
    recentActivities = [],
    changeSelesai = 0,
    hasWargaData = false,
    user = null,
}) => {
    // Determine change type for Selesai Bulan Ini
    const getChangeType = (value: number): 'increase' | 'decrease' | 'neutral' => {
        if (value > 0) return 'increase';
        if (value < 0) return 'decrease';
        return 'neutral';
    };

    // Get icon for activity type
    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'warga':
                return <Users className="w-4 h-4 text-blue-600" />;
            case 'surat':
                return <FileText className="w-4 h-4 text-green-600" />;
            default:
                return <Activity className="w-4 h-4 text-gray-600" />;
        }
    };

    // Get status color for activity
    const getActivityStatusColor = (status?: string) => {
        switch (status) {
            case 'pending':
            case 'menunggu':
                return 'text-yellow-600 bg-yellow-50';
            case 'processing':
            case 'diproses':
                return 'text-blue-600 bg-blue-50';
            case 'completed':
            case 'selesai':
                return 'text-green-600 bg-green-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <Authenticated>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            title="Total Penduduk"
                            value={stats.totalPenduduk}
                            icon={<Users className="w-5 h-5" />}
                            change={{ value: 12, type: 'increase', period: 'bulan ini' }}
                            description="Total warga terdaftar"
                        />
                        <StatCard
                            title="Pengajuan Menunggu"
                            value={stats.pengajuanMenunggu}
                            icon={<Clock className="w-5 h-5" />}
                            description="Perlu diverifikasi"
                        />
                        <StatCard
                            title="Surat Diproses"
                            value={stats.suratDiproses}
                            icon={<FileText className="w-5 h-5" />}
                            description="Dalam progress"
                        />
                        <StatCard
                            title="Selesai Bulan Ini"
                            value={stats.selesaiBulanIni}
                            icon={<CheckCircle className="w-5 h-5" />}
                            change={{
                                value: changeSelesai,
                                type: getChangeType(changeSelesai),
                                period: 'dari bulan lalu'
                            }}
                            description="Surat selesai diproses"
                        />
                    </div>

                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Applications */}
                        <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-600" />
                                Pengajuan Terbaru
                            </h3>

                            {recentApplications.length === 0 ? (
                                <p className="text-sm text-gray-400 py-6 text-center">
                                    Belum ada pengajuan terbaru.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {recentApplications.map((item, index) => (
                                        <div
                                            key={`${item.name}-${index}`}
                                            className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                                        >
                                            <div>
                                                <p className="font-medium text-gray-900">{item.name}</p>
                                                <p className="text-sm text-gray-500">{item.type}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-400">{item.date}</p>
                                                <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge[item.status]}`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>


                        {/* Quick Actions */}
                        <div className="lg:col-span-1 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <UserPlus className="w-5 h-5 text-blue-600" />
                                Aksi Cepat
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {quickActions.map(({ href, icon: Icon, color, label, sub }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={`p-4 rounded-lg transition-colors text-left block ${colorClasses[color].bg}`}
                                    >
                                        <Icon className={`w-5 h-5 mb-2 ${colorClasses[color].icon}`} />
                                        <p className="text-sm font-medium text-gray-900">{label}</p>
                                        <p className="text-xs text-gray-500">{sub}</p>
                                    </Link>
                                ))}
                            </div>

                            {/* Additional Info */}
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Total Surat Bulan Ini</span>
                                    <span className="font-semibold text-gray-900">
                                        {stats.selesaiBulanIni + stats.suratDiproses}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm mt-1">
                                    <span className="text-gray-600">Proses Verifikasi</span>
                                    <span className="font-semibold text-yellow-600">
                                        {stats.pengajuanMenunggu}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default DashboardRT;
