// Components/AnggotaDetailModal.tsx
import { Anggota } from "@/types/warga";

interface AnggotaDetailModalProps {
    anggota: Anggota | null;
    isOpen: boolean;
    onClose: () => void;
}

export function AnggotaDetailModal({ anggota, isOpen, onClose }: AnggotaDetailModalProps) {
    if (!isOpen || !anggota) return null;

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Overlay */}
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                    onClick={onClose}
                />

                {/* Modal */}
                <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Detail Anggota</h2>
                                <p className="text-sm text-gray-500 mt-1">NIK: {anggota.nik}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6 space-y-6">
                        {/* Foto/Gambar placeholder */}
                        <div className="flex justify-center">
                            <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-indigo-600">
                                    {anggota.nama_lengkap.charAt(0)}
                                </span>
                            </div>
                        </div>

                        {/* Informasi Pribadi */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Pribadi</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-medium text-gray-500 uppercase">Nama Lengkap</label>
                                    <p className="mt-1 text-sm font-medium text-gray-900">{anggota.nama_lengkap}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase">NIK</label>
                                    <p className="mt-1 text-sm font-mono text-gray-900">{anggota.nik}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase">No. KK</label>
                                    <p className="mt-1 text-sm font-mono text-gray-900">{anggota.no_kk}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase">Tempat, Tanggal Lahir</label>
                                    <p className="mt-1 text-sm text-gray-900">{formatDate(anggota.tanggal_lahir)}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase">Jenis Kelamin</label>
                                    <p className="mt-1">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${anggota.jenis_kelamin === 'Laki-laki'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-pink-100 text-pink-800'
                                            }`}>
                                            {anggota.jenis_kelamin}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase">Agama</label>
                                    <p className="mt-1 text-sm text-gray-900">{anggota.agama}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase">Email</label>
                                    <p className="mt-1 text-sm text-gray-900">{anggota.email || '-'}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase">No. Telepon</label>
                                    <p className="mt-1 text-sm text-gray-900">{anggota.nomor_telepon || '-'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Informasi Alamat */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Alamat</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-medium text-gray-500 uppercase">Alamat Lengkap</label>
                                    <p className="mt-1 text-sm text-gray-900">{anggota.alamat_lengkap}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase">RT</label>
                                    <p className="mt-1 text-sm text-gray-900">{anggota.rt}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase">RW</label>
                                    <p className="mt-1 text-sm text-gray-900">{anggota.rw}</p>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-medium text-gray-500 uppercase">Kelurahan</label>
                                    <p className="mt-1 text-sm text-gray-900">{anggota.kelurahan}</p>
                                </div>
                            </div>
                        </div>

                        {/* Dokumen */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dokumen</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase">File KK</label>
                                    {anggota.file_kk ? (
                                        <a
                                            href={anggota.file_kk}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-1 inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Lihat Dokumen
                                        </a>
                                    ) : (
                                        <p className="mt-1 text-sm text-gray-400">Tidak ada file</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase">File KTP</label>
                                    {anggota.file_ktp ? (
                                        <a
                                            href={anggota.file_ktp}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-1 inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Lihat Dokumen
                                        </a>
                                    ) : (
                                        <p className="mt-1 text-sm text-gray-400">Tidak ada file</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl">
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
