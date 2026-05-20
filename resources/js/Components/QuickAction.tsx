import { FileText } from "lucide-react";

export default function QuickActions() {
    return (
        <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold mb-4">Aksi Cepat</h2>

            <div className="grid md:grid-cols gap-4">
                <div className="flex items-center gap-4 border p-4 rounded-xl hover:bg-gray-50 cursor-pointer">
                    <div className="bg-blue-100 text-blue-500 p-3 rounded-lg">
                        <FileText />
                    </div>
                    <div>
                        <p className="font-medium">Ajukan Surat</p>
                        <p className="text-sm text-gray-500">
                            Buat pengajuan baru
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
