interface StatCardProps {
    label: string;
    value: number;
    color: string;
}

export function StatCard({ label, value, color }: StatCardProps) {
    return (
        <div className={`flex-1 min-w-[100px] rounded-lg p-4 ${color}`}>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs mt-0.5 opacity-75">{label}</p>
        </div>
    );
}
