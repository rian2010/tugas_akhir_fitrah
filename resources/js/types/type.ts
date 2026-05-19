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
