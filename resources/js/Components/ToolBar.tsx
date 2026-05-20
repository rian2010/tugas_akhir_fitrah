import { StatusWarga } from "@/types/warga";

interface ToolbarProps {
    search: string;
    filterStatus: StatusWarga | "";
    filterRW: string;
    rwList: string[];
    onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFilterStatus: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onFilterRW: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Toolbar({
    search,
    filterStatus,
    filterRW,
    rwList,
    onSearch,
    onFilterStatus,
    onFilterRW,
}: ToolbarProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-3 p-4 border-b border-gray-100 bg-gray-50/50">
            {/* Search */}
            <div className="relative flex-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Cari nama, NIK, No. KK, atau alamat..."
                    className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    value={search}
                    onChange={onSearch}
                />
            </div>

            {/* Status Filter */}
            <select
                className="rounded-lg border border-gray-200 bg-white py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={filterStatus}
                onChange={onFilterStatus}
            >
                <option value="">Semua Status</option>
                <option value="Tetap">Tetap</option>
                <option value="Sementara">Sementara</option>
            </select>

            {/* RW Filter */}
            <select
                className="rounded-lg border border-gray-200 bg-white py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={filterRW}
                onChange={onFilterRW}
            >
                <option value="">Semua RW</option>
                {rwList.map((rw) => (
                    <option key={rw} value={rw}>
                        RW {rw}
                    </option>
                ))}
            </select>
        </div>
    );
}
