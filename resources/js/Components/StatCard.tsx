import { ReactNode } from "react";

type Props = {
    title: string;
    description: string;
    buttonText: string;
    icon: ReactNode;
    color: string; // bg color (ex: bg-green-500)
};

export default function StatCard({
    title,
    description,
    buttonText,
    icon,
    color,
}: Props) {
    return (
        <div className={`${color} text-white p-6 rounded-2xl shadow-md`}>
            <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                    {icon}
                </div>
                <div>
                    <h2 className="font-semibold text-lg">{title}</h2>
                    <p className="text-sm opacity-90">
                        {description}
                    </p>
                </div>
            </div>

            <button className="mt-4 w-full bg-white/20 hover:bg-white/30 transition p-2 rounded-lg">
                {buttonText}
            </button>
        </div>
    );
}
