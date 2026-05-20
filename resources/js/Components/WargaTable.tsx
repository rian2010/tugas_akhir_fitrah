import { KartuKeluarga } from "@/types/warga";
import { Avatar } from "./ui/Avatar";
import { GenderBadge, HubunganBadge } from "./ui/Badge";
import { formatDate } from "@/utils/helper";
import { ActionButtons } from "./ui/ActionButton";

interface AnggotaTableProps {
    kk: KartuKeluarga;
}

export function AnggotaTable({ kk }: AnggotaTableProps) {
    return (
        <td colSpan={8} className="p-0 bg-gray-50/50">
            <div className="px-4 pb-4 pt-2">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Anggota Keluarga — {kk.anggota.length} orang
                    </span>
                    <button className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Anggota
                    </button>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                    <table className="min-w-full divide-y divide-gray-100 text-xs">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-3 py-2.5 text-left font-semibold text-gray-500 uppercase tracking-wider">No</th>
                                <th className="px-3 py-2.5 text-left font-semibold text-gray-500 uppercase tracking-wider">NIK</th>
                                <th className="px-3 py-2.5 text-left font-semibold text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                                <th className="px-3 py-2.5 text-left font-semibold text-gray-500 uppercase tracking-wider">Hubungan</th>
                                <th className="px-3 py-2.5 text-left font-semibold text-gray-500 uppercase tracking-wider">Jenis Kelamin</th>
                                <th className="px-3 py-2.5 text-left font-semibold text-gray-500 uppercase tracking-wider">Tanggal Lahir</th>
                                <th className="px-3 py-2.5 text-left font-semibold text-gray-500 uppercase tracking-wider">Pekerjaan</th>
                                <th className="px-3 py-2.5 text-center font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {kk.anggota.map((anggota, idx) => (
                                <tr key={anggota.nik} className="hover:bg-indigo-50/20 transition-colors">
                                    <td className="px-3 py-2.5 text-gray-400">{idx + 1}</td>
                                    <td className="px-3 py-2.5 font-mono text-gray-500">{anggota.nik}</td>
                                    <td className="px-3 py-2.5">
                                        <div className="flex items-center gap-2">
                                            <Avatar name={anggota.nama} gender={anggota.jenisKelamin} size="sm" />
                                            <span className="font-medium text-gray-900">{anggota.nama}</span>
                                        </div>
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <HubunganBadge hubungan={anggota.hubungan} />
                                    </td>
                                    <td className="px-3 py-2.5">
                                        <GenderBadge gender={anggota.jenisKelamin} />
                                    </td>
                                    <td className="px-3 py-2.5 text-gray-600">{formatDate(anggota.tanggalLahir)}</td>
                                    <td className="px-3 py-2.5 text-gray-600">{anggota.pekerjaan}</td>
                                    <td className="px-3 py-2.5">
                                        <ActionButtons />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </td>
    );
}
