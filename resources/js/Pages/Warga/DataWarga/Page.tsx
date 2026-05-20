import { useState, useMemo } from "react";
import PendudukCard from "@/Components/DataWarga/WargaCard";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import WargaDetailModal, { PendudukDetail } from "@/Components/DataWarga/DetailModal";
import WargaAddModal, { PendudukFormData } from "@/Components/DataWarga/WargaAddModal";

const dummy: PendudukDetail[] = [
    {
        id: 1,
        nama_lengkap: "Budi Santoso",
        nik: "1234567890123456",
        tanggal_lahir: "1990-05-15",
        jenis_kelamin: "Laki-laki",
        agama: "Islam",
        email: "budi.santoso@email.com",
        nomor_telepon: "081234567890",
        alamat_lengkap: "Jl. Melati No. 10",
        rt: "01",
        rw: "02",
        kelurahan: "Kelurahan Sukamaju",
        file_kk: "/files/kk1.pdf",
        file_ktp: "/files/ktp1.jpg",
    },
    {
        id: 2,
        nama_lengkap: "Siti Aminah",
        nik: "2345678901234567",
        tanggal_lahir: "1988-10-20",
        jenis_kelamin: "Perempuan",
        agama: "Islam",
        email: "siti.aminah@email.com",
        nomor_telepon: "081298765432",
        alamat_lengkap: "Jl. Mawar No. 5",
        rt: "02",
        rw: "02",
        kelurahan: "Kelurahan Sukamaju",
        file_kk: "/files/kk2.pdf",
        file_ktp: "/files/ktp2.jpg",
    },
    {
        id: 3,
        nama_lengkap: "Ahmad Wijaya",
        nik: "3456789012345678",
        tanggal_lahir: "1995-03-10",
        jenis_kelamin: "Laki-laki",
        agama: "Kristen",
        email: "ahmad.wijaya@email.com",
        nomor_telepon: "081255566677",
        alamat_lengkap: "Jl. Anggrek No. 15",
        rt: "01",
        rw: "03",
        kelurahan: "Kelurahan Mekarjaya",
        file_kk: "/files/kk3.pdf",
        file_ktp: "/files/ktp3.jpg",
    },
];

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedWarga, setSelectedWarga] = useState<PendudukDetail | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRT, setSelectedRT] = useState<string>("all");
    const [isLoading, setIsLoading] = useState(false);
    const [wargaList, setWargaList] = useState<PendudukDetail[]>(dummy);

    // Get unique RT values for filter
    const rtOptions = useMemo(() => {
        const rts = new Set(wargaList.map((item) => item.rt));
        return ["all", ...Array.from(rts).sort()];
    }, [wargaList]);

    // Filter data based on search and RT
    const filteredData = useMemo(() => {
        setIsLoading(true);

        setTimeout(() => setIsLoading(false), 100);

        return wargaList.filter((item) => {
            const matchesSearch =
                item.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.nik.includes(searchTerm) ||
                item.alamat_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.nomor_telepon.includes(searchTerm);

            const matchesRT = selectedRT === "all" || item.rt === selectedRT;

            return matchesSearch && matchesRT;
        });
    }, [searchTerm, selectedRT, wargaList]);

    const handleView = (data: PendudukDetail) => {
        setSelectedWarga(data);
        setIsModalOpen(true);
    };

    const handleEdit = (data: PendudukDetail) => {
        console.log("Edit:", data);
        // Implement edit logic
    };

    const handleDelete = (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            setWargaList(prev => prev.filter(warga => warga.id !== id));
            console.log("Delete:", id);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedWarga(null);
    };

    const handleAddWarga = (formData: PendudukFormData) => {
        const newWarga: PendudukDetail = {
            id: wargaList.length + 1,
            nama_lengkap: formData.nama_lengkap,
            nik: formData.nik,
            tanggal_lahir: formData.tanggal_lahir,
            jenis_kelamin: formData.jenis_kelamin,
            agama: formData.agama,
            email: formData.email,
            nomor_telepon: formData.nomor_telepon,
            alamat_lengkap: formData.alamat_lengkap,
            rt: formData.rt,
            rw: formData.rw,
            kelurahan: formData.kelurahan,
            file_kk: formData.file_kk ? URL.createObjectURL(formData.file_kk) : "",
            file_ktp: formData.file_ktp ? URL.createObjectURL(formData.file_ktp) : "",
        };

        setWargaList(prev => [...prev, newWarga]);
        alert("Data warga berhasil ditambahkan!");
    };

    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    return (
        <Authenticated>
            <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
                {/* Header Section - Fixed */}
                <div className="flex-shrink-0 bg-white border-b border-gray-200 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Data Anggota Keluarga
                                </h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Total {filteredData.length} warga terdaftar
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleOpenAddModal}
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
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    {/* Filters Section */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
                        <div className="bg-white rounded-xl shadow-sm p-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Search Input */}
                                <div className="flex-1">
                                    <div className="relative">
                                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder="Cari berdasarkan nama, NIK, alamat, email, atau telepon..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                        />
                                    </div>
                                </div>

                                {/* RT Filter */}
                                <div className="sm:w-48">
                                    <select
                                        value={selectedRT}
                                        onChange={(e) => setSelectedRT(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                                    >
                                        {rtOptions.map((rt) => (
                                            <option key={rt} value={rt}>
                                                {rt === "all" ? "Semua RT" : `RT ${rt}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Clear Filters Button */}
                                {(searchTerm || selectedRT !== "all") && (
                                    <button
                                        onClick={() => {
                                            setSearchTerm("");
                                            setSelectedRT("all");
                                        }}
                                        className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition"
                                    >
                                        Clear filters
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                        {isLoading ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="bg-white rounded-2xl shadow-md p-5 animate-pulse">
                                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                                        <div className="h-16 bg-gray-200 rounded mb-4"></div>
                                        <div className="flex gap-3">
                                            <div className="flex-1 h-10 bg-gray-200 rounded"></div>
                                            <div className="flex-1 h-10 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredData.length === 0 ? (
                            <div className="text-center py-12">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada data</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Tidak ditemukan warga yang sesuai dengan filter yang dipilih.
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchTerm("");
                                        setSelectedRT("all");
                                    }}
                                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Reset Filter
                                </button>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredData.map((item) => (
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

                    {/* Pagination */}
                    {filteredData.length > 0 && (
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <div className="text-sm text-gray-500">
                                    Menampilkan <span className="font-medium">{filteredData.length}</span> dari{" "}
                                    <span className="font-medium">{wargaList.length}</span> data
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 border rounded-md text-sm disabled:opacity-50" disabled>
                                        Previous
                                    </button>
                                    <button className="px-3 py-1 border rounded-md text-sm bg-blue-600 text-white">
                                        1
                                    </button>
                                    <button className="px-3 py-1 border rounded-md text-sm" disabled>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            <WargaDetailModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                data={selectedWarga}
            />

            <WargaAddModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleAddWarga}
            />
        </Authenticated>
    );
}
