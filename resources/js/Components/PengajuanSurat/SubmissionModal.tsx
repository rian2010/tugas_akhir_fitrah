// components/PengajuanSurat/SubmissionModal.tsx
import { LetterType } from "@/types/letter.type";
import { useState, useEffect } from "react";
import WargaInfoCard from "../WargaInfoCard";

interface SubmissionModalProps {
    isOpen: boolean;
    letterType: LetterType | null;
    wargaData: any; // Add wargaData prop
    wargas: any[];                              // add
    onSelectWarga: (warga: any) => void;
    onClose: () => void;
    onSubmit: (data: { purpose: string; additionalInfo: string; notes: string; wargaId: number }) => void;
}

export default function SubmissionModal({
    isOpen,
    letterType,
    wargaData,
    wargas,
    onSelectWarga,
    onClose,
    onSubmit
}: SubmissionModalProps) {
    const [purpose, setPurpose] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setPurpose("");
            setAdditionalInfo("");
            setNotes("");
            setIsSubmitting(false);
        }
    }, [isOpen]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    if (!isOpen || !letterType) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!wargaData) {
            alert("Data penduduk tidak ditemukan. Silakan lengkapi data diri Anda terlebih dahulu.");
            return;
        }

        if (!purpose.trim()) {
            alert("Tujuan pengajuan harus diisi");
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            onSubmit({
                purpose,
                additionalInfo,
                notes,
                wargaId: wargaData.id, // include the currently selected warga's id
            });
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex-shrink-0 bg-blue-600 px-6 py-5 rounded-t-2xl">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-white">
                                {letterType.title}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition text-white"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Scrollable body */}
                <div className="overflow-y-auto flex-1">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Warga Data Card */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Data Pemohon
                            </label>
                            <WargaInfoCard
                                warga={wargaData}
                                wargas={wargas}              // add
                                onSelectWarga={onSelectWarga} // add
                            />
                        </div>

                        {/* Tujuan Pengajuan */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Tujuan Pengajuan <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                                placeholder="Contoh: Untuk keperluan melamar pekerjaan"
                                autoFocus
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Jelaskan tujuan pengajuan surat ini
                            </p>
                        </div>

                        {/* Informasi Tambahan */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Informasi Tambahan
                            </label>
                            <textarea
                                value={additionalInfo}
                                onChange={(e) => setAdditionalInfo(e.target.value)}
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                                placeholder="Informasi tambahan yang perlu diketahui admin (opsional)"
                            />
                        </div>

                        {/* Informasi Penting */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Informasi Penting
                            </h4>
                            <ul className="space-y-1 text-sm text-blue-800">
                                <li>• Pastikan data penduduk Anda sudah terdaftar dan benar</li>
                                <li>• Pengajuan akan diverifikasi oleh Admin RT</li>
                                <li>• Anda akan mendapat notifikasi status pengajuan</li>
                                <li>• Waktu proses tergantung kelengkapan data</li>
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2 pb-1">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting || !wargaData}
                                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Memproses...
                                    </>
                                ) : (
                                    "Kirim Pengajuan"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
