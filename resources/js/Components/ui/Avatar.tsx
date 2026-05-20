import { Gender } from "@/types/warga";
import { getInitials } from "@/utils/helper";

interface AvatarProps {
    name: string;
    gender: Gender;
    size?: "sm" | "md";
}

export function Avatar({ name, gender, size = "md" }: AvatarProps) {
    const dim = size === "sm" ? "w-6 h-6 text-[9px]" : "w-8 h-8 text-[11px]";
    const color =
        gender === "Laki-laki"
            ? "bg-blue-100 text-blue-700"
            : "bg-pink-100 text-pink-700";

    return (
        <div
            className={`${dim} ${color} rounded-full flex items-center justify-center font-medium flex-shrink-0`}
        >
            {getInitials(name)}
        </div>
    );
}
