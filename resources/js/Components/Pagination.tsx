const PER_PAGE = 5;

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalFiltered: number;
    onPageChange: (page: number) => void;
}

export function Pagination({
    currentPage,
    totalPages,
    totalFiltered,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const start = (currentPage - 1) * PER_PAGE + 1;
    const end = Math.min(currentPage * PER_PAGE, totalFiltered);

    return (
        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-4 py-3">
            <p className="text-sm text-gray-500">
                Menampilkan{" "}
                <span className="font-medium">{start}</span>–
                <span className="font-medium">{end}</span>{" "}
                dari <span className="font-medium">{totalFiltered}</span> KK
            </p>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="rounded-md px-2.5 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    ← Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                    <button
                        key={pg}
                        onClick={() => onPageChange(pg)}
                        className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${pg === currentPage
                                ? "bg-indigo-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {pg}
                    </button>
                ))}
                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-md px-2.5 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    Next →
                </button>
            </div>
        </div>
    );
}
