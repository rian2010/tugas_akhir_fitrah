type Props = {
    name: string;
};

export default function Header({ name }: Props) {
    return (
        <div>
            <h1 className="text-2xl font-bold">
                Selamat Datang, {name}
            </h1>
            <p className="text-gray-500">
                Kelola data dan layanan RT Anda dengan mudah
            </p>
        </div>
    );
}
