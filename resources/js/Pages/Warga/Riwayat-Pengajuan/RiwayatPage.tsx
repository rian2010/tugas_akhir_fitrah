// pages/riwayat-pengajuan/index.tsx
import { useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import LetterStatusCard from "@/Components/RiwayatPengajuan/LetterStatusCard";
import LetterViewerModal from "@/Components/RiwayatPengajuan/LetterViewModal";

export interface PengajuanSurat {
    id: string;
    nomorPengajuan: string;
    jenisSurat: string;
    keperluan: string;
    tanggalDiajukan: string;
    estimasiSelesai: string;
    status: "diterima" | "verifikasi" | "proses" | "selesai";
    pesanAdmin: string;
    fileSurat?: string;
}

const dummyPengajuan: PengajuanSurat[] = [
    {
        id: "1",
        nomorPengajuan: "001",
        jenisSurat: "Surat Keterangan Domisili",
        keperluan: "Melamar pekerjaan",
        tanggalDiajukan: "15 Des 2024",
        estimasiSelesai: "18 Des 2024",
        status: "proses",
        pesanAdmin: "Surat sedang dalam proses pembuatan oleh admin",
    },
    {
        id: "2",
        nomorPengajuan: "002",
        jenisSurat: "Surat Keterangan Usaha",
        keperluan: "Pengajuan kredit bank",
        tanggalDiajukan: "10 Des 2024",
        estimasiSelesai: "17 Des 2024",
        status: "verifikasi",
        pesanAdmin: "Data sedang diverifikasi, mohon tunggu",
    },
    {
        id: "3",
        nomorPengajuan: "003",
        jenisSurat: "Surat Pengantar SKCK",
        keperluan: "Melamar pekerjaan",
        tanggalDiajukan: "5 Des 2024",
        estimasiSelesai: "8 Des 2024",
        status: "selesai",
        pesanAdmin: "Surat sudah selesai dan dapat diambil",
        fileSurat: "/surat/skck-003.pdf",
    },
];

export default function RiwayatPengajuanPage() {
    const [selectedLetter, setSelectedLetter] = useState<PengajuanSurat | null>(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const handleViewLetter = (pengajuan: PengajuanSurat) => {
        setSelectedLetter(pengajuan);
        setIsViewerOpen(true);
    };

    const handleDownload = (pengajuan: PengajuanSurat) => {
        console.log("Downloading:", pengajuan);
        // Implement download logic
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
                        {dummyPengajuan.map((pengajuan) => (
                            <LetterStatusCard
                                key={pengajuan.id}
                                data={pengajuan}
                                onViewLetter={handleViewLetter}
                                onDownload={handleDownload}
                            />
                        ))}
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
