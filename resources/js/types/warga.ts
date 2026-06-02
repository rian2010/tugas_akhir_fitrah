export interface Anggota {
    id: number;
    no_kk: string;
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
    file_kk: string | null;
    file_ktp: string | null;
}

export interface KartuKeluarga {
    id: string;        // ← use noKK as the id
    noKK: string;
    alamat: string;
    rt: string;
    rw: string;
    kelurahan: string;
    anggota: Anggota[];
}
