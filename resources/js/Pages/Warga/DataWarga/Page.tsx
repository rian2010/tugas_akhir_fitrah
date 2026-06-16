import { useState } from "react";
import { router } from "@inertiajs/react";
import PendudukCard from "@/Components/DataWarga/WargaCard";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import WargaDetailModal, { PendudukDetail } from "@/Components/DataWarga/DetailModal";
import WargaAddModal from "@/Components/DataWarga/WargaAddModal";
import WargaEditModal from "@/Components/DataWarga/WargaEditModal"; // Import the edit modal

type AuthUser = {
    nama_lengkap: string;
    email: string;
    no_kk: string;
};

type Props = {
    warga: PendudukDetail[];
    authUser: AuthUser;
};

export default function Page({ warga, authUser }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedWarga, setSelectedWarga] = useState<PendudukDetail | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleView = (data: PendudukDetail) => {
        setSelectedWarga(data);
        setIsModalOpen(true);
    };

    const handleEdit = (data: PendudukDetail) => {
        setSelectedWarga(data);
        setIsEditModalOpen(true);
    };

    const handleEditSuccess = () => {
        // Refresh the page or update local state
        router.reload({ only: ['warga'] });
    };

    const handleDelete = (id: number) => {
        if (!confirm("Apakah Anda yakin ingin menghapus data ini?")) return;

        router.delete(route("warga.destroy", id), {
            preserveScroll: true,
            onSuccess: () => {
                // Optional: Show success message
                router.reload({ only: ['warga'] });
            },
        });
    };

    const handleAddSuccess = () => {
        // Refresh the page after adding new warga
        router.reload({ only: ['warga'] });
    };

    return (
        <Authenticated>
            <div className="h-full flex flex-col bg-gray-50 overflow-hidden">

                {/* ── Header ── */}
                <div className="flex-shrink-0 bg-white border-b border-gray-200 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Data Anggota Keluarga
                                </h1>
                            </div>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition shadow-sm"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Tambah Anggota
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── Scrollable Content ── */}
                <div className="flex-1 overflow-y-auto">
                    {/* ── Cards ── */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-8">
                        {warga.length === 0 ? (
                            <div className="text-center py-12">
                                <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada data</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Belum ada data warga.
                                </p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {warga.map((item) => (
                                    <PendudukCard
                                        key={item.id}
                                        data={item}
                                        onView={handleView}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                            <p className="text-sm text-gray-500">
                                Menampilkan{" "}
                                <span className="font-medium">{warga.length}</span> dari{" "}
                                <span className="font-medium">{warga.length}</span> data
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Modals ── */}
            <WargaDetailModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setSelectedWarga(null); }}
                data={selectedWarga}
            />

            <WargaAddModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                authUser={authUser}
                onSuccess={handleAddSuccess}
            />

            {/* Edit Modal - Only render if selectedWarga exists */}
            {selectedWarga && (
                <WargaEditModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedWarga(null);
                    }}
                    wargaData={selectedWarga}
                    authUser={authUser}
                />
            )}
        </Authenticated>
    );
}
