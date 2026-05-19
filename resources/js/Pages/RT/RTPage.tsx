import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function RTPage() {
    return (
        <Authenticated>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Halaman RT!
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
