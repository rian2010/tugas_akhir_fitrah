import { KartuKeluarga } from "@/types/warga";
import { getKepalaKeluarga } from "@/utils/helper";
import { Avatar } from "./ui/Avatar";
import { StatusBadge } from "./ui/Badge";
import { ActionButtons } from "./ui/ActionButton";
import { AnggotaTable } from "./WargaTable";

interface KKTableRowProps {
    kk: KartuKeluarga;
    isExpanded: boolean;
    onToggle: (id: string) => void;
}

export function KKTableRow({ kk, isExpanded, onToggle }: KKTableRowProps) {
    const kepala = getKepalaKeluarga(kk);

    return (
        <>
            <tr
                onClick={() => onToggle(kk.id)}
                className={`cursor-pointer border-b border-gray-50 transition-colors ${isExpanded ? "bg-indigo-50/30" : "hover:bg-indigo-50/20"
                    }`}
            >
                {/* Chevron */}
                <td className="px-4 py-3.5">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </td>

                {/* No. KK */}
                <td className="px-4 py-3.5">
                    <span className="font-mono text-xs text-gray-500">{kk.noKK}</span>
                </td>

                {/* Kepala Keluarga */}
                <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                        <Avatar name={kepala.nama} gender={kepala.jenisKelamin} />
                        <div>
                            <p className="text-sm font-medium text-gray-900">{kepala.nama}</p>
                            <p className="font-mono text-xs text-gray-400">{kepala.nik}</p>
                        </div>
                    </div>
                </td>

                {/* Jumlah Anggota */}
                <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {kk.anggota.length} orang
                    </span>
                </td>

                {/* RT/RW */}
                <td className="px-4 py-3.5 text-sm text-gray-600">
                    {kk.rt}/{kk.rw}
                </td>

                {/* Alamat */}
                <td className="px-4 py-3.5 text-sm text-gray-600 max-w-[180px] truncate">
                    {kk.alamat}
                </td>

                {/* Status */}
                <td className="px-4 py-3.5">
                    <StatusBadge status={kk.status} />
                </td>

                {/* Aksi */}
                <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                    <ActionButtons />
                </td>
            </tr>

            {/* Expanded anggota panel */}
            {isExpanded && (
                <tr className="border-b border-gray-100">
                    <AnggotaTable kk={kk} />
                </tr>
            )}
        </>
    );
}
