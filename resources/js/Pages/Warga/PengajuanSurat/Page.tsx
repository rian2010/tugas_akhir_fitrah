// pages/Warga/PengajuanSurat/Page.tsx
import { useState } from 'react';
import { router } from '@inertiajs/react';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import LetterTypeCard from '@/Components/PengajuanSurat/LetterTypeCard';
import SubmissionModal from '@/Components/PengajuanSurat/SubmissionModal';
import { LetterType } from '@/types/letter.type';

type Props = {
    letterTypes: LetterType[];
    authUser: any;
    warga: any; // Add warga prop
};

export default function Page({ letterTypes, authUser, warga }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLetter, setSelectedLetter] = useState<LetterType | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCardClick = (letterType: LetterType) => {
        // Check if warga data exists before allowing submission
        if (!warga) {
            alert('Data penduduk tidak ditemukan. Silakan lengkapi data diri Anda terlebih dahulu.');
            return;
        }
        setSelectedLetter(letterType);
        setIsModalOpen(true);
    };

    const handleSubmit = async (data: { purpose: string; additionalInfo: string; notes: string }) => {
        if (!selectedLetter) return;

        setIsSubmitting(true);

        router.post(route('surat.store'), {
            letter_type_id: selectedLetter.id,
            purpose: data.purpose,
            additional_info: data.additionalInfo,
            notes: data.notes
        }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsModalOpen(false);
                setSelectedLetter(null);
                alert('Pengajuan surat berhasil dikirim!');
            },
            onError: (errors) => {
                console.error('Submission error:', errors);
                alert('Terjadi kesalahan. Silakan coba lagi.');
            },
            onFinish: () => {
                setIsSubmitting(false);
            }
        });
    };

    return (
        <Authenticated>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                    {/* Letter Types Grid */}
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {letterTypes.map((letter) => (
                            <LetterTypeCard
                                key={letter.id}
                                title={letter.title}
                                description={letter.description}
                                onClick={() => handleCardClick(letter)}
                            />
                        ))}
                    </div>

                    {/* Info Section */}
                    <div className="mt-12 max-w-2xl mx-auto">
                        <div className="bg-blue-50/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-gray-900">Informasi Penting</h3>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                        <li>• Pastikan data diri Anda sudah lengkap dan terverifikasi</li>
                                        <li>• Pengajuan akan diproses setelah diverifikasi oleh Admin RT</li>
                                        <li>• Anda akan mendapat notifikasi status pengajuan melalui email</li>
                                        <li>• Siapkan dokumen pendukung jika diperlukan</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submission Modal */}
            <SubmissionModal
                isOpen={isModalOpen}
                letterType={selectedLetter}
                wargaData={warga}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedLetter(null);
                }}
                onSubmit={handleSubmit}
            />
        </Authenticated>
    );
}
