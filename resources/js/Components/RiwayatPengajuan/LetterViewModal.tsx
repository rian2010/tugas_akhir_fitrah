// components/RiwayatPengajuan/LetterViewerModal.tsx

import { PengajuanSurat } from "@/Pages/Warga/Riwayat-Pengajuan/RiwayatPage";

interface LetterViewerModalProps {
    isOpen: boolean;
    onClose: () => void;
    letterData: PengajuanSurat | null;
}

export default function LetterViewerModal({ isOpen, onClose, letterData }: LetterViewerModalProps) {
    if (!isOpen || !letterData) return null;

    const currentDate = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

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
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                {letterData.jenisSurat}
                            </h2>
                            <p className="text-sm text-gray-500">
                                No. Pengajuan: {letterData.nomorPengajuan}
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

                    {/* Letter Content */}
                    <div className="p-8">
                        <div className="max-w-2xl mx-auto">
                            {/* Letter Template */}
                            <div className="bg-white border-2 border-gray-200 rounded-xl shadow-lg overflow-hidden">
                                {/* Kop Surat */}
                                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-6 text-center">
                                    <h1 className="text-2xl font-bold mb-2">PEMERINTAH KABUPATEN</h1>
                                    <h2 className="text-xl font-semibold mb-1">KECAMATAN SUKAMAJU</h2>
                                    <h3 className="text-lg font-medium">KELURAHAN MEKARJAYA</h3>
                                    <div className="border-t border-blue-400 w-1/2 mx-auto mt-3 pt-3">
                                        <p className="text-sm">Jalan Raya No. 123, Kelurahan Mekarjaya</p>
                                        <p className="text-sm">Telp. (021) 1234567</p>
                                    </div>
                                </div>

                                {/* Body Surat */}
                                <div className="p-8">
                                    <div className="text-center mb-8">
                                        <h4 className="text-lg font-bold border-b-2 border-gray-300 inline-block pb-2 px-4">
                                            {letterData.jenisSurat}
                                        </h4>
                                    </div>

                                    <div className="space-y-4 text-gray-700">
                                        <p className="leading-relaxed">
                                            Yang bertanda tangan di bawah ini, Lurah Mekarjaya, Kecamatan Sukamaju,
                                            dengan ini menerangkan bahwa:
                                        </p>

                                        <div className="bg-gray-50 p-4 rounded-lg my-4">
                                            <table className="w-full text-sm">
                                                <tbody>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="py-2 font-medium w-1/3">Nama Lengkap</td>
                                                        <td className="py-2">: Budi Santoso</td>
                                                    </tr>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="py-2 font-medium">NIK</td>
                                                        <td className="py-2">: 1234567890123456</td>
                                                    </tr>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="py-2 font-medium">Tempat, Tgl Lahir</td>
                                                        <td className="py-2">: Jakarta, 15 Mei 1990</td>
                                                    </tr>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="py-2 font-medium">Jenis Kelamin</td>
                                                        <td className="py-2">: Laki-laki</td>
                                                    </tr>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="py-2 font-medium">Agama</td>
                                                        <td className="py-2">: Islam</td>
                                                    </tr>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="py-2 font-medium">Pekerjaan</td>
                                                        <td className="py-2">: Karyawan Swasta</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-2 font-medium">Alamat</td>
                                                        <td className="py-2">: Jl. Melati No. 10, RT 01/RW 02, Kelurahan Mekarjaya</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <p className="leading-relaxed">
                                            Bahwa yang bersangkutan benar-benar penduduk Kelurahan Mekarjaya dan
                                            aktif berdomisili di alamat tersebut.
                                        </p>

                                        <p className="leading-relaxed">
                                            Surat keterangan ini dibuat untuk memenuhi keperluan{" "}
                                            <span className="font-semibold">{letterData.keperluan}</span>.
                                        </p>

                                        <p className="leading-relaxed">
                                            Demikian surat keterangan ini dibuat dengan sebenarnya untuk
                                            dapat dipergunakan sebagaimana mestinya.
                                        </p>
                                    </div>

                                    {/* Tanda Tangan */}
                                    <div className="mt-8 pt-8">
                                        <div className="text-right">
                                            <p>Kelurahan Mekarjaya, {currentDate}</p>
                                            <div className="mt-12">
                                                <p className="font-bold">Lurah Mekarjaya,</p>
                                                <div className="mt-8">
                                                    <p className="font-bold underline">Drs. H. Ahmad Fauzi, M.Si</p>
                                                    <p className="text-sm text-gray-500">NIP. 19651231 199003 1 001</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stamp */}
                                    <div className="mt-6 flex justify-center">
                                        <div className="w-24 h-24 border-2 border-red-600 rounded-full flex items-center justify-center text-red-600 text-xs font-bold text-center opacity-50">
                                            STAMPEL<br />DESA
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Download Button */}
                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={() => {
                                        // Implement PDF download
                                        alert("Mengunduh surat...");
                                    }}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Unduh Surat (PDF)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
