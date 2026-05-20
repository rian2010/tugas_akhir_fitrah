import { KartuKeluarga } from "@/types/warga";
import { KKTableRow } from "./KKTableRow";

interface KKTableProps {
    rows: KartuKeluarga[];
    expandedIds: Set<string>;
    onToggle: (id: string) => void;
}

export function KKTable({ rows, expandedIds, onToggle }: KKTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="w-10 px-4 py-3" />
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">No. KK</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Kepala Keluarga</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Anggota</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">RT/RW</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Alamat</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {rows.length === 0 ? (
                        <tr>
                            <td colSpan={8} className="px-4 py-12 text-center text-sm text-gray-400">
                                <div className="flex flex-col items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Tidak ada data yang ditemukan</span>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        rows.map((kk) => (
                            <KKTableRow
                                key={kk.id}
                                kk={kk}
                                isExpanded={expandedIds.has(kk.id)}
                                onToggle={onToggle}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
