// Components/DetailModal.tsx
import { KartuKeluarga } from "@/types/warga";

interface DetailModalProps {
    kk: KartuKeluarga | null;
    isOpen: boolean;
    onClose: () => void;
}

export function DetailModal({ kk, isOpen, onClose }: DetailModalProps) {
    if (!isOpen || !kk) return null;

    const kepala = kk.anggota[0];

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
                <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Detail Kartu Keluarga</h2>
                                <p className="text-sm text-gray-500 mt-1">No. KK: {kk.noKK}</p>
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
                        {/* Informasi KK */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Kartu Keluarga</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase">Nomor KK</label>
                                    <p className="mt-1 text-sm font-mono text-gray-900">{kk.noKK}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase">Alamat</label>
                                    <p className="mt-1 text-sm text-gray-900">{kk.alamat}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase">RT</label>
                                    <p className="mt-1 text-sm text-gray-900">{kk.rt}</p>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 uppercase">RW</label>
                                    <p className="mt-1 text-sm text-gray-900">{kk.rw}</p>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-medium text-gray-500 uppercase">Kelurahan</label>
                                    <p className="mt-1 text-sm text-gray-900">{kk.kelurahan}</p>
                                </div>
                            </div>
                        </div>

                        {/* Kepala Keluarga */}
                        {kepala && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Kepala Keluarga</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase">Nama Lengkap</label>
                                            <p className="mt-1 text-sm font-medium text-gray-900">{kepala.nama_lengkap}</p>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase">NIK</label>
                                            <p className="mt-1 text-sm font-mono text-gray-900">{kepala.nik}</p>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase">Tanggal Lahir</label>
                                            <p className="mt-1 text-sm text-gray-900">{formatDate(kepala.tanggal_lahir)}</p>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase">Jenis Kelamin</label>
                                            <p className="mt-1 text-sm text-gray-900">{kepala.jenis_kelamin}</p>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase">Agama</label>
                                            <p className="mt-1 text-sm text-gray-900">{kepala.agama}</p>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 uppercase">No. Telepon</label>
                                            <p className="mt-1 text-sm text-gray-900">{kepala.nomor_telepon || '-'}</p>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="block text-xs font-medium text-gray-500 uppercase">Email</label>
                                            <p className="mt-1 text-sm text-gray-900">{kepala.email || '-'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Daftar Anggota */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Daftar Anggota Keluarga
                                <span className="ml-2 text-sm font-normal text-gray-500">
                                    ({kk.anggota.length} orang)
                                </span>
                            </h3>
                            <div className="space-y-3">
                                {kk.anggota.map((anggota, index) => (
                                    <div
                                        key={anggota.id}
                                        className={`rounded-lg p-4 ${index === 0
                                            ? 'bg-indigo-50 border border-indigo-200'
                                            : 'bg-gray-50 border border-gray-200'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                                                    {index + 1}
                                                </span>
                                                <h4 className="text-sm font-semibold text-gray-900">
                                                    {anggota.nama_lengkap}
                                                    {index === 0 && (
                                                        <span className="ml-2 text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                                                            Kepala Keluarga
                                                        </span>
                                                    )}
                                                </h4>
                                            </div>
                                            <span className="text-xs text-gray-500 font-mono">
                                                NIK: {anggota.nik}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                                            <div>
                                                <span className="text-xs text-gray-500">Tanggal Lahir</span>
                                                <p className="text-gray-900">{formatDate(anggota.tanggal_lahir)}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500">Jenis Kelamin</span>
                                                <p className="text-gray-900">{anggota.jenis_kelamin}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500">Agama</span>
                                                <p className="text-gray-900">{anggota.agama}</p>
                                            </div>
                                            <div>
                                                <span className="text-xs text-gray-500">No. Telepon</span>
                                                <p className="text-gray-900">{anggota.nomor_telepon || '-'}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
