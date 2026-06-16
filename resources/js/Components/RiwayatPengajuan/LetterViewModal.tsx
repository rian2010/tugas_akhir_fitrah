// components/RiwayatPengajuan/LetterViewerModal.tsx
import { useRef, useState } from "react";
import { PengajuanSurat } from "@/Pages/Warga/Riwayat-Pengajuan/RiwayatPage";

interface LetterViewerModalProps {
    isOpen: boolean;
    onClose: () => void;
    letterData: PengajuanSurat | null;
}

function LetterContent({ letterData, currentDate, showTableBox = false }: { letterData: PengajuanSurat; currentDate: string; showTableBox?: boolean }) {
    const rt = letterData.rt || "005";
    const rw = letterData.rw || "18";
    const year = new Date().getFullYear();

    const row = (label: string, value: string) => (
        <tr key={label} style={{ border: "none" }}>
            <td style={{
                padding: "4px 8px 4px 0",
                width: "38%",
                verticalAlign: "top",
                fontSize: 13,
                border: "none"
            }}>
                {label}
            </td>
            <td style={{
                padding: "4px 0",
                fontSize: 13,
                verticalAlign: "top",
                border: "none"
            }}>
                : {value || "—"}
            </td>
        </tr>
    );

    return (
        <div style={{
            background: "#fff",
            fontFamily: "'Times New Roman', Times, serif",
            color: "#1a1a1a",
            padding: "40px 48px",
            width: "100%",
            boxSizing: "border-box",
        }}>
            {/* Kop Surat */}
            <div style={{ textAlign: "center", marginBottom: 4 }}>
                <div style={{ fontSize: 17, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                    PERUMAHAN AVIARI GRIYA PRATAMA
                </div>
                <div style={{ fontSize: 15, fontWeight: 600, marginTop: 2 }}>
                    RT {rt} – RW {rw}
                </div>
                <div style={{ fontSize: 14, marginTop: 1 }}>KEL. BULIANG – KEC. BATU AJI</div>
                <div style={{ fontSize: 14 }}>KOTA BATAM – 29438</div>
                <div style={{ borderBottom: "2.5px solid #555", margin: "10px auto 0", width: "70%" }} />
            </div>

            {/* Judul */}
            <div style={{ textAlign: "center", margin: "18px 0 20px" }}>
                <div style={{ fontSize: 15, fontWeight: 700, textDecoration: "underline", letterSpacing: 1 }}>
                    SURAT KETERANGAN
                </div>
                <div style={{ fontSize: 12, marginTop: 4, color: "#444" }}>
                    No: &nbsp;/&nbsp;SK-RT.{rt}&nbsp;/&nbsp;RW.{rw}&nbsp;/&nbsp;P.AGP&nbsp;/&nbsp;{year}
                </div>
            </div>

            {/* Paragraf pembuka */}
            <p style={{ fontSize: 13.5, lineHeight: 1.8, marginBottom: 14, textAlign: "justify" }}>
                Yang bertanda tangan di bawah ini, Ketua RT. {rt} / RW. {rw} Perumahan Aviari Griya Pratama
                Kel. Buliang, Kec. Batu Aji Kota Batam menerangkan bahwa :
            </p>

            {/* Tabel data - conditional styling based on showTableBox */}
            <div style={{
                marginBottom: 16,
                ...(showTableBox ? {
                    background: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: 6,
                    padding: "12px 16px",
                } : {
                    background: "transparent",
                    border: "none",
                    padding: 0,
                }),
            }}>
                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    border: "none",
                }}>
                    <tbody>
                        {row("Nama Lengkap", letterData.namaLengkap)}
                        {row("NIK", letterData.nik)}
                        {row("Tempat, Tgl Lahir", `${letterData.tempatLahir || "—"}, ${letterData.tanggalLahir || "—"}`)}
                        {row("Jenis Kelamin", letterData.jenisKelamin)}
                        {row("Agama", letterData.agama)}
                        {row("Pekerjaan", letterData.pekerjaan)}
                        <tr style={{ border: "none" }}>
                            <td style={{
                                padding: "4px 8px 4px 0",
                                width: "38%",
                                verticalAlign: "top",
                                fontSize: 13,
                                border: "none"
                            }}>
                                Alamat
                            </td>
                            <td style={{
                                padding: "4px 0",
                                fontSize: 13,
                                verticalAlign: "top",
                                border: "none"
                            }}>
                                : {letterData.alamat || "—"}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Paragraf isi */}
            <p style={{ fontSize: 13.5, lineHeight: 1.8, marginBottom: 14, textAlign: "justify" }}>
                Bahwa nama tersebut di atas adalah benar-benar warga RT. {rt} / RW. {rw} Perumahan Aviari Griya
                Pratama Kel. Buliang, Kec. Batu Aji Kota Batam.
            </p>
            <p style={{ fontSize: 13.5, lineHeight: 1.8, marginBottom: 14, textAlign: "justify" }}>
                Surat keterangan ini dibuat untuk memenuhi keperluan{" "}
                <strong>{letterData.keperluan}</strong>.
            </p>
            <p style={{ fontSize: 13.5, lineHeight: 1.8, marginBottom: 28, textAlign: "justify" }}>
                Demikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.
            </p>

            {/* Tanda tangan + cap */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 8 }}>
                {/* Cap / Stempel (kiri) */}
                <div style={{
                    width: 90, height: 90,
                    border: "2.5px solid #dc2626",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#dc2626",
                    fontSize: 10,
                    fontWeight: 700,
                    textAlign: "center",
                    lineHeight: 1.4,
                    opacity: 0.55,
                    flexShrink: 0,
                }}>
                    STAMPEL<br />RT.{rt}
                </div>

                {/* TTD (kanan) */}
                <div style={{ textAlign: "right", fontSize: 13.5 }}>
                    <div>Batam, {currentDate}</div>
                    <div style={{ marginTop: 4 }}>Ketua RT {rt} / RW {rw},</div>
                    <div style={{ marginTop: 64, fontWeight: 700, textDecoration: "underline" }}>
                        BAMBANG SUPRIYANTO
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Modal ──────────────────────────────────────────────────────────────
export default function LetterViewerModal({ isOpen, onClose, letterData }: LetterViewerModalProps) {
    const printTargetRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    if (!isOpen || !letterData) return null;

    const currentDate = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const handleDownloadPDF = async () => {
        if (!printTargetRef.current) return;
        setIsDownloading(true);

        try {
            const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
                import("jspdf"),
                import("html2canvas"),
            ]);

            const el = printTargetRef.current;
            el.style.visibility = "visible";
            el.style.position = "fixed";
            el.style.top = "0";
            el.style.left = "0";
            el.style.zIndex = "9999";

            const canvas = await html2canvas(el, {
                scale: 2.5,
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: false,
            });

            el.style.visibility = "hidden";
            el.style.position = "absolute";
            el.style.top = "-9999px";
            el.style.left = "-9999px";
            el.style.zIndex = "";

            const imgData = canvas.toDataURL("image/png");

            const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
            const pageW = pdf.internal.pageSize.getWidth();
            const pageH = pdf.internal.pageSize.getHeight();

            const imgW = pageW;
            const imgH = (canvas.height * pageW) / canvas.width;

            let yOffset = 0;
            while (yOffset < imgH) {
                if (yOffset > 0) pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, -yOffset, imgW, imgH);
                yOffset += pageH;
            }

            const safeName = `Surat_${(letterData.jenisSurat || "Keterangan").replace(/\s+/g, "_")}_${letterData.nomorPengajuan}.pdf`;
            pdf.save(safeName);
        } catch (err) {
            console.error("PDF generation failed:", err);
            alert("Gagal mengunduh surat. Silakan coba lagi.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <>
            {/* Hidden off-screen render target - NO table box for PDF */}
            <div
                ref={printTargetRef}
                style={{
                    position: "absolute",
                    top: -9999,
                    left: -9999,
                    visibility: "hidden",
                    width: 794,
                    background: "#fff",
                    zIndex: -1,
                }}
            >
                {/* showTableBox={false} ensures PDF has no grid/background */}
                <LetterContent letterData={letterData} currentDate={currentDate} showTableBox={false} />
            </div>

            {/* Visible modal - WITH table box for preview */}
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />

                <div className="flex min-h-full items-center justify-center p-4">
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] flex flex-col">

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">{letterData.jenisSurat}</h2>
                                <p className="text-xs text-gray-400 mt-0.5">No. Pengajuan: {letterData.nomorPengajuan}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Preview - WITH table box */}
                        <div className="overflow-y-auto flex-1 bg-gray-50 px-6 py-6">
                            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                                <LetterContent letterData={letterData} currentDate={currentDate} showTableBox={true} />
                            </div>
                        </div>

                        {/* Footer actions */}
                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between gap-3 bg-white rounded-b-2xl">
                            <p className="text-xs text-gray-400">
                                Pratinjau surat · dokumen resmi RT {letterData.rt || "005"} / RW {letterData.rw || "18"}
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition font-medium"
                                >
                                    Tutup
                                </button>
                                <button
                                    onClick={handleDownloadPDF}
                                    disabled={isDownloading}
                                    className="inline-flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white rounded-lg text-sm font-semibold transition shadow"
                                >
                                    {isDownloading ? (
                                        <>
                                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                            </svg>
                                            Menyiapkan…
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Unduh PDF
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
