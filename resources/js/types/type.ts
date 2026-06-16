export type ActivityStatus = "approved" | "pending" | "rejected";

export interface ActivityItem {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    status: ActivityStatus;
}

export interface QuickAction {
    id: string;
    icon: "document" | "people";
    title: string;
    description: string;
    onClick?: () => void;
}

export interface StatCard {
    id: string;
    color: "green" | "orange";
    icon: "people" | "document";
    title: string;
    subtitle: string;
    buttonLabel: string;
    onClick?: () => void;
}

// types/index.ts
export type Activity = {
    id: string;
    type: 'warga' | 'surat';
    title: string;
    description: string;
    created_at: string;
    created_at_formatted: string;
    status?: 'pending' | 'approved' | 'rejected' | 'completed';
};

export type DashboardStats = {
    pendingSuratCount: number;
    hasWargaData: boolean;
};

export type User = {
    id: number;
    name: string;
    email: string;
    role?: string;
};

export type PageProps = {
    auth: {
        user: User;
    };
    activities: Activity[];
    stats: DashboardStats;
    error?: string;
};
