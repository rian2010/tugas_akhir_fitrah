// components/DataWarga/WargaAddModal.tsx
import { useState, Fragment } from "react";

export interface PendudukFormData {
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
}

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: PendudukFormData) => void;
};

const agamaOptions = [
    "Islam",
    "Kristen",
    "Katolik",
    "Hindu",
    "Buddha",
    "Konghucu",
    "Lainnya"
];

type Step = 1 | 2 | 3;

export default function WargaAddModal({ isOpen, onClose, onSave }: Props) {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [formData, setFormData] = useState<PendudukFormData>({
        nama_lengkap: "",
        nik: "",
        tanggal_lahir: "",
        jenis_kelamin: "Laki-laki",
        agama: "Islam",
        email: "",
        nomor_telepon: "",
        alamat_lengkap: "",
        rt: "",
        rw: "",
        kelurahan: "",
        file_kk: null,
        file_ktp: null,
    });

    const [errors, setErrors] = useState<Partial<Record<keyof PendudukFormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validation for each step
    const validateStep1 = (): boolean => {
        const newErrors: Partial<Record<keyof PendudukFormData, string>> = {};

        if (!formData.nama_lengkap.trim()) {
            newErrors.nama_lengkap = "Nama lengkap wajib diisi";
        }

        if (!formData.nik.trim()) {
            newErrors.nik = "NIK wajib diisi";
        } else if (!/^\d{16}$/.test(formData.nik)) {
            newErrors.nik = "NIK harus 16 digit angka";
        }

        if (!formData.tanggal_lahir) {
            newErrors.tanggal_lahir = "Tanggal lahir wajib diisi";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email wajib diisi";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Format email tidak valid";
        }

        if (!formData.nomor_telepon.trim()) {
            newErrors.nomor_telepon = "Nomor telepon wajib diisi";
        } else if (!/^08\d{8,11}$/.test(formData.nomor_telepon)) {
            newErrors.nomor_telepon = "Nomor telepon harus dimulai dengan 08 dan 10-13 digit";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = (): boolean => {
        const newErrors: Partial<Record<keyof PendudukFormData, string>> = {};

        if (!formData.alamat_lengkap.trim()) {
            newErrors.alamat_lengkap = "Alamat lengkap wajib diisi";
        }

        if (!formData.rt.trim()) {
            newErrors.rt = "RT wajib diisi";
        } else if (!/^\d{1,3}$/.test(formData.rt)) {
            newErrors.rt = "RT harus 1-3 digit angka";
        }

        if (!formData.rw.trim()) {
            newErrors.rw = "RW wajib diisi";
        } else if (!/^\d{1,3}$/.test(formData.rw)) {
            newErrors.rw = "RW harus 1-3 digit angka";
        }

        if (!formData.kelurahan.trim()) {
            newErrors.kelurahan = "Kelurahan wajib diisi";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = (): boolean => {
        const newErrors: Partial<Record<keyof PendudukFormData, string>> = {};

        if (!formData.file_kk) {
            newErrors.file_kk = "File Kartu Keluarga wajib diunggah";
        }

        if (!formData.file_ktp) {
            newErrors.file_ktp = "File KTP wajib diunggah";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (currentStep === 1 && validateStep1()) {
            setCurrentStep(2);
        } else if (currentStep === 2 && validateStep2()) {
            setCurrentStep(3);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => (prev - 1) as Step);
            // Clear errors when going back
            setErrors({});
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name as keyof PendudukFormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'file_kk' | 'file_ktp') => {
        const file = e.target.files?.[0] || null;

        // Validate file size (max 5MB)
        if (file && file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, [field]: "Ukuran file maksimal 5MB" }));
            return;
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
        if (file && !allowedTypes.includes(file.type)) {
            setErrors(prev => ({ ...prev, [field]: "File harus berupa PDF, JPG, atau PNG" }));
            return;
        }

        setFormData(prev => ({ ...prev, [field]: file }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    const handleSubmit = async () => {
        if (!validateStep3()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            onSave(formData);
            setIsSubmitting(false);
            handleClose();
        }, 1000);
    };

    const handleClose = () => {
        setFormData({
            nama_lengkap: "",
            nik: "",
            tanggal_lahir: "",
            jenis_kelamin: "Laki-laki",
            agama: "Islam",
            email: "",
            nomor_telepon: "",
            alamat_lengkap: "",
            rt: "",
            rw: "",
            kelurahan: "",
            file_kk: null,
            file_ktp: null,
        });
        setErrors({});
        setCurrentStep(1);
        onClose();
    };

    if (!isOpen) return null;

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
                    {/* Progress Steps */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 pt-6 pb-4 z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    Tambah Data Warga Baru
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

                        {/* Step Indicators */}
                        <div className="flex gap-2">
                            {[1, 2, 3].map((step) => (
                                <div
                                    key={step}
                                    className={`flex-1 h-2 rounded-full transition-all ${step === currentStep
                                            ? "bg-blue-600"
                                            : step < currentStep
                                                ? "bg-green-500"
                                                : "bg-gray-200"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="px-6 py-6">
                        {/* Step 1: Personal Information */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 font-semibold text-sm">1</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Informasi Pribadi
                                    </h3>
                                </div>

                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nama Lengkap <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="nama_lengkap"
                                            value={formData.nama_lengkap}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border ${errors.nama_lengkap ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                                            placeholder="Masukkan nama lengkap"
                                        />
                                        {errors.nama_lengkap && (
                                            <p className="mt-1 text-xs text-red-500">{errors.nama_lengkap}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            NIK <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="nik"
                                            value={formData.nik}
                                            onChange={handleInputChange}
                                            maxLength={16}
                                            className={`w-full px-3 py-2 border ${errors.nik ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition font-mono`}
                                            placeholder="16 digit angka"
                                        />
                                        {errors.nik && (
                                            <p className="mt-1 text-xs text-red-500">{errors.nik}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Tanggal Lahir <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="tanggal_lahir"
                                            value={formData.tanggal_lahir}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border ${errors.tanggal_lahir ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                                        />
                                        {errors.tanggal_lahir && (
                                            <p className="mt-1 text-xs text-red-500">{errors.tanggal_lahir}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Jenis Kelamin <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex gap-4 mt-2">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="jenis_kelamin"
                                                    value="Laki-laki"
                                                    checked={formData.jenis_kelamin === "Laki-laki"}
                                                    onChange={handleInputChange}
                                                    className="text-blue-600"
                                                />
                                                <span className="text-sm">Laki-laki</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="jenis_kelamin"
                                                    value="Perempuan"
                                                    checked={formData.jenis_kelamin === "Perempuan"}
                                                    onChange={handleInputChange}
                                                    className="text-blue-600"
                                                />
                                                <span className="text-sm">Perempuan</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Agama <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="agama"
                                            value={formData.agama}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                        >
                                            {agamaOptions.map(agama => (
                                                <option key={agama} value={agama}>{agama}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                                            placeholder="nama@email.com"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nomor Telepon <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="nomor_telepon"
                                            value={formData.nomor_telepon}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 border ${errors.nomor_telepon ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                                            placeholder="08xxxxxxxxxx"
                                        />
                                        {errors.nomor_telepon && (
                                            <p className="mt-1 text-xs text-red-500">{errors.nomor_telepon}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Address Information */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 font-semibold text-sm">2</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Informasi Alamat
                                    </h3>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Alamat Lengkap <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            name="alamat_lengkap"
                                            value={formData.alamat_lengkap}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className={`w-full px-3 py-2 border ${errors.alamat_lengkap ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                                            placeholder="Jalan, nomor rumah, dll"
                                        />
                                        {errors.alamat_lengkap && (
                                            <p className="mt-1 text-xs text-red-500">{errors.alamat_lengkap}</p>
                                        )}
                                    </div>

                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                RT <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="rt"
                                                value={formData.rt}
                                                onChange={handleInputChange}
                                                className={`w-full px-3 py-2 border ${errors.rt ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                                                placeholder="01"
                                            />
                                            {errors.rt && (
                                                <p className="mt-1 text-xs text-red-500">{errors.rt}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                RW <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="rw"
                                                value={formData.rw}
                                                onChange={handleInputChange}
                                                className={`w-full px-3 py-2 border ${errors.rw ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                                                placeholder="02"
                                            />
                                            {errors.rw && (
                                                <p className="mt-1 text-xs text-red-500">{errors.rw}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Kelurahan <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="kelurahan"
                                                value={formData.kelurahan}
                                                onChange={handleInputChange}
                                                className={`w-full px-3 py-2 border ${errors.kelurahan ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
                                                placeholder="Kelurahan"
                                            />
                                            {errors.kelurahan && (
                                                <p className="mt-1 text-xs text-red-500">{errors.kelurahan}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Documents */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 font-semibold text-sm">3</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Unggah Dokumen
                                    </h3>
                                </div>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Kartu Keluarga (KK) <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed ${errors.file_kk ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-500'} rounded-lg cursor-pointer transition`}>
                                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <span className="text-sm text-gray-600">
                                                    {formData.file_kk ? formData.file_kk.name : "Upload KK (PDF/JPG/PNG)"}
                                                </span>
                                                <input
                                                    type="file"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    onChange={(e) => handleFileChange(e, 'file_kk')}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                        {errors.file_kk && (
                                            <p className="mt-1 text-xs text-red-500">{errors.file_kk}</p>
                                        )}
                                        <p className="mt-1 text-xs text-gray-500">Maksimal 5MB</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            KTP <span className="text-red-500">*</span>
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed ${errors.file_ktp ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-500'} rounded-lg cursor-pointer transition`}>
                                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <span className="text-sm text-gray-600">
                                                    {formData.file_ktp ? formData.file_ktp.name : "Upload KTP (PDF/JPG/PNG)"}
                                                </span>
                                                <input
                                                    type="file"
                                                    accept=".pdf,.jpg,.jpeg,.png"
                                                    onChange={(e) => handleFileChange(e, 'file_ktp')}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                        {errors.file_ktp && (
                                            <p className="mt-1 text-xs text-red-500">{errors.file_ktp}</p>
                                        )}
                                        <p className="mt-1 text-xs text-gray-500">Maksimal 5MB</p>
                                    </div>
                                </div>

                                {/* Summary of completed steps */}
                                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Ringkasan:</h4>
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <p>✓ {formData.nama_lengkap || "Nama belum diisi"}</p>
                                        <p>✓ NIK: {formData.nik || "Belum diisi"}</p>
                                        <p>✓ Alamat: {formData.alamat_lengkap ? "Sudah diisi" : "Belum diisi"}</p>
                                        <p>✓ Dokumen: {formData.file_kk && formData.file_ktp ? "Lengkap" : "Belum lengkap"}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer with Navigation Buttons */}
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
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Menyimpan...
                                    </>
                                ) : (
                                    "Simpan Data"
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
