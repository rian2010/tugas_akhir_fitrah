// components/DataWarga/WargaEditModal.tsx
import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";

export interface PendudukEditFormData {
    nama_lengkap: string;
    nik: string;
    tanggal_lahir: string;
    jenis_kelamin: "Laki-laki" | "Perempuan";
    agama: string;
    email: string;
    nomor_telepon: string;
    alamat_lengkap: string;
    rt: string;
    rw: string;
    kelurahan: string;
    file_kk: File | null;
    file_ktp: File | null;
    existing_file_kk?: string;
    existing_file_ktp?: string;
    [key: string]: string | File | null | undefined;
}

interface WargaData {
    id: number | string;
    nama_lengkap: string;
    nik: string;
    tanggal_lahir: string;
    jenis_kelamin: "Laki-laki" | "Perempuan";
    agama: string;
    email: string;
    nomor_telepon: string;
    alamat_lengkap: string;
    rt: string;
    rw: string;
    kelurahan: string;
    file_kk?: string;
    file_ktp?: string;
}

type Props = {
    isOpen: boolean;
    onClose: () => void;
    wargaData: WargaData;
    authUser?: {
        name: string;
        email: string;
        no_kk: string;
    };
};

const agamaOptions = [
    "Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu", "Lainnya",
];

type Step = 1 | 2 | 3;

