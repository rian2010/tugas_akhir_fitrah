// components/DataWarga/WargaDetailModal.tsx
import { Fragment } from "react";

export interface PendudukDetail {
    id: number;
    nama_lengkap: string;
    nik: string;
    tanggal_lahir: string;
    jenis_kelamin: "Laki-laki" | "Perempuan";
    agama: string;
    email: string;
    nomor_telepon: string;
    alamat_lengkap: string;
    rt: string;
    rw: string;
    kelurahan: string;
    file_kk: string;
    file_ktp: string;
}

type Props = {
    isOpen: boolean;
    onClose: () => void;
    data: PendudukDetail | null;
};

export default function WargaDetailModal({ isOpen, onClose, data }: Props) {
    if (!isOpen || !data) return null;

    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const formatPhoneNumber = (phone: string) => {
        if (!phone) return "-";
        // Format: 08xx-xxxx-xxxx
        if (phone.length === 12) {
            return `${phone.slice(0, 4)}-${phone.slice(4, 8)}-${phone.slice(8, 12)}`;
        }
        return phone;
    };

    const formatNIK = (nik: string) => {
        if (!nik) return "-";
        if (nik.length === 16) {
            return `${nik.slice(0, 4)} ${nik.slice(4, 8)} ${nik.slice(8, 12)} ${nik.slice(12, 16)}`;
        }
        return nik;
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Detail Data Warga
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Informasi lengkap penduduk
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-lg transition"
                        >
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="px-6 py-6">
                        {/* Profile Header */}
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                {data.nama_lengkap.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {data.nama_lengkap}
                                </h3>
                                <p className="text-sm text-gray-500 font-mono">
                                    NIK: {formatNIK(data.nik)}
                                </p>
                            </div>
                        </div>

                        {/* Two Column Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Informasi Pribadi
                                </h4>

                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs text-gray-500 block">Nama Lengkap</label>
                                        <p className="text-sm font-medium text-gray-900 mt-1">
                                            {data.nama_lengkap}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-xs text-gray-500 block">NIK</label>
                                        <p className="text-sm font-mono text-gray-900 mt-1">
                                            {formatNIK(data.nik)}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-xs text-gray-500 block">Tanggal Lahir</label>
                                        <p className="text-sm text-gray-900 mt-1">
                                            {formatDate(data.tanggal_lahir)}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-xs text-gray-500 block">Jenis Kelamin</label>
                                        <div className="mt-1">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${data.jenis_kelamin === "Laki-laki"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-pink-100 text-pink-800"
                                                }`}>
                                                {data.jenis_kelamin}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs text-gray-500 block">Agama</label>
                                        <p className="text-sm text-gray-900 mt-1">
                                            {data.agama}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Informasi Kontak
                                </h4>

                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs text-gray-500 block">Email</label>
                                        <a href={`mailto:${data.email}`} className="text-sm text-blue-600 hover:text-blue-700 mt-1 inline-block">
                                            {data.email || "-"}
                                        </a>
                                    </div>

                                    <div>
                                        <label className="text-xs text-gray-500 block">Nomor Telepon</label>
                                        <a href={`tel:${data.nomor_telepon}`} className="text-sm text-blue-600 hover:text-blue-700 mt-1 inline-block">
                                            {formatPhoneNumber(data.nomor_telepon)}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Address Information */}
                            <div className="md:col-span-2 space-y-4">
                                <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Informasi Alamat
                                </h4>

                                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                                    <div>
                                        <label className="text-xs text-gray-500 block">Alamat Lengkap</label>
                                        <p className="text-sm text-gray-900 mt-1">
                                            {data.alamat_lengkap}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="text-xs text-gray-500 block">RT</label>
                                            <p className="text-sm font-medium text-gray-900 mt-1">
                                                {data.rt}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 block">RW</label>
                                            <p className="text-sm font-medium text-gray-900 mt-1">
                                                {data.rw}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-xs text-gray-500 block">Kelurahan</label>
                                            <p className="text-sm font-medium text-gray-900 mt-1">
                                                {data.kelurahan}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Documents */}
                            <div className="md:col-span-2 space-y-4">
                                <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                    Dokumen
                                </h4>

                                <div className="flex gap-4">
                                    <a
                                        href={data.file_kk}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-3 rounded-xl text-sm font-medium transition"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        Lihat Kartu Keluarga
                                    </a>
                                    <a
                                        href={data.file_ktp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-3 rounded-xl text-sm font-medium transition"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2H15a3 3 0 00-2.83-2H9z" />
                                        </svg>
                                        Lihat KTP
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
