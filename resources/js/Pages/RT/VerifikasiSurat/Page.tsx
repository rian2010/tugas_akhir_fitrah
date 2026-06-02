// pages/RT/VerifikasiSurat/Page.tsx
import SubmissionDetail from '@/Components/VerisikasiSurat/SubmissionDetail';
import SubmissionList from '@/Components/VerisikasiSurat/SubmissionList';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Submission, SubmissionStatus } from '@/types/verisikasi-surat';
import { router, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';

interface Props {
    submissions: Submission[];
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function VerifikasiSuratPage({ submissions: initialSubmissions, flash }: Props) {
    const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
    const [filter, setFilter] = useState<'all' | 'Menunggu' | 'Diproses'>('all');

    // Show flash messages
    useEffect(() => {
        if (flash?.success) {
            alert(flash.success);
        }
        if (flash?.error) {
            alert(flash.error);
        }
    }, [flash]);

    const getFilteredSubmissions = () => {
        if (filter === 'all') return submissions;
        return submissions.filter(sub => sub.status === filter);
    };

    const handleStatusUpdate = (id: string, newStatus: SubmissionStatus) => {
        // Optimistic update
        setSubmissions(prev =>
            prev.map(sub =>
                sub.id === id ? { ...sub, status: newStatus } : sub
            )
        );

        if (selectedSubmission?.id === id) {
            setSelectedSubmission(prev => prev ? { ...prev, status: newStatus } : null);
        }

        // Send to server
        router.patch(route('rt.verifikasi-surat.update-status', { id }), {
            status: newStatus
        }, {
            preserveScroll: true,
            onError: (errors) => {
                console.error('Error updating status:', errors);
                // Revert optimistic update on error
                setSubmissions(initialSubmissions);
                alert('Gagal mengupdate status. Silakan coba lagi.');
            }
        });
    };

    const counts = {
        Menunggu: submissions.filter(s => s.status === 'Menunggu').length,
        Diproses: submissions.filter(s => s.status === 'Diproses').length,
    };

    return (
        <Authenticated>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-slate-800">Verifikasi Pengajuan Surat</h1>
                        <p className="text-slate-500 mt-1">Tinjau dan proses pengajuan surat dari warga</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">Total Pengajuan</p>
                                    <p className="text-2xl font-bold text-slate-800">{submissions.length}</p>
                                </div>
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">Menunggu Verifikasi</p>
                                    <p className="text-2xl font-bold text-amber-600">{counts.Menunggu}</p>
                                </div>
                                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">Sedang Diproses</p>
                                    <p className="text-2xl font-bold text-blue-600">{counts.Diproses}</p>
                                </div>
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column - Submission List */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            {/* Filter Tabs */}
                            <div className="flex border-b border-slate-200 bg-slate-50/50 px-4">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`px-4 py-3 text-sm font-medium transition-colors relative ${filter === 'all'
                                        ? 'text-blue-600'
                                        : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    Semua
                                    {filter === 'all' && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setFilter('Menunggu')}
                                    className={`px-4 py-3 text-sm font-medium transition-colors relative ${filter === 'Menunggu'
                                        ? 'text-amber-600'
                                        : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    Menunggu ({counts.Menunggu})
                                    {filter === 'Menunggu' && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setFilter('Diproses')}
                                    className={`px-4 py-3 text-sm font-medium transition-colors relative ${filter === 'Diproses'
                                        ? 'text-blue-600'
                                        : 'text-slate-500 hover:text-slate-700'
                                        }`}
                                >
                                    Diproses ({counts.Diproses})
                                    {filter === 'Diproses' && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                                    )}
                                </button>
                            </div>

                            {/* Submission List Content */}
                            <SubmissionList
                                submissions={getFilteredSubmissions()}
                                selectedId={selectedSubmission?.id || null}
                                onSelectSubmission={setSelectedSubmission}
                            />
                        </div>

                        {/* Right Column - Submission Detail */}
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <SubmissionDetail
                                submission={selectedSubmission}
                                onStatusUpdate={handleStatusUpdate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
