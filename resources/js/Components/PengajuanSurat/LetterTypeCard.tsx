interface LetterTypeCardProps {
    title: string;
    description: string;
    onClick: () => void;
}

export default function LetterTypeCard({
    title,
    description,
    onClick
}: LetterTypeCardProps) {

    const getIcon = () => {
        const baseClass = "w-7 h-7";

        if (title.includes("Domisili")) {
            return <svg className={`${baseClass} text-blue-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2 7-7 7 7M5 10v10h14V10" />
            </svg>;
        }

        if (title.includes("Usaha")) {
            return <svg className={`${baseClass} text-emerald-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13H3m18 0V8a2 2 0 00-2-2H5a2 2 0 00-2 2v5m18 0v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5" />
            </svg>;
        }

        if (title.includes("SKCK")) {
            return <svg className={`${baseClass} text-purple-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M12 2a10 10 0 00-7 3c0 6 4 10 7 11 3-1 7-5 7-11a10 10 0 00-7-3z" />
            </svg>;
        }

        if (title.includes("Keluarga")) {
            return <svg className={`${baseClass} text-orange-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 14a4 4 0 10-8 0m-4 6v-1a4 4 0 014-4h8a4 4 0 014 4v1" />
            </svg>;
        }

        return <svg className={`${baseClass} text-gray-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6M6 2h9l5 5v15a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" />
        </svg>;
    };

    return (
        <button
            onClick={onClick}
            className="
                group relative w-full text-left rounded-2xl
                bg-white/80 backdrop-blur-sm
                border border-gray-200
                shadow-sm hover:shadow-xl
                transition-all duration-300
                hover:-translate-y-1
                overflow-hidden
            "
        >
            {/* Gradient Accent */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />

            <div className="p-6">
                <div className="flex gap-4">

                    {/* Icon */}
                    <div className="
                        flex items-center justify-center
                        w-12 h-12 rounded-xl
                        bg-gradient-to-br from-gray-50 to-gray-100
                        group-hover:from-blue-50 group-hover:to-indigo-50
                        transition
                        shadow-inner
                    ">
                        {getIcon()}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <h3 className="
                            text-lg font-semibold text-gray-900
                            group-hover:text-blue-600 transition
                        ">
                            {title}
                        </h3>

                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="
                    flex items-center justify-between
                    mt-5 pt-4 border-t border-gray-100
                ">

                    {/* Arrow */}
                    <div className="
                        flex items-center justify-center
                        w-9 h-9 rounded-full
                        bg-gray-100 group-hover:bg-blue-100
                        transition
                    ">
                        <svg
                            className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </button>
    );
}
