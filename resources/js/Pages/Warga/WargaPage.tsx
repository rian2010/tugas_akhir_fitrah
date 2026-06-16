// resources/js/Pages/Warga/WargaPage.tsx
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { User, FileText, AlertCircle } from "lucide-react";
import Header from "@/Components/Header";
import StatCard from "@/Components/StatCard";
import ActivityList from "@/Components/ActivityFeed";
import { useState, useEffect } from "react";
import { PageProps } from "@/types/type";

export default function WargaPage({ auth, activities, stats, error }: PageProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [localError, setLocalError] = useState<string | null>(error || null);

    // Refresh data function (if needed)
    const refreshData = async () => {
        setIsLoading(true);
        try {
            // If you need to refresh data via API
            // await axios.get(route('warga.refresh'));
            // window.location.reload(); // Or use Inertia.visit
        } catch (err) {
            setLocalError('Failed to refresh data');
        } finally {
            setIsLoading(false);
        }
    };

    // Clear error after 5 seconds
    useEffect(() => {
        if (localError) {
            const timer = setTimeout(() => {
                setLocalError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [localError]);

    const statDescriptions = {
        warga: stats.hasWargaData
            ? "Data Anda sudah terdaftar"
            : "Belum ada data terdaftar",
        surat: stats.pendingSuratCount > 0
            ? `${stats.pendingSuratCount} surat dalam proses`
            : "Tidak ada surat dalam proses"
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard Warga" />

            <div className="max-w-7xl mx-auto p-6 space-y-6">
                <Header
                    name={auth.user.name}
                />

                {/* Error Alert */}
                {localError && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                        <div className="flex items-center">
                            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                            <p className="text-red-700">{localError}</p>
                            <button
                                onClick={() => setLocalError(null)}
                                className="ml-auto text-red-700 hover:text-red-900"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    <StatCard
                        title="Pendataan Penduduk"
                        description={statDescriptions.warga}
                        buttonText={stats.hasWargaData ? "Lihat Data" : "Daftarkan Data"}
                        icon={<User className="h-6 w-6" />}
                        color="bg-green-500"
                        href={route('data.index')}
                        isLoading={isLoading}
                    />

                    <StatCard
                        title="Pengajuan Surat Aktif"
                        description={statDescriptions.surat}
                        buttonText={stats.pendingSuratCount > 0 ? "Lihat Status" : "Ajukan Surat"}
                        icon={<FileText className="h-6 w-6" />}
                        color="bg-orange-500"
                        href={route('surat.index')}
                        isLoading={isLoading}
                        badge={stats.pendingSuratCount > 0 ? stats.pendingSuratCount : undefined}
                    />
                </div>

                {/* Activities Feed */}
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Aktivitas Terbaru
                        </h2>
                        {activities.length > 0 && (
                            <button
                                onClick={refreshData}
                                disabled={isLoading}
                                className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
                            >
                                {isLoading ? 'Memuat...' : 'Refresh'}
                            </button>
                        )}
                    </div>

                    <ActivityList
                        activities={activities}
                        emptyMessage="Belum ada aktivitas. Mulai dengan mendaftarkan data penduduk atau mengajukan surat."
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
