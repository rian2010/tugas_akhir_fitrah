// pages/pengajuan-surat/index.tsx
import { useState } from "react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import LetterTypeCard from "@/Components/PengajuanSurat/LetterTypeCard";
import SubmissionModal from "@/Components/PengajuanSurat/SubmissionModal";
import { LetterType } from "@/types/letter.type";

const letterTypes: LetterType[] = [
    {
        id: "domisili",
        title: "Surat Keterangan Domisili",
        description: "Keterangan tempat tinggal untuk keperluan administrasi",
        estimatedTime: "3-5 hari",
    },
    {
        id: "usaha",
        title: "Surat Keterangan Usaha",
        description: "Keterangan untuk usaha mikro dan kecil",
        estimatedTime: "5-7 hari",
    },
    {
        id: "skck",
        title: "Surat Pengantar SKCK",
        description: "Pengantar untuk pembuatan SKCK di kepolisian",
        estimatedTime: "2-3 hari",
    },
    {
        id: "keluarga",
        title: "Surat Keterangan Keluarga",
        description: "Keterangan susunan keluarga dan hubungan",
        estimatedTime: "3-5 hari",
    },
    {
        id: "kendaraan",
        title: "Surat Keterangan Kendaraan",
        description: "Keterangan kepemilikan kendaraan",
        estimatedTime: "4-6 hari",
    },
    {
        id: "bangunan",
        title: "Surat Keterangan Bangunan",
        description: "Keterangan untuk keperluan IMB atau renovasi",
        estimatedTime: "7-10 hari",
    },
];

export default function PengajuanSuratPage() {
    const [selectedLetter, setSelectedLetter] = useState<LetterType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSelectLetter = (letter: LetterType) => {
        setSelectedLetter(letter);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedLetter(null);
    };

    const handleSubmit = (data: { purpose: string; additionalInfo: string; notes: string }) => {
        console.log("Submitting:", {
            letterType: selectedLetter,
            ...data,
        });
        alert("Pengajuan surat berhasil dikirim!");
        handleCloseModal();
    };

    // Filter letters based on search
    const filteredLetters = letterTypes.filter((letter) =>
        letter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        letter.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get statistics
    const totalLetters = letterTypes.length;
    const availableLetters = filteredLetters.length;

    return (
        <Authenticated>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Hero Section */}

                {/* Search and Filter Section */}
                <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <div className="relative flex-1 max-w-md">
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Cari jenis surat..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                />
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                                </svg>
                                <span>
                                    Menampilkan {availableLetters} dari {totalLetters} jenis surat
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Letter Cards Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {filteredLetters.length === 0 ? (
                        // Empty State
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Tidak ditemukan
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Maaf, jenis surat "{searchTerm}" tidak tersedia
                            </p>
                            <button
                                onClick={() => setSearchTerm("")}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Reset Pencarian
                            </button>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredLetters.map((letter, index) => (
                                <div
                                    key={letter.id}
                                    className="animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <LetterTypeCard
                                        title={letter.title}
                                        description={letter.description}
                                        estimatedTime={letter.estimatedTime}
                                        onClick={() => handleSelectLetter(letter)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Floating Help Button */}
                <div className="fixed bottom-6 right-6 z-30">
                    <button className="group bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 whitespace-nowrap">
                            Bantuan
                        </span>
                    </button>
                </div>
            </div>

            {/* Submission Modal */}
            <SubmissionModal
                isOpen={isModalOpen}
                letterType={selectedLetter}
                onClose={handleCloseModal}
                onSubmit={handleSubmit}
            />

            {/* Add animation styles */}
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
            `}</style>
        </Authenticated>
    );
}
