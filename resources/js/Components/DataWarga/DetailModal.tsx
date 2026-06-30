// components/DataWarga/DetailModal.tsx
import { useState } from "react";

export interface PendudukDetail {
    id: number;
    nama_lengkap: string;
    no_kk: string;
    nik: string;
    tanggal_lahir: string;
    jenis_kelamin: "Laki-laki" | "Perempuan";
    status_keluarga: "kepala_keluarga" | "istri" | "anak";
    status_kepemilikan: "sewa" | "milik_sendiri";
    agama: string;
    email: string;
    nomor_telepon: string;
    alamat_lengkap: string;
    rt: string;
    rw: string;
    kelurahan: string;
    file_kk: string;
    file_ktp: string;
}

type Props = {
    isOpen: boolean;
    onClose: () => void;
    data: PendudukDetail | null;
};

type ActiveTab = "profil" | "dokumen";

export default function WargaDetailModal({ isOpen, onClose, data }: Props) {
    const [activeTab, setActiveTab] = useState<ActiveTab>("profil");

    if (!isOpen || !data) return null;

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

                    {/* ── Header ── */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 pt-6 pb-4 z-10">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                {/* Avatar */}
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 ${data.jenis_kelamin === "Laki-laki" ? "bg-blue-500" : "bg-pink-500"
                                    }`}>
                                    {data.nama_lengkap.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">{data.nama_lengkap}</h2>
                                    <p className="text-sm text-gray-500 font-mono">NIK: {data.nik}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition flex-shrink-0"
                            >
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-1 mt-4 bg-gray-100 p-1 rounded-lg">
                            {(["profil", "dokumen"] as ActiveTab[]).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-1.5 text-sm font-medium rounded-md transition capitalize ${activeTab === tab
                                        ? "bg-white text-gray-900 shadow-sm"
                                        : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    {tab === "profil" ? "Profil" : "Dokumen"}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Body ── */}
                    <div className="px-6 py-6">

                        {/* ── Tab: Profil ── */}
                        {activeTab === "profil" && (
                            <div className="space-y-6">
                                {/* Personal Info */}
                                <Section title="Informasi Pribadi">
                                    <div className="grid grid-cols-2 gap-4">
                                        <DetailRow label="Nama Lengkap" value={data.nama_lengkap} />
                                        <DetailRow label="NO KK" value={data.no_kk} />
                                        <DetailRow label="NIK" value={data.nik} mono />
                                        <DetailRow label="Tanggal Lahir" value={formatDate(data.tanggal_lahir)} />
                                        <DetailRow label="Jenis Kelamin" value={data.jenis_kelamin} />
                                        <DetailRow label="Agama" value={data.agama} />
                                        <DetailRow label="Status Keluarga" value={data.status_keluarga} />
                                        <DetailRow label="Status Kepemilikan" value={data.status_kepemilikan} />
                                    </div>
                                </Section>

                                {/* Contact */}
                                <Section title="Kontak">
                                    <div className="grid grid-cols-2 gap-4">
                                        <DetailRow label="Email" value={data.email} />
                                        <DetailRow label="Nomor Telepon" value={data.nomor_telepon} />
                                    </div>
                                </Section>

                                {/* Address */}
                                <Section title="Alamat">
                                    <div className="space-y-3">
                                        <DetailRow label="Alamat Lengkap" value={data.alamat_lengkap} full />
                                        <div className="grid grid-cols-3 gap-4">
                                            <DetailRow label="RT" value={data.rt} />
                                            <DetailRow label="RW" value={data.rw} />
                                            <DetailRow label="Kelurahan" value={data.kelurahan} />
                                        </div>
                                    </div>
                                </Section>
                            </div>
                        )}

                        {/* ── Tab: Dokumen ── */}
                        {activeTab === "dokumen" && (
                            <div className="space-y-6">
                                <FileViewer
                                    path={data.file_kk}
                                    label="Kartu Keluarga (KK)"
                                />
                                <FileViewer
                                    path={data.file_ktp}
                                    label="KTP"
                                />
                            </div>
                        )}
                    </div>

                    {/* ── Footer ── */}
                    <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── File Viewer ──────────────────────────────────────────────────────────────

function FileViewer({ path, label }: { path: string; label: string }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Support both relative paths (dokumen/kk/x.pdf) and full URLs (from asset())
    const url = path.startsWith("http") ? path : `/storage/${path}`;
    const isPdf = path.toLowerCase().endsWith(".pdf");

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-700">{label}</p>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium transition"
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>

            <div className="relative bg-gray-50 rounded-xl border border-gray-200 overflow-hidden min-h-[280px] flex items-center justify-center">
                {/* Loading spinner */}
                {loading && !error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                        <svg className="animate-spin h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                    </div>
                )}

                {/* Error state */}
                {error && (
                    <div className="flex flex-col items-center gap-2 text-gray-400 p-8">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        </svg>
                        <p className="text-sm text-center">File tidak dapat ditampilkan.<br />Klik Download untuk membuka.</p>
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 px-4 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition"
                        >
                            Buka File
                        </a>
                    </div>
                )}

                {/* PDF viewer */}
                {isPdf && !error && (
                    <iframe
                        src={url}
                        className="w-full h-80 border-0"
                        title={label}
                        onLoad={() => setLoading(false)}
                        onError={() => { setLoading(false); setError(true); }}
                    />
                )}

                {/* Image viewer */}
                {!isPdf && !error && (
                    <img
                        src={url}
                        alt={label}
                        className="w-full object-contain max-h-80 p-2"
                        onLoad={() => setLoading(false)}
                        onError={() => { setLoading(false); setError(true); }}
                    />
                )}
            </div>
        </div>
    );
}

// ─── Helper Components ────────────────────────────────────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {title}
            </h4>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                {children}
            </div>
        </div>
    );
}

function DetailRow({
    label,
    value,
    mono,
    full,
}: {
    label: string;
    value: string;
    mono?: boolean;
    full?: boolean;
}) {
    return (
        <div className={full ? "col-span-full" : ""}>
            <p className="text-xs text-gray-400 mb-0.5">{label}</p>
            <p className={`text-sm text-gray-800 font-medium ${mono ? "font-mono" : ""}`}>
                {value || <span className="text-gray-300 italic font-normal">—</span>}
            </p>
        </div>
    );
}