export default function WargaEditModal({ isOpen, onClose, wargaData, authUser }: Props) {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [clientErrors, setClientErrors] = useState<Partial<Record<keyof PendudukEditFormData, string>>>({});
    const [removeKK, setRemoveKK] = useState(false);
    const [removeKTP, setRemoveKTP] = useState(false);

    const { data, setData, put, processing, errors, reset, clearErrors } = useForm<PendudukEditFormData>({
        nama_lengkap: wargaData.nama_lengkap || "",
        nik: wargaData.nik || "",
        tanggal_lahir: wargaData.tanggal_lahir || "",
        jenis_kelamin: wargaData.jenis_kelamin || "Laki-laki",
        agama: wargaData.agama || "Islam",
        email: wargaData.email || "",
        nomor_telepon: wargaData.nomor_telepon || "",
        alamat_lengkap: wargaData.alamat_lengkap || "",
        rt: wargaData.rt || "",
        rw: wargaData.rw || "",
        kelurahan: wargaData.kelurahan || "",
        file_kk: null,
        file_ktp: null,
        existing_file_kk: wargaData.file_kk,
        existing_file_ktp: wargaData.file_ktp,
    });

    // Reset form when modal opens with new data
    useEffect(() => {
        if (isOpen && wargaData) {
            reset();
            clearErrors();
            setClientErrors({});
            setCurrentStep(1);
            setRemoveKK(false);
            setRemoveKTP(false);

            setData({
                nama_lengkap: wargaData.nama_lengkap || "",
                nik: wargaData.nik || "",
                tanggal_lahir: wargaData.tanggal_lahir || "",
                jenis_kelamin: wargaData.jenis_kelamin || "Laki-laki",
                agama: wargaData.agama || "Islam",
                email: wargaData.email || "",
                nomor_telepon: wargaData.nomor_telepon || "",
                alamat_lengkap: wargaData.alamat_lengkap || "",
                rt: wargaData.rt || "",
                rw: wargaData.rw || "",
                kelurahan: wargaData.kelurahan || "",
                file_kk: null,
                file_ktp: null,
                existing_file_kk: wargaData.file_kk,
                existing_file_ktp: wargaData.file_ktp,
            });
        }
    }, [isOpen, wargaData]);

    // Merge client-side errors with server-side Inertia errors
    const allErrors = { ...clientErrors, ...errors };

    // ─── Validation ───────────────────────────────────────────────────────────

    const validateStep1 = (): boolean => {
        const newErrors: Partial<Record<keyof PendudukEditFormData, string>> = {};

        if (!data.nama_lengkap?.trim())
            newErrors.nama_lengkap = "Nama lengkap wajib diisi";

        if (!data.nik?.trim())
            newErrors.nik = "NIK wajib diisi";
        else if (!/^\d{16}$/.test(data.nik))
            newErrors.nik = "NIK harus 16 digit angka";

        if (!data.tanggal_lahir)
            newErrors.tanggal_lahir = "Tanggal lahir wajib diisi";

        if (!data.email?.trim())
            newErrors.email = "Email wajib diisi";
        else if (!/\S+@\S+\.\S+/.test(data.email))
            newErrors.email = "Format email tidak valid";

        if (!data.nomor_telepon?.trim())
            newErrors.nomor_telepon = "Nomor telepon wajib diisi";
        else if (!/^08\d{8,11}$/.test(data.nomor_telepon))
            newErrors.nomor_telepon = "Nomor telepon harus dimulai dengan 08 dan 10-13 digit";

        setClientErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = (): boolean => {
        const newErrors: Partial<Record<keyof PendudukEditFormData, string>> = {};

        if (!data.alamat_lengkap?.trim())
            newErrors.alamat_lengkap = "Alamat lengkap wajib diisi";

        if (!data.rt?.trim())
            newErrors.rt = "RT wajib diisi";
        else if (!/^\d{1,3}$/.test(data.rt))
            newErrors.rt = "RT harus 1-3 digit angka";

        if (!data.rw?.trim())
            newErrors.rw = "RW wajib diisi";
        else if (!/^\d{1,3}$/.test(data.rw))
            newErrors.rw = "RW harus 1-3 digit angka";

        if (!data.kelurahan?.trim())
            newErrors.kelurahan = "Kelurahan wajib diisi";

        setClientErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = (): boolean => {
        const newErrors: Partial<Record<keyof PendudukEditFormData, string>> = {};

        // Only require files if no existing files and not removing
        if (!data.file_kk && !data.existing_file_kk) {
            newErrors.file_kk = "File Kartu Keluarga wajib diunggah";
        }
        if (!data.file_ktp && !data.existing_file_ktp) {
            newErrors.file_ktp = "File KTP wajib diunggah";
        }

        setClientErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ─── Navigation ──────────────────────────────────────────────────────────

    const handleNext = () => {
        if (currentStep === 1 && validateStep1()) setCurrentStep(2);
        else if (currentStep === 2 && validateStep2()) setCurrentStep(3);
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => (prev - 1) as Step);
            setClientErrors({});
        }
    };

    const handleClose = () => {
        reset();
        clearErrors();
        setClientErrors({});
        setCurrentStep(1);
        setRemoveKK(false);
        setRemoveKTP(false);
        onClose();
    };

    // ─── Input Handlers ──────────────────────────────────────────────────────

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setData(name as keyof PendudukEditFormData, value);
        // Clear client error for this field on change
        if (clientErrors[name as keyof PendudukEditFormData]) {
            setClientErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: "file_kk" | "file_ktp"
    ) => {
        const file = e.target.files?.[0] || null;

        if (file && file.size > 5 * 1024 * 1024) {
            setClientErrors((prev) => ({ ...prev, [field]: "Ukuran file maksimal 5MB" }));
            return;
        }

        const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
        if (file && !allowedTypes.includes(file.type)) {
            setClientErrors((prev) => ({
                ...prev,
                [field]: "File harus berupa PDF, JPG, atau PNG",
            }));
            return;
        }

        setData(field, file);
        // Clear existing file reference when new file is uploaded
        if (field === "file_kk") {
            setData("existing_file_kk", undefined);
            setRemoveKK(false);
        } else {
            setData("existing_file_ktp", undefined);
            setRemoveKTP(false);
        }
        setClientErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleRemoveFile = (field: "file_kk" | "file_ktp") => {
        if (field === "file_kk") {
            setData("file_kk", null);
            setData("existing_file_kk", undefined);
            setRemoveKK(true);
        } else {
            setData("file_ktp", null);
            setData("existing_file_ktp", undefined);
            setRemoveKTP(true);
        }
    };

    // ─── Submit ───────────────────────────────────────────────────────────────

    const handleSubmit = () => {
        if (!validateStep3()) return;

        const formData = new FormData();

        // Add all text fields
        Object.keys(data).forEach(key => {
            const value = data[key];
            if (value !== null && value !== undefined &&
                key !== 'file_kk' && key !== 'file_ktp' &&
                key !== 'existing_file_kk' && key !== 'existing_file_ktp') {
                formData.append(key, value as string);
            }
        });

        // Handle file uploads
        if (data.file_kk) {
            formData.append('file_kk', data.file_kk);
            formData.append('remove_kk', 'false');
        } else if (removeKK) {
            formData.append('file_kk', '');
            formData.append('remove_kk', 'true');
        }

        if (data.file_ktp) {
            formData.append('file_ktp', data.file_ktp);
            formData.append('remove_ktp', 'false');
        } else if (removeKTP) {
            formData.append('file_ktp', '');
            formData.append('remove_ktp', 'true');
        }

        // Add _method for PUT request
        formData.append('_method', 'PUT');

        put(route("warga.update", wargaData.id), {
            data: formData,
            onSuccess: () => handleClose(),
        });
    };

    if (!isOpen) return null;

    // ─── Render ───────────────────────────────────────────────────────────────

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">

                    {/* ── Header + Step Bar ── */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 pt-6 pb-4 z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Edit Data Warga
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Langkah {currentStep} dari 3
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="p-2 hover:bg-gray-100 rounded-lg transition"
                            >
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Step indicators */}
                        <div className="flex gap-2">
                            {[1, 2, 3].map((step) => (
                                <div
                                    key={step}
                                    className={`flex-1 h-2 rounded-full transition-all duration-300 ${step === currentStep
                                        ? "bg-blue-600"
                                        : step < currentStep
                                            ? "bg-green-500"
                                            : "bg-gray-200"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* ── Form Body ── */}
                    <div className="px-6 py-6">

                        {/* ── Step 1: Informasi Pribadi ── */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <StepHeading step={1} title="Informasi Pribadi" />

                                <div className="grid md:grid-cols-2 gap-5">
                                    <Field label="Nama Lengkap" error={allErrors.nama_lengkap} required>
                                        <input
                                            type="text"
                                            name="nama_lengkap"
                                            value={data.nama_lengkap}
                                            onChange={handleInputChange}
                                            className={inputClass(allErrors.nama_lengkap)}
                                            placeholder="Masukkan nama lengkap"
                                        />
                                    </Field>

                                    <Field label="NIK" error={allErrors.nik} required>
                                        <input
                                            type="text"
                                            name="nik"
                                            value={data.nik}
                                            onChange={handleInputChange}
                                            maxLength={16}
                                            className={`${inputClass(allErrors.nik)} font-mono`}
                                            placeholder="16 digit angka"
                                        />
                                    </Field>

                                    <Field label="Tanggal Lahir" error={allErrors.tanggal_lahir} required>
                                        <input
                                            type="date"
                                            name="tanggal_lahir"
                                            value={data.tanggal_lahir}
                                            onChange={handleInputChange}
                                            className={inputClass(allErrors.tanggal_lahir)}
                                        />
                                    </Field>

                                    <Field label="Jenis Kelamin" required>
                                        <div className="flex gap-4 mt-2">
                                            {["Laki-laki", "Perempuan"].map((jk) => (
                                                <label key={jk} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="jenis_kelamin"
                                                        value={jk}
                                                        checked={data.jenis_kelamin === jk}
                                                        onChange={handleInputChange}
                                                        className="text-blue-600"
                                                    />
                                                    <span className="text-sm">{jk}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </Field>

                                    <Field label="Agama" required>
                                        <select
                                            name="agama"
                                            value={data.agama}
                                            onChange={handleInputChange}
                                            className={inputClass()}
                                        >
                                            {agamaOptions.map((a) => (
                                                <option key={a} value={a}>{a}</option>
                                            ))}
                                        </select>
                                    </Field>

                                    <Field label="Email" error={allErrors.email} required>
                                        <input
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={handleInputChange}
                                            className={inputClass(allErrors.email)}
                                            placeholder="nama@email.com"
                                        />
                                    </Field>

                                    <Field label="Nomor Telepon" error={allErrors.nomor_telepon} required>
                                        <input
                                            type="tel"
                                            name="nomor_telepon"
                                            value={data.nomor_telepon}
                                            onChange={handleInputChange}
                                            className={inputClass(allErrors.nomor_telepon)}
                                            placeholder="08xxxxxxxxxx"
                                        />
                                    </Field>
                                </div>
                            </div>
                        )}

                        {/* ── Step 2: Informasi Alamat ── */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <StepHeading step={2} title="Informasi Alamat" />

                                <div className="space-y-5">
                                    <Field label="Alamat Lengkap" error={allErrors.alamat_lengkap} required>
                                        <textarea
                                            name="alamat_lengkap"
                                            value={data.alamat_lengkap}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className={inputClass(allErrors.alamat_lengkap)}
                                            placeholder="Jalan, nomor rumah, dll"
                                        />
                                    </Field>

                                    <div className="grid md:grid-cols-3 gap-4">
                                        <Field label="RT" error={allErrors.rt} required>
                                            <input
                                                type="text"
                                                name="rt"
                                                value={data.rt}
                                                onChange={handleInputChange}
                                                className={inputClass(allErrors.rt)}
                                                placeholder="01"
                                            />
                                        </Field>

                                        <Field label="RW" error={allErrors.rw} required>
                                            <input
                                                type="text"
                                                name="rw"
                                                value={data.rw}
                                                onChange={handleInputChange}
                                                className={inputClass(allErrors.rw)}
                                                placeholder="02"
                                            />
                                        </Field>

                                        <Field label="Kelurahan" error={allErrors.kelurahan} required>
                                            <input
                                                type="text"
                                                name="kelurahan"
                                                value={data.kelurahan}
                                                onChange={handleInputChange}
                                                className={inputClass(allErrors.kelurahan)}
                                                placeholder="Kelurahan"
                                            />
                                        </Field>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ── Step 3: Unggah Dokumen ── */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <StepHeading step={3} title="Unggah Dokumen" />

                                <div className="space-y-5">
                                    <EditFileUploadField
                                        label="Kartu Keluarga (KK)"
                                        field="file_kk"
                                        file={data.file_kk}
                                        existingFile={data.existing_file_kk}
                                        error={allErrors.file_kk}
                                        onFileChange={handleFileChange}
                                        onRemove={() => handleRemoveFile("file_kk")}
                                    />
                                    <EditFileUploadField
                                        label="KTP"
                                        field="file_ktp"
                                        file={data.file_ktp}
                                        existingFile={data.existing_file_ktp}
                                        error={allErrors.file_ktp}
                                        onFileChange={handleFileChange}
                                        onRemove={() => handleRemoveFile("file_ktp")}
                                    />
                                </div>

                                {/* Summary */}
                                <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-100">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Ringkasan Data:</h4>
                                    <div className="space-y-1.5 text-sm text-gray-600">
                                        <SummaryRow
                                            label="Nama"
                                            value={data.nama_lengkap}
                                            ok={!!data.nama_lengkap}
                                        />
                                        <SummaryRow
                                            label="NIK"
                                            value={data.nik}
                                            ok={!!data.nik}
                                        />
                                        <SummaryRow
                                            label="Alamat"
                                            value={data.alamat_lengkap ? "Sudah diisi" : ""}
                                            ok={!!data.alamat_lengkap}
                                        />
                                        <SummaryRow
                                            label="Dokumen"
                                            value={(data.file_kk || data.existing_file_kk) && (data.file_ktp || data.existing_file_ktp) ? "KK & KTP lengkap" : "Belum lengkap"}
                                            ok={!!((data.file_kk || data.existing_file_kk) && (data.file_ktp || data.existing_file_ktp))}
                                        />
                                    </div>
                                </div>

                                {/* Show server-side errors on step 3 if any */}
                                {Object.keys(errors).length > 0 && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                        <p className="text-sm font-semibold text-red-700 mb-2">
                                            Terdapat kesalahan:
                                        </p>
                                        <ul className="list-disc list-inside space-y-1">
                                            {Object.entries(errors).map(([key, msg]) => (
                                                <li key={key} className="text-sm text-red-600">{msg}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ── Footer ── */}
                    <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-between gap-3">
                        <button
                            type="button"
                            onClick={currentStep === 1 ? handleClose : handlePrevious}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition"
                        >
                            {currentStep === 1 ? "Batal" : "Kembali"}
                        </button>

                        {currentStep < 3 ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition flex items-center gap-2"
                            >
                                Selanjutnya
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={processing}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Menyimpan...
                                    </>
                                ) : (
                                    "Update Data"
                                )}
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

// ─── Helper Components ────────────────────────────────────────────────────────

function StepHeading({ step, title }: { step: number; title: string }) {
    return (
        <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">{step}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
    );
}

function Field({
    label,
    error,
    required,
    children,
}: {
    label: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}

function EditFileUploadField({
    label,
    field,
    file,
    existingFile,
    error,
    onFileChange,
    onRemove,
}: {
    label: string;
    field: "file_kk" | "file_ktp";
    file: File | null;
    existingFile?: string;
    error?: string;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>, field: "file_kk" | "file_ktp") => void;
    onRemove: () => void;
}) {
    const hasExisting = !!existingFile && !file;
    const hasNewFile = !!file;

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} <span className="text-red-500">*</span>
            </label>

            {hasExisting && (
                <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm text-blue-700">File saat ini: {existingFile.split('/').pop()}</span>
                    </div>
                    <button
                        type="button"
                        onClick={onRemove}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                        Hapus
                    </button>
                </div>
            )}

            <label
                className={`flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition ${error
                    ? "border-red-400 bg-red-50"
                    : hasNewFile
                        ? "border-green-400 bg-green-50"
                        : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                    }`}
            >
                {hasNewFile ? (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                )}
                <span className={`text-sm ${hasNewFile ? "text-green-700 font-medium" : "text-gray-500"}`}>
                    {hasNewFile
                        ? file.name
                        : hasExisting
                            ? "Upload file baru (kosongkan jika tidak ingin mengganti)"
                            : `Upload ${label} (PDF/JPG/PNG)`}
                </span>
                <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => onFileChange(e, field)}
                    className="hidden"
                />
            </label>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            <p className="mt-1 text-xs text-gray-400">Maksimal 5MB. Kosongkan jika tidak ingin mengubah file</p>
        </div>
    );
}

function SummaryRow({ label, value, ok }: { label: string; value: string; ok: boolean }) {
    return (
        <div className="flex items-center gap-2">
            <span className={`text-base ${ok ? "text-green-500" : "text-gray-300"}`}>
                {ok ? "✓" : "○"}
            </span>
            <span className="font-medium text-gray-600 w-20">{label}:</span>
            <span className={ok ? "text-gray-800" : "text-gray-400 italic"}>
                {value || "Belum diisi"}
            </span>
        </div>
    );
}

// ─── Utility ──────────────────────────────────────────────────────────────────

function inputClass(error?: string) {
    return `w-full px-3 py-2 border ${error ? "border-red-400 bg-red-50" : "border-gray-300"
        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-sm`;
}
