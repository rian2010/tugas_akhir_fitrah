// components/PengajuanSurat/WargaInfoCard.tsx
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
}

export default function WargaInfoCard({ warga }: WargaInfoCardProps) {
    if (!warga) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                        <p className="text-sm font-medium text-yellow-800">Data Penduduk Belum Lengkap</p>
                        <p className="text-xs text-yellow-700 mt-1">Silakan lengkapi data penduduk Anda terlebih dahulu</p>
                    </div>
                </div>
            </div>
        );
    }

    // Format date for display
    const formatDate = (date: string) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
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
                <button
                    onClick={() => window.location.href = route('warga.edit', warga.id)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                    Edit Data
                </button>
            </div>

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

            {/* Verification Badge */}
            <div className="mt-4 pt-3 border-t border-blue-100">
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-green-700">Data terverifikasi</p>
                </div>
            </div>
        </div>
    );
}
