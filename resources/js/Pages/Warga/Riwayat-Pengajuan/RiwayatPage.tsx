// pages/Warga/Riwayat-Pengajuan/RiwayatPage.tsx
import { useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import LetterStatusCard from "@/Components/RiwayatPengajuan/LetterStatusCard";
import LetterViewerModal from "@/Components/RiwayatPengajuan/LetterViewModal";

export interface PengajuanSurat {
    id: string | number;
    nomorPengajuan: string;
    jenisSurat: string;
    keperluan: string;
    tanggalDiajukan: string;
    estimasiSelesai: string;
    status: "diterima" | "verifikasi" | "selesai" | "ditolak";
    pesanAdmin: string;
    fileSurat?: string;
    // Warga data for letter preview
    namaLengkap?: string;
    nik?: string;
    tempatLahir?: string;
    tanggalLahir?: string;
    jenisKelamin?: string;
    agama?: string;
    pekerjaan?: string;
    alamat?: string;
    rt?: string;
    rw?: string;
}
interface Props {
    submissions: PengajuanSurat[];
}

export default function RiwayatPengajuanPage({ submissions }: Props) {
    const [selectedLetter, setSelectedLetter] = useState<PengajuanSurat | null>(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const handleViewLetter = (pengajuan: PengajuanSurat) => {
        setSelectedLetter(pengajuan);
        setIsViewerOpen(true);
    };

    const handleDownload = (pengajuan: PengajuanSurat) => {
        if (pengajuan.fileSurat) {
            // If file URL exists, trigger download
            window.open(pengajuan.fileSurat, '_blank');
        } else {
            // Generate PDF from letter data
            generatePDF(pengajuan);
        }
    };

    const generatePDF = async (pengajuan: PengajuanSurat) => {
        // You can implement PDF generation here
        // For now, show alert
        alert(`Mengunduh ${pengajuan.jenisSurat}`);
    };

    const handleCloseViewer = () => {
        setIsViewerOpen(false);
        setSelectedLetter(null);
    };

    return (
        <Authenticated>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Riwayat Pengajuan Surat</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Lacak status pengajuan surat Anda
                        </p>
                    </div>

                    {/* Letter Status Cards */}
                    <div className="space-y-4">
                        {submissions.length === 0 ? (
                            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada pengajuan</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Anda belum mengajukan surat apapun.
                                </p>
                            </div>
                        ) : (
                            submissions.map((pengajuan) => (
                                <LetterStatusCard
                                    key={pengajuan.id}
                                    data={pengajuan}
                                    onViewLetter={handleViewLetter}
                                    onDownload={handleDownload}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Letter Viewer Modal */}
            <LetterViewerModal
                isOpen={isViewerOpen}
                onClose={handleCloseViewer}
                letterData={selectedLetter}
            />
        </Authenticated>
    );
}
