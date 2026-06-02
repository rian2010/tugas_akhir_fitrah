import { KartuKeluarga, Anggota } from "@/types/warga";

interface KKTableRowProps {
    kk: KartuKeluarga;
    isExpanded: boolean;
    onToggle: (id: string) => void;
    onDetail: (kk: KartuKeluarga) => void;
    onAnggotaDetail: (anggota: Anggota) => void; // Add new prop for anggota detail
}

export function KKTableRow({ kk, isExpanded, onToggle, onDetail, onAnggotaDetail }: KKTableRowProps) {
    const kepala = kk.anggota[0];

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    return (
        <>
            <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                <td className="px-4 py-3 text-center">
                    <button
                        onClick={() => onToggle(kk.noKK)}
                        className="inline-flex items-center justify-center w-7 h-7 rounded-full hover:bg-gray-200 transition-colors"
                        aria-label={isExpanded ? "Tutup" : "Buka"}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </td>

                <td className="px-4 py-3">
                    <span className="font-mono text-sm text-gray-700">{kk.noKK}</span>
                </td>

                <td className="px-4 py-3">
                    {kepala ? (
                        <div>
                            <p className="text-sm font-medium text-gray-900">{kepala.nama_lengkap}</p>
                            <p className="text-xs text-gray-400 font-mono">{kepala.nik}</p>
                        </div>
                    ) : (
                        <span className="text-xs text-gray-400">—</span>
                    )}
                </td>

                <td className="px-4 py-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                        {kk.anggota.length}
                    </span>
                </td>

                <td className="px-4 py-3">
                    <span className="text-sm text-gray-700">
                        RT {kk.rt} / RW {kk.rw}
                    </span>
                </td>

                <td className="px-4 py-3 max-w-xs">
                    <p className="text-sm text-gray-600 truncate" title={kk.alamat}>
                        {kk.alamat}
                    </p>
                    <p className="text-xs text-gray-400">{kk.kelurahan}</p>
                </td>

                <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <button
                            onClick={() => onDetail(kk)}
                            className="p-1.5 rounded-md text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                            title="Detail KK"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                        <button className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Hapus">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>

            {isExpanded && (
                <tr>
                    <td colSpan={7} className="bg-indigo-50/40 px-6 py-4">
                        <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-3">
                            Daftar Anggota Keluarga
                        </p>
                        <div className="space-y-2">
                            {kk.anggota.map((a, i) => (
                                <div
                                    key={a.id}
                                    className="flex flex-wrap items-center gap-x-6 gap-y-1 bg-white rounded-lg px-4 py-3 shadow-sm border border-indigo-100"
                                >
                                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                                        {i + 1}
                                    </span>
                                    <div className="min-w-[160px]">
                                        <p className="text-sm font-medium text-gray-900">{a.nama_lengkap}</p>
                                        <p className="text-xs text-gray-400 font-mono">{a.nik}</p>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        <span>{a.jenis_kelamin}</span>
                                        <span className="mx-1.5">·</span>
                                        <span>{a.agama}</span>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {formatDate(a.tanggal_lahir)}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {a.nomor_telepon}
                                    </div>
                                    {/* Add detail button for each anggota */}
                                    <div className="ml-auto">
                                        <button
                                            onClick={() => onAnggotaDetail(a)}
                                            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-md transition-colors"
                                            title="Detail Anggota"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            Detail
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
}
