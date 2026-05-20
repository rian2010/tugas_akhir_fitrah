import type { Gender, HubunganKeluarga, StatusWarga } from "../types";

export function StatusBadge({ status }: { status: StatusWarga }) {
    return status === "Tetap" ? (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
            Tetap
        </span>
    ) : (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-50 text-amber-700 ring-1 ring-amber-200">
            Sementara
        </span>
    );
}

export function GenderBadge({ gender }: { gender: Gender }) {
    return gender === "Laki-laki" ? (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-blue-200">
            Laki-laki
        </span>
    ) : (
        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-pink-50 text-pink-700 ring-1 ring-pink-200">
            Perempuan
        </span>
    );
}

const hubunganStyles: Record<HubunganKeluarga, string> = {
    "Kepala Keluarga": "bg-violet-50 text-violet-700 ring-1 ring-violet-200",
    Istri: "bg-pink-50 text-pink-700 ring-1 ring-pink-200",
    Suami: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
    Anak: "bg-gray-100 text-gray-600 ring-1 ring-gray-200",
    "Orang Tua": "bg-orange-50 text-orange-700 ring-1 ring-orange-200",
    Saudara: "bg-teal-50 text-teal-700 ring-1 ring-teal-200",
    Lainnya: "bg-gray-100 text-gray-600 ring-1 ring-gray-200",
};

export function HubunganBadge({ hubungan }: { hubungan: HubunganKeluarga }) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${hubunganStyles[hubungan]}`}
        >
            {hubungan}
        </span>
    );
}
