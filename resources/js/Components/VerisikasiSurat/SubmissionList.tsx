// components/VerifikasiSurat/SubmissionList.tsx
import React from 'react';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Submission } from '@/types/verisikasi-surat';

interface SubmissionListProps {
    submissions: Submission[];
    selectedId: string | null;
    onSelectSubmission: (submission: Submission) => void;
}

const statusConfig = {
    Menunggu: {
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-700',
        borderColor: 'border-amber-200',
        icon: Clock,
    },
    Disetujui: {
        bgColor: 'bg-emerald-50',
        textColor: 'text-emerald-700',
        borderColor: 'border-emerald-200',
        icon: CheckCircle,
    },
    Ditolak: {
        bgColor: 'bg-red-50',
        textColor: 'text-red-700',
        borderColor: 'border-red-200',
        icon: XCircle,
    },
};

const SubmissionList: React.FC<SubmissionListProps> = ({
    submissions,
    selectedId,
    onSelectSubmission,
}) => {
    if (submissions.length === 0) {
        return (
            <div className="py-12 text-center">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Tidak ada pengajuan</p>
            </div>
        );
    }

    return (
        <div className="divide-y divide-slate-100">
            {submissions.map((submission) => {
                const config = statusConfig[submission.status];
                const StatusIcon = config.icon;
                const isSelected = selectedId === submission.id;

                return (
                    <button
                        key={submission.id}
                        onClick={() => onSelectSubmission(submission)}
                        className={`w-full text-left p-4 transition-all duration-200 hover:bg-slate-50 focus:outline-none focus:bg-slate-50 ${isSelected ? 'bg-slate-50 border-l-4 border-blue-500' : ''
                            }`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-mono text-slate-400">
                                    {submission.submission_number || `No. ${submission.id}`}
                                </span>
                                {isSelected && (
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                        Dipilih
                                    </span>
                                )}
                            </div>
                            <div
                                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}
                            >
                                <StatusIcon className="w-3 h-3" />
                                <span>{submission.status}</span>
                            </div>
                        </div>

                        <p className="font-semibold text-slate-800 mb-1">{submission.name}</p>
                        <p className="text-sm text-slate-500 mb-2">{submission.title}</p>

                        <div className="flex items-center gap-4 text-xs text-slate-400">
                            <span>{submission.date}</span>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default SubmissionList;
