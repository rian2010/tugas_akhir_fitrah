import { KKTable } from "@/Components/KKTable";
import { Pagination } from "@/Components/Pagination";
import { Toolbar } from "@/Components/ToolBar";
import { StatCard } from "@/Components/ui/StatCard";
import { StatusWarga } from "@/types/warga";
import { useState } from "react";
import { mockData } from "@/data/mockWarga";
import Authenticated from "@/Layouts/AuthenticatedLayout";

const PER_PAGE = 5;

export default function DataWarga() {
    const [search, setSearch] = useState<string>("");
    const [filterStatus, setFilterStatus] = useState<StatusWarga | "">("");
    const [filterRW, setFilterRW] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

    // ── Filter logic ────────────────────────────────────────────────────────────

    const filtered = mockData.filter((kk) => {
        const q = search.toLowerCase();
        const matchSearch =
            !q ||
            kk.noKK.includes(q) ||
            kk.alamat.toLowerCase().includes(q) ||
            kk.anggota.some(
                (a) => a.nama.toLowerCase().includes(q) || a.nik.includes(q)
            );
        const matchStatus = !filterStatus || kk.status === filterStatus;
        const matchRW = !filterRW || kk.rw === filterRW;
        return matchSearch && matchStatus && matchRW;
    });

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paginated = filtered.slice(
        (currentPage - 1) * PER_PAGE,
        currentPage * PER_PAGE
    );

    // ── Derived stats ───────────────────────────────────────────────────────────

    const totalWarga = mockData.reduce((sum, kk) => sum + kk.anggota.length, 0);
    const totalTetap = mockData.filter((kk) => kk.status === "Tetap").length;
    const totalSementara = mockData.filter((kk) => kk.status === "Sementara").length;

    // ── Unique RW list ──────────────────────────────────────────────────────────

    const rwList = [...new Set(mockData.map((kk) => kk.rw))].sort();

    // ── Handlers ────────────────────────────────────────────────────────────────

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value);
        setCurrentPage(1);
    }

    function handleFilterStatus(e: React.ChangeEvent<HTMLSelectElement>) {
        setFilterStatus(e.target.value as StatusWarga | "");
        setCurrentPage(1);
    }

    function handleFilterRW(e: React.ChangeEvent<HTMLSelectElement>) {
        setFilterRW(e.target.value);
        setCurrentPage(1);
    }

    function toggleExpand(id: string) {
        setExpandedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }

    // ────────────────────────────────────────────────────────────────────────────

    return (
        <Authenticated>
            <div className="min-h-screen bg-gray-100">
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Data Warga</h1>
                                <p className="text-sm text-gray-500 mt-1">Berdasarkan Kartu Keluarga (KK)</p>
                            </div>
                            <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                Tambah Kartu Keluarga
                            </button>
                        </div>

                        {/* Stat Cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <StatCard label="Total KK" value={mockData.length} color="bg-indigo-50 text-indigo-800" />
                            <StatCard label="Total Warga" value={totalWarga} color="bg-sky-50 text-sky-800" />
                            <StatCard label="KK Tetap" value={totalTetap} color="bg-emerald-50 text-emerald-800" />
                            <StatCard label="KK Sementara" value={totalSementara} color="bg-amber-50 text-amber-800" />
                        </div>

                        {/* Main Card */}
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-xl border border-gray-100">

                            <Toolbar
                                search={search}
                                filterStatus={filterStatus}
                                filterRW={filterRW}
                                rwList={rwList}
                                onSearch={handleSearch}
                                onFilterStatus={handleFilterStatus}
                                onFilterRW={handleFilterRW}
                            />

                            <KKTable
                                rows={paginated}
                                expandedIds={expandedIds}
                                onToggle={toggleExpand}
                            />

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                totalFiltered={filtered.length}
                                onPageChange={setCurrentPage}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

