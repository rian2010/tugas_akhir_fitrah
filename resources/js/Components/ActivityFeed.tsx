import { CheckCircle, Clock } from "lucide-react";

export default function ActivityList() {
    return (
        <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold mb-4">
                Aktivitas Terakhir
            </h2>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-green-100 text-green-500 p-2 rounded-lg">
                            <CheckCircle size={20} />
                        </div>
                        <div>
                            <p className="font-medium">
                                Surat Keterangan Domisili
                            </p>
                            <p className="text-sm text-gray-500">
                                Pengajuan disetujui
                            </p>
                        </div>
                    </div>
                    <span className="text-sm text-gray-400">
                        15 Des 2024
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-yellow-100 text-yellow-500 p-2 rounded-lg">
                            <Clock size={20} />
                        </div>
                        <div>
                            <p className="font-medium">
                                Surat Keterangan Usaha
                            </p>
                            <p className="text-sm text-gray-500">
                                Menunggu verifikasi
                            </p>
                        </div>
                    </div>
                    <span className="text-sm text-gray-400">
                        14 Des 2024
                    </span>
                </div>
            </div>
        </div>
    );
}
