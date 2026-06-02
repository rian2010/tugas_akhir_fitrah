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
                                <div className="text-center px-8 pt-8 pb-4">
                                    <h1 className="text-xl font-bold uppercase tracking-wide">
                                        PERUMAHAN AVIARI GRIYA PRATAMA
                                    </h1>
                                    <p className="text-lg font-semibold mt-1">
                                        RT {letterData.rt || '005'} - RW {letterData.rw || '18'}
                                    </p>
                                    <p className="text-md">
                                        KEL. BULIANG - KEC. BATU AJI
                                    </p>
                                    <p className="text-md">
                                        KOTA BATAM - 29438
                                    </p>
                                    <div className="flex justify-center mt-3">
                                        <div className="w-2/3 border-b-2 border-gray-400"></div>
                                    </div>
                                </div>

                                {/* Body Surat */}
                                <div className="p-8 pt-4">
                                    <div className="text-center mb-6">
                                        <h4 className="text-lg font-bold underline underline-offset-4">
                                            SURAT KETERANGAN
                                        </h4>
                                        <p className="text-sm mt-1">
                                            No: / SK-RT.{letterData.rt || '005'} / RW.{letterData.rw || '18'} / P.AGP / {new Date().getFullYear()}
                                        </p>
                                    </div>

                                    <div className="space-y-4 text-gray-700">
                                        <p className="leading-relaxed">
                                            Yang bertanda tangan di bawah ini, Ketua RT. {letterData.rt || '005'} / RW. {letterData.rw || '18'} Perumahan Aviari Griya Pratama Kel. Buliang,
                                            Kec. Batu Aji Kota Batam menerangkan bahwa :
                                        </p>

                                        <div className="bg-gray-50 p-4 rounded-lg my-4">
                                            <table className="w-full text-sm">
                                                <tbody>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="py-2 font-medium w-1/3">Nama Lengkap</td>
                                                        <td className="py-2">: {letterData.namaLengkap || "-"}</td>
                                                    </tr>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="py-2 font-medium">NIK</td>
                                                        <td className="py-2">: {letterData.nik || "-"}</td>
                                                    </tr>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="py-2 font-medium">Tempat, Tgl Lahir</td>
                                                        <td className="py-2">: {letterData.tempatLahir || "-"}, {letterData.tanggalLahir || "-"}</td>
                                                    </tr>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="py-2 font-medium">Jenis Kelamin</td>
                                                        <td className="py-2">: {letterData.jenisKelamin || "-"}</td>
                                                    </tr>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="py-2 font-medium">Agama</td>
                                                        <td className="py-2">: {letterData.agama || "-"}</td>
                                                    </tr>
                                                    <tr className="border-b border-gray-200">
                                                        <td className="py-2 font-medium">Pekerjaan</td>
                                                        <td className="py-2">: {letterData.pekerjaan || "-"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="py-2 font-medium">Alamat</td>
                                                        <td className="py-2">: {letterData.alamat || "-"}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <p className="leading-relaxed">
                                            Bahwa nama tersebut di atas adalah benar-benar warga RT. {letterData.rt || '005'} / RW. {letterData.rw || '18'} Perumahan Aviari Griya Pratama
                                            Kel. Buliang, Kec. Batu Aji Kota Batam.
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
                                            <p>Batam, {currentDate}</p>
                                            <div className="mt-12">
                                                <p className="font-bold">Ketua RT {letterData.rt || '005'} / RW {letterData.rw || '18'},</p>
                                                <div className="mt-8">
                                                    <p className="font-bold underline">BAMBANG SUPRIYANTO</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stamp */}
                                    <div className="mt-6 flex justify-start">
                                        <div className="w-24 h-24 border-2 border-red-600 rounded-full flex items-center justify-center text-red-600 text-xs font-bold text-center opacity-50">
                                            STAMPEL<br />RT.{letterData.rt || '005'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Download Button */}
                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={() => {
                                        alert("Fitur unduh PDF akan segera tersedia");
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
