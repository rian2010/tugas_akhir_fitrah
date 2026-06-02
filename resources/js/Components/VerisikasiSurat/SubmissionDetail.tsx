// components/VerifikasiSurat/SubmissionDetail.tsx
import React from 'react';
import {
    FileText,
    User,
    Calendar,
    CheckCircle,
    Clock,
    AlertCircle,
    Check,
    XCircle,
} from 'lucide-react';
import { Submission } from '@/types/verisikasi-surat';

interface SubmissionDetailProps {
    submission: Submission | null;
    onStatusUpdate: (id: string, status: Submission['status']) => void;
}

const statusOptions = [
    { value: 'Menunggu', label: 'Menunggu Verifikasi', icon: Clock, color: 'amber' },
    { value: 'Disetujui', label: 'Setujui Pengajuan', icon: CheckCircle, color: 'emerald' },
    { value: 'Ditolak', label: 'Tolak Pengajuan', icon: XCircle, color: 'red' },
];

const SubmissionDetail: React.FC<SubmissionDetailProps> = ({
    submission,
    onStatusUpdate,
}) => {
    if (!submission) {
        return (
            <div className="h-full flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-400 text-center">
                    Pilih pengajuan dari daftar<br />untuk melihat detail
                </p>
            </div>
        );
    }

    const statusColors = {
        Menunggu: 'bg-amber-50 text-amber-700 border-amber-200',
        Disetujui: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        Ditolak: 'bg-red-50 text-red-700 border-red-200',
    };

    const currentStatusColor = statusColors[submission.status] || statusColors.Menunggu;

    return (
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
            <div className="flex justify-between items-start mb-6 pb-4 border-b border-slate-100">
                <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-mono text-slate-400">
                            {submission.submission_number || `No. ${submission.id}`}
                        </span>
                        <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${currentStatusColor}`}>
                            {submission.status}
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">{submission.name}</h2>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Diajukan: {submission.date}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-4 mb-6">
                <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-slate-700">Jenis Surat</span>
                    </div>
                    <p className="text-slate-800 font-medium">{submission.title}</p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-slate-700">Tujuan Pengajuan</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{submission.description}</p>
                </div>

                {submission.additional_info && (
                    <div className="bg-slate-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium text-slate-700">Informasi Tambahan</span>
                        </div>
                        <p className="text-slate-600 text-sm">{submission.additional_info}</p>
                    </div>
                )}

                {/* Warga Data Section */}
                {submission.warga_data && (
                    <div className="bg-slate-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <User className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium text-slate-700">Data Pemohon</span>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="grid grid-cols-2 gap-2">
                                <span className="text-slate-500">NIK:</span>
                                <span className="text-slate-700 font-mono">{submission.warga_data.nik || '-'}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <span className="text-slate-500">Tempat, Tgl Lahir:</span>
                                <span className="text-slate-700">
                                    {submission.warga_data.tempat_lahir || '-'}, {submission.warga_data.tanggal_lahir || '-'}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <span className="text-slate-500">Jenis Kelamin:</span>
                                <span className="text-slate-700">{submission.warga_data.jenis_kelamin || '-'}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <span className="text-slate-500">Agama:</span>
                                <span className="text-slate-700">{submission.warga_data.agama || '-'}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <span className="text-slate-500">Pekerjaan:</span>
                                <span className="text-slate-700">{submission.warga_data.pekerjaan || '-'}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <span className="text-slate-500">Alamat:</span>
                                <span className="text-slate-700">{submission.warga_data.alamat || '-'}</span>
                            </div>
                            {submission.warga_data.rt && (
                                <div className="grid grid-cols-2 gap-2">
                                    <span className="text-slate-500">RT/RW:</span>
                                    <span className="text-slate-700">{submission.warga_data.rt}/{submission.warga_data.rw}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="pt-4 border-t border-slate-100">
                <p className="text-sm font-medium text-slate-700 mb-3">Update Status Pengajuan</p>
                <div className="flex flex-wrap gap-3">
                    {statusOptions.map((option) => {
                        const Icon = option.icon;
                        const isActive = submission.status === option.value;
                        const isDisabled = submission.status === 'Disetujui' || submission.status === 'Ditolak';

                        return (
                            <button
                                key={option.value}
                                onClick={() => onStatusUpdate(submission.id, option.value as Submission['status'])}
                                disabled={isDisabled}
                                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${isActive
                                        ? `bg-${option.color}-100 text-${option.color}-700 ring-2 ring-${option.color}-300`
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{option.label}</span>
                                {isActive && <Check className="w-3.5 h-3.5 ml-1" />}
                            </button>
                        );
                    })}
                </div>

                {submission.status === 'Disetujui' && (
                    <div className="mt-4 p-3 bg-emerald-50 rounded-lg flex items-center gap-2 text-emerald-700 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        <span>Pengajuan ini telah disetujui. Surat akan segera diproses.</span>
                    </div>
                )}

                {submission.status === 'Ditolak' && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                        <XCircle className="w-4 h-4" />
                        <span>Pengajuan ini ditolak. Silakan hubungi admin untuk informasi lebih lanjut.</span>
                    </div>
                )}

                {submission.status === 'Menunggu' && (
                    <div className="mt-4 p-3 bg-amber-50 rounded-lg flex items-center gap-2 text-amber-700 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>Pengajuan menunggu verifikasi. Silakan pilih tindakan di atas.</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubmissionDetail;
