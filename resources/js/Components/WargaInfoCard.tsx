import { useState } from 'react';

interface WargaData {
    id?: number;
    nama_lengkap: string;
    nik: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    agama: string;
    pekerjaan: string;
    alamat: string;
    rt?: string;
    rw?: string;
    kelurahan?: string;
    kecamatan?: string;
    kota?: string;
}

interface WargaInfoCardProps {
    warga: WargaData | null;
    wargas?: WargaData[];           // make optional
    onSelectWarga?: (warga: WargaData) => void;  // make optional
}

export default function WargaInfoCard({ warga, wargas = [], onSelectWarga }: WargaInfoCardProps) {
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const formatDate = (date: string) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    };

    if (!warga) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                {/* keep your existing empty state */}
            </div>
        );
    }

    return (
        <>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                <div className="flex items-start gap-3 mb-4">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Data Penduduk</h3>
                        <p className="text-xs text-gray-600">Data akan digunakan untuk pembuatan surat</p>
                    </div>
                    {/* Change: open picker instead of navigating */}
                    <button
                        onClick={() => setIsPickerOpen(true)}

                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                        Ganti Data
                    </button>
                </div>

                {/* ...your existing data grid, keep as is... */}
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <p className="text-xs text-gray-500">Nama Lengkap</p>
                            <p className="font-medium text-gray-900">{warga.nama_lengkap}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">NIK</p>
                            <p className="font-mono text-sm text-gray-900">{warga.nik}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <p className="text-xs text-gray-500">Tempat, Tanggal Lahir</p>
                            <p className="font-medium text-gray-900">
                                {warga.tempat_lahir}, {formatDate(warga.tanggal_lahir)}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Jenis Kelamin</p>
                            <p className="font-medium text-gray-900">{warga.jenis_kelamin}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <p className="text-xs text-gray-500">Agama</p>
                            <p className="font-medium text-gray-900">{warga.agama}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">Pekerjaan</p>
                            <p className="font-medium text-gray-900">{warga.pekerjaan}</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Alamat</p>
                        <p className="text-sm text-gray-900 leading-relaxed">
                            {warga.alamat}
                            {warga.rt && ` RT ${warga.rt}`}
                            {warga.rw && `/RW ${warga.rw}`}
                            {warga.kelurahan && `, Kel. ${warga.kelurahan}`}
                            {warga.kecamatan && `, Kec. ${warga.kecamatan}`}
                            {warga.kota && `, Kota ${warga.kota}`}
                        </p>
                    </div>
                </div>

                <div className="mt-4 pt-3 border-t border-blue-100">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-xs text-green-700">Data terverifikasi</p>
                    </div>
                </div>
            </div>

            {/* Picker Modal */}
            {isPickerOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900 text-base">Pilih Data Penduduk</h3>
                            <button
                                onClick={() => setIsPickerOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-2 max-h-72 overflow-y-auto">
                            {wargas.map((w) => (
                                <button
                                    key={w.id}
                                    onClick={() => {
                                        onSelectWarga(w);
                                        setIsPickerOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${warga.id === w.id
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <p className="font-medium text-gray-900 text-sm">{w.nama_lengkap}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">NIK: {w.nik}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{w.alamat}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
