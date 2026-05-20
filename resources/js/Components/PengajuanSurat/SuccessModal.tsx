// components/PengajuanSurat/SuccessModal.tsx
import { Fragment } from "react";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    letterTitle: string;
}

export default function SuccessModal({ isOpen, onClose, letterTitle }: SuccessModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                        Pengajuan Berhasil!
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Pengajuan surat <span className="font-semibold">{letterTitle}</span> telah dikirim.
                        Admin akan segera memproses pengajuan Anda.
                    </p>

                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
