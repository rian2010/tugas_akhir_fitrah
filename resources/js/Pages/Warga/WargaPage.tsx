import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";


import { User, FileText } from "lucide-react";
import Header from "@/Components/Header";
import StatCard from "@/Components/StatCard";
import QuickActions from "@/Components/QuickAction";
import ActivityList from "@/Components/ActivityFeed";

type Props = {
    auth: {
        user: {
            name: string;
        };
    };
};

export default function WargaPage({ auth }: Props) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard Warga" />

            <div className="max-w-7xl mx-auto p-6 space-y-6">
                <Header name={auth.user.name} />

                <div className="grid md:grid-cols-2 gap-6">
                    <StatCard
                        title="Pendataan Penduduk"
                        description="Data Anda sudah terdaftar"
                        buttonText="Lihat Data"
                        icon={<User />}
                        color="bg-green-500"
                        href={route('data.index')}
                    />

                    <StatCard
                        title="Pengajuan Surat Aktif"
                        description="2 surat dalam proses"
                        buttonText="Lihat Status"
                        icon={<FileText />}
                        color="bg-orange-500"
                        href={route('surat.index')}
                    />
                </div>

                <QuickActions />
                <ActivityList />
            </div>
        </AuthenticatedLayout>
    );
}
