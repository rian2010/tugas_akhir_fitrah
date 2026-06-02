import { KKTable } from "@/Components/KKTable";
import { Pagination } from "@/Components/Pagination";
import { Toolbar } from "@/Components/ToolBar";
import { DetailModal } from "@/Components/DataWarga/RTWargaDetailModal";
import { AnggotaDetailModal } from "@/Components/DataWargaAnggotaDetailModal";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { KKData, KartuKeluarga, Anggota } from "@/types/warga";
import { useState, useMemo } from "react";

type Props = {
    kkList: KKData[];
};

const PER_PAGE = 5;

export default function DataWarga({ kkList }: Props) {
    const [search, setSearch] = useState("");
    const [filterRW, setFilterRW] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
    const [viewMode, setViewMode] = useState<"table" | "grid">("table");

    // State for KK detail modal
    const [selectedKK, setSelectedKK] = useState<KartuKeluarga | null>(null);
    const [isKKModalOpen, setIsKKModalOpen] = useState(false);

    // State for Anggota detail modal
    const [selectedAnggota, setSelectedAnggota] = useState<Anggota | null>(null);
    const [isAnggotaModalOpen, setIsAnggotaModalOpen] = useState(false);

    // State for delete confirmation
    const [deleteTarget, setDeleteTarget] = useState<KartuKeluarga | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // ── Filter & Search Logic ─────────────────────────────────────────────────

    const filtered = useMemo(() => {
        return kkList.filter((kk) => {
            const q = search.toLowerCase();
            const matchSearch =
                !q ||
                kk.noKK.includes(q) ||
                kk.alamat.toLowerCase().includes(q) ||
                kk.kelurahan.toLowerCase().includes(q) ||
                kk.anggota.some(
                    (a) =>
                        a.nama_lengkap.toLowerCase().includes(q) ||
                        a.nik.includes(q)
                );
            const matchRW = !filterRW || kk.rw === filterRW;
            return matchSearch && matchRW;
        });
    }, [kkList, search, filterRW]);

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paginated = filtered.slice(
        (currentPage - 1) * PER_PAGE,
        currentPage * PER_PAGE
    );

    // ── Derived Stats ─────────────────────────────────────────────────────────

    const stats = useMemo(() => {
        const totalKK = kkList.length;
        const totalWarga = kkList.reduce((sum, kk) => sum + kk.anggota.length, 0);
        const totalLaki = kkList.reduce((sum, kk) =>
            sum + kk.anggota.filter(a => a.jenis_kelamin === 'Laki-laki').length, 0
        );
        const totalPerempuan = totalWarga - totalLaki;
        const rwCount = new Set(kkList.map(kk => kk.rw)).size;

        return { totalKK, totalWarga, totalLaki, totalPerempuan, rwCount };
    }, [kkList]);

    // ── Unique RW list ────────────────────────────────────────────────────────

    const rwList = useMemo(() =>
        [...new Set(kkList.map((kk) => kk.rw))].sort(),
        [kkList]);

    // ── Handlers ─────────────────────────────────────────────────────────────

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
        setCurrentPage(1);
    }

    function handleFilterRW(e: React.ChangeEvent<HTMLSelectElement>) {
        setFilterRW(e.target.value);
        setCurrentPage(1);
    }

    function clearFilters() {
        setSearch("");
        setFilterRW("");
        setCurrentPage(1);
    }

    function toggleExpand(id: string) {
        setExpandedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }

    function expandAll() {
        const allIds = new Set(paginated.map(kk => kk.noKK));
        setExpandedIds(allIds);
    }

    function collapseAll() {
        setExpandedIds(new Set());
    }

    // KK Detail Modal handlers
    function handleKKDetail(kk: KartuKeluarga) {
        setSelectedKK(kk);
        setIsKKModalOpen(true);
    }

    function handleCloseKKModal() {
        setIsKKModalOpen(false);
        setSelectedKK(null);
    }

    // Anggota Detail Modal handlers
    function handleAnggotaDetail(anggota: Anggota) {
        setSelectedAnggota(anggota);
        setIsAnggotaModalOpen(true);
    }

    function handleCloseAnggotaModal() {
        setIsAnggotaModalOpen(false);
        setSelectedAnggota(null);
    }

    // Delete handlers
    function handleDeleteClick(kk: KartuKeluarga) {
        setDeleteTarget(kk);
        setIsDeleteModalOpen(true);
    }

    function handleDeleteConfirm() {
        // Add your delete logic here
        console.log('Deleting:', deleteTarget?.noKK);
        setIsDeleteModalOpen(false);
        setDeleteTarget(null);
    }

    function handleCloseDeleteModal() {
        setIsDeleteModalOpen(false);
        setDeleteTarget(null);
    }

    // ─────────────────────────────────────────────────────────────────────────

    const hasActiveFilters = search || filterRW;

    return (
        <Authenticated>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="py-8">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">


                        {/* ── Stats Cards ── */}
                        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Total KK</p>
                                        <p className="text-xl font-bold text-gray-900">{stats.totalKK}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Total Warga</p>
                                        <p className="text-xl font-bold text-gray-900">{stats.totalWarga}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Laki-laki</p>
                                        <p className="text-xl font-bold text-gray-900">{stats.totalLaki}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-pink-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Perempuan</p>
                                        <p className="text-xl font-bold text-gray-900">{stats.totalPerempuan}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-yellow-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Jumlah RW</p>
                                        <p className="text-xl font-bold text-gray-900">{stats.rwCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Main Content Card ── */}
                        <div className="bg-white shadow-sm rounded-2xl border border-gray-200 overflow-hidden">
                            {/* Toolbar */}
                            <div className="p-4 border-b border-gray-200 bg-gray-50/50">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1">
                                        <div className="relative">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                            <input
                                                type="text"
                                                placeholder="Cari berdasarkan No. KK, Nama, NIK, atau Alamat..."
                                                value={search}
                                                onChange={handleSearch}
                                                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <select
                                            value={filterRW}
                                            onChange={handleFilterRW}
                                            className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-colors"
                                        >
                                            <option value="">Semua RW</option>
                                            {rwList.map((rw) => (
                                                <option key={rw} value={rw}>RW {rw}</option>
                                            ))}
                                        </select>
                                        {hasActiveFilters && (
                                            <button
                                                onClick={clearFilters}
                                                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                Reset Filter
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Results Info */}
                            <div className="px-6 py-3 bg-white border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-gray-600">
                                        {hasActiveFilters ? (
                                            <>
                                                Menampilkan <span className="font-semibold text-gray-900">{filtered.length}</span> dari <span className="font-semibold text-gray-900">{kkList.length}</span> data
                                                {filterRW && <> • RW {filterRW}</>}
                                            </>
                                        ) : (
                                            <>
                                                Total <span className="font-semibold text-gray-900">{kkList.length}</span> Kartu Keluarga
                                            </>
                                        )}
                                    </p>
                                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                                        <button
                                            onClick={() => setViewMode("table")}
                                            className={`p-1.5 rounded-md transition-colors ${viewMode === "table" ? "bg-white shadow-sm text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}
                                            title="Tampilan Tabel"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => setViewMode("grid")}
                                            className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-white shadow-sm text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}
                                            title="Tampilan Grid"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Table/Grid View */}
                            {viewMode === "table" ? (
                                <KKTable
                                    rows={paginated}
                                    expandedIds={expandedIds}
                                    onToggle={toggleExpand}
                                    onDetail={handleKKDetail}
                                    onAnggotaDetail={handleAnggotaDetail}
                                    onDelete={handleDeleteClick}
                                />
                            ) : (
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {paginated.length === 0 ? (
                                            <div className="col-span-full py-12 text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p className="text-gray-500">Tidak ada data yang ditemukan</p>
                                            </div>
                                        ) : (
                                            paginated.map((kk) => (
                                                <div key={kk.noKK} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all hover:border-indigo-200 group">
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div>
                                                            <p className="text-xs text-gray-500 font-mono">No. KK</p>
                                                            <p className="text-sm font-semibold text-gray-900">{kk.noKK}</p>
                                                        </div>
                                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold">
                                                            {kk.anggota.length}
                                                        </span>
                                                    </div>

                                                    {kk.anggota[0] && (
                                                        <div className="mb-3">
                                                            <p className="text-xs text-gray-500">Kepala Keluarga</p>
                                                            <p className="text-sm font-medium text-gray-900">{kk.anggota[0].nama_lengkap}</p>
                                                        </div>
                                                    )}

                                                    <div className="space-y-1 mb-4">
                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            </svg>
                                                            <span className="truncate">{kk.alamat}</span>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                                            <span>RT {kk.rt}</span>
                                                            <span>RW {kk.rw}</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                                        <button
                                                            onClick={() => handleKKDetail(kk)}
                                                            className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                                                        >
                                                            Lihat Detail
                                                        </button>
                                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => handleKKDetail(kk)}
                                                                className="p-1.5 rounded-md text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteClick(kk)}
                                                                className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Pagination */}
                            {filtered.length > 0 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    totalFiltered={filtered.length}
                                    onPageChange={setCurrentPage}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* KK Detail Modal */}
            <DetailModal
                kk={selectedKK}
                isOpen={isKKModalOpen}
                onClose={handleCloseKKModal}
            />

            {/* Anggota Detail Modal */}
            <AnggotaDetailModal
                anggota={selectedAnggota}
                isOpen={isAnggotaModalOpen}
                onClose={handleCloseAnggotaModal}
            />

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && deleteTarget && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex min-h-screen items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={handleCloseDeleteModal} />
                        <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full">
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-red-100 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Konfirmasi Hapus</h3>
                                        <p className="text-sm text-gray-500">Tindakan ini tidak dapat dibatalkan</p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-6">
                                    Apakah Anda yakin ingin menghapus Kartu Keluarga dengan No. KK <span className="font-semibold">{deleteTarget.noKK}</span>?
                                    Semua data anggota keluarga juga akan dihapus.
                                </p>
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={handleCloseDeleteModal}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleDeleteConfirm}
                                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-red-600 rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Authenticated>
    );
}
