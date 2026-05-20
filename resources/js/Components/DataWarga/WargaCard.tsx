// components/DataWarga/WargaCard.tsx

import { PendudukDetail } from "./DetailModal";

type Props = {
    data: PendudukDetail;
    onView: (data: PendudukDetail) => void;
    onEdit?: (data: PendudukDetail) => void;
    onDelete?: (id: number) => void;
};

export default function PendudukCard({ data, onView, onEdit, onDelete }: Props) {
    const formatNIK = (nik: string) => {
        if (nik.length === 16) {
            return `${nik.slice(0, 4)} ${nik.slice(4, 8)} ${nik.slice(8, 12)} ${nik.slice(12, 16)}`;
        }
        return nik;
    };

    return (
        <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
            <div className="h-1 bg-gradient-to-r from-blue-500 to-green-500" />

            <div className="p-5">
                {/* Header with name and view button */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-gray-800">
                            {data.nama_lengkap}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                {formatNIK(data.nik)}
                            </span>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-1">
                        <button
                            onClick={() => onView(data)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Lihat detail"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                        {onEdit && (
                            <button
                                onClick={() => onEdit(data)}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                title="Edit data"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={() => onDelete(data.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                title="Hapus data"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Basic info summary */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                        </svg>
                        <span className="text-gray-600">{data.tanggal_lahir || "-"}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-gray-600">{data.nomor_telepon || "-"}</span>
                    </div>
                </div>

                {/* Address summary */}
                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                    <div className="flex items-start gap-2 text-sm">
                        <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div className="flex-1">
                            <p className="text-gray-700 line-clamp-2">{data.alamat_lengkap}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                    RT {data.rt} / RW {data.rw}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {data.kelurahan}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Document buttons */}
                <div className="flex gap-3">
                    <a
                        href={data.file_kk}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        KK
                    </a>
                    <a
                        href={data.file_ktp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-xs font-medium transition"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2H15a3 3 0 00-2.83-2H9z" />
                        </svg>
                        KTP
                    </a>
                </div>
            </div>
        </div>
    );
}
