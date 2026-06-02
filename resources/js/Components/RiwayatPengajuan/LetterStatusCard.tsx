// components/RiwayatPengajuan/LetterStatusCard.tsx
import { PengajuanSurat } from "@/Pages/Warga/Riwayat-Pengajuan/RiwayatPage";

interface LetterStatusCardProps {
    data: PengajuanSurat;
    onViewLetter: (data: PengajuanSurat) => void;
    onDownload: (data: PengajuanSurat) => void;
}

export default function LetterStatusCard({ data, onViewLetter, onDownload }: LetterStatusCardProps) {
    const getStatusConfig = () => {
        switch (data.status) {
            case "diterima":
                return {
                    label: "Pengajuan Diterima",
                    color: "text-blue-600",
                    bgColor: "bg-blue-100",
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    ),
                    step: 1,
                };
            case "verifikasi":
                return {
                    label: "Disetujui & Diproses",
                    color: "text-yellow-600",
                    bgColor: "bg-yellow-100",
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    ),
                    step: 2,
                };
            case "selesai":
                return {
                    label: "Selesai",
                    color: "text-green-600",
                    bgColor: "bg-green-100",
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ),
                    step: 3,
                };
            case "ditolak":
                return {
                    label: "Ditolak",
                    color: "text-red-600",
                    bgColor: "bg-red-100",
                    icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ),
                    step: 0,
                };
            default:
                return {
                    label: "Pengajuan Diterima",
                    color: "text-blue-600",
                    bgColor: "bg-blue-100",
                    icon: null,
                    step: 1,
                };
        }
    };

    const statusConfig = getStatusConfig();
    const currentStep = statusConfig.step;
    const isSelesai = data.status === "selesai";
    const isDitolak = data.status === "ditolak";
    const totalSteps = 3; // Total steps: diterima (1), verifikasi (2), selesai (3)

    // Steps configuration
    const steps = [
        { label: "Pengajuan Diterima", step: 1 },
        { label: "Disetujui & Diproses", step: 2 },
        { label: "Selesai", step: 3 },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h2 className="text-lg font-semibold text-gray-900">
                                {data.jenisSurat}
                            </h2>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
                                {statusConfig.icon}
                                {statusConfig.label}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">
                            Keperluan: {data.keperluan}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">
                            No. Pengajuan: {data.nomorPengajuan}
                        </p>
                        <p className="text-xs text-gray-500">
                            Diajukan: {data.tanggalDiajukan}
                        </p>
                    </div>
                </div>

                {/* Progress Bar - Only show if not rejected */}
                {!isDitolak && (
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">
                                Progress Pengajuan
                            </span>
                            <span className="text-sm text-gray-500">
                                Estimasi selesai: {data.estimasiSelesai}
                            </span>
                        </div>
                        <div className="relative">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500"
                                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Steps - Only show if not rejected */}
                {!isDitolak && (
                    <div className="grid grid-cols-3 gap-2 mb-6">
                        {steps.map((step) => (
                            <div key={step.step} className="text-center">
                                <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 transition-all ${step.step <= currentStep
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-200 text-gray-400"
                                    }`}>
                                    {step.step < currentStep ? (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <span className="text-xs font-medium">{step.step}</span>
                                    )}
                                </div>
                                <p className={`text-xs font-medium ${step.step <= currentStep ? "text-gray-700" : "text-gray-400"
                                    }`}>
                                    {step.label}
                                </p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pesan Admin */}
                <div className={`rounded-xl p-4 mb-4 ${isDitolak
                        ? "bg-red-50 border border-red-200"
                        : "bg-blue-50 border border-blue-200"
                    }`}>
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDitolak ? "bg-red-100" : "bg-blue-100"
                                }`}>
                                <svg className={`w-4 h-4 ${isDitolak ? "text-red-600" : "text-blue-600"
                                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <p className={`text-sm font-semibold mb-1 ${isDitolak ? "text-red-900" : "text-blue-900"
                                }`}>
                                Pesan dari Admin RT
                            </p>
                            <p className={`text-sm ${isDitolak ? "text-red-800" : "text-blue-800"
                                }`}>
                                {data.pesanAdmin}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons - Only show if selesai (completed) */}
                {isSelesai && (
                    <div className="flex gap-3">
                        <button
                            onClick={() => onViewLetter(data)}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Lihat Surat
                        </button>
                        <button
                            onClick={() => onDownload(data)}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Unduh Surat
                        </button>
                    </div>
                )}

                {/* Rejected Message */}
                {isDitolak && (
                    <div className="mt-2 text-center">
                        <button
                            onClick={() => window.location.href = route('surat.index')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Ajukan Surat Baru
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
