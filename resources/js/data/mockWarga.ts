import { KartuKeluarga } from "@/types/warga";

export const mockData: KartuKeluarga[] = [
    {
        id: "KK001",
        noKK: "3171000000000001",
        rt: "001",
        rw: "003",
        alamat: "Jl. Merdeka No. 12",
        status: "Tetap",
        anggota: [
            { nik: "3171234567890001", nama: "Budi Santoso", hubungan: "Kepala Keluarga", jenisKelamin: "Laki-laki", tanggalLahir: "1990-05-14", pekerjaan: "Pegawai Swasta" },
            { nik: "3171234567890010", nama: "Rina Santoso", hubungan: "Istri", jenisKelamin: "Perempuan", tanggalLahir: "1993-03-21", pekerjaan: "Ibu Rumah Tangga" },
            { nik: "3171234567890011", nama: "Kevin Santoso", hubungan: "Anak", jenisKelamin: "Laki-laki", tanggalLahir: "2015-08-10", pekerjaan: "Pelajar" },
        ],
    },
    {
        id: "KK002",
        noKK: "3171000000000002",
        rt: "002",
        rw: "003",
        alamat: "Jl. Kenanga No. 5",
        status: "Tetap",
        anggota: [
            { nik: "3171234567890002", nama: "Siti Rahayu", hubungan: "Kepala Keluarga", jenisKelamin: "Perempuan", tanggalLahir: "1985-11-22", pekerjaan: "Guru" },
            { nik: "3171234567890020", nama: "Fajar Rahayu", hubungan: "Anak", jenisKelamin: "Laki-laki", tanggalLahir: "2010-06-14", pekerjaan: "Pelajar" },
        ],
    },
    {
        id: "KK003",
        noKK: "3171000000000003",
        rt: "001",
        rw: "004",
        alamat: "Jl. Mawar No. 8",
        status: "Sementara",
        anggota: [
            { nik: "3171234567890003", nama: "Ahmad Fauzi", hubungan: "Kepala Keluarga", jenisKelamin: "Laki-laki", tanggalLahir: "1998-03-07", pekerjaan: "Wirausaha" },
            { nik: "3171234567890030", nama: "Laila Fauzi", hubungan: "Istri", jenisKelamin: "Perempuan", tanggalLahir: "2000-12-01", pekerjaan: "Ibu Rumah Tangga" },
        ],
    },
    {
        id: "KK004",
        noKK: "3171000000000004",
        rt: "003",
        rw: "003",
        alamat: "Jl. Melati No. 3",
        status: "Tetap",
        anggota: [
            { nik: "3171234567890004", nama: "Dewi Lestari", hubungan: "Kepala Keluarga", jenisKelamin: "Perempuan", tanggalLahir: "1992-08-30", pekerjaan: "Dokter" },
            { nik: "3171234567890040", nama: "Joko Lestari", hubungan: "Suami", jenisKelamin: "Laki-laki", tanggalLahir: "1989-04-17", pekerjaan: "Pegawai Negeri" },
            { nik: "3171234567890041", nama: "Aura Lestari", hubungan: "Anak", jenisKelamin: "Perempuan", tanggalLahir: "2018-01-05", pekerjaan: "Belum Bekerja" },
            { nik: "3171234567890042", nama: "Bagas Lestari", hubungan: "Anak", jenisKelamin: "Laki-laki", tanggalLahir: "2020-07-22", pekerjaan: "Belum Bekerja" },
        ],
    },
    {
        id: "KK005",
        noKK: "3171000000000005",
        rt: "002",
        rw: "004",
        alamat: "Jl. Anggrek No. 17",
        status: "Sementara",
        anggota: [
            { nik: "3171234567890005", nama: "Rizky Pratama", hubungan: "Kepala Keluarga", jenisKelamin: "Laki-laki", tanggalLahir: "2000-01-15", pekerjaan: "Mahasiswa" },
        ],
    },
    {
        id: "KK006",
        noKK: "3171000000000006",
        rt: "001",
        rw: "003",
        alamat: "Jl. Flamboyan No. 21",
        status: "Tetap",
        anggota: [
            { nik: "3171234567890006", nama: "Nurul Hidayah", hubungan: "Kepala Keluarga", jenisKelamin: "Perempuan", tanggalLahir: "1988-07-19", pekerjaan: "Pegawai Swasta" },
            { nik: "3171234567890060", nama: "Andi Hidayah", hubungan: "Suami", jenisKelamin: "Laki-laki", tanggalLahir: "1984-02-28", pekerjaan: "Wiraswasta" },
            { nik: "3171234567890061", nama: "Zahra Hidayah", hubungan: "Anak", jenisKelamin: "Perempuan", tanggalLahir: "2012-09-14", pekerjaan: "Pelajar" },
        ],
    },
    {
        id: "KK007",
        noKK: "3171000000000007",
        rt: "003",
        rw: "004",
        alamat: "Jl. Cempaka No. 9",
        status: "Tetap",
        anggota: [
            { nik: "3171234567890007", nama: "Hendra Gunawan", hubungan: "Kepala Keluarga", jenisKelamin: "Laki-laki", tanggalLahir: "1975-12-03", pekerjaan: "Pengusaha" },
            { nik: "3171234567890070", nama: "Maria Gunawan", hubungan: "Istri", jenisKelamin: "Perempuan", tanggalLahir: "1978-05-11", pekerjaan: "Ibu Rumah Tangga" },
            { nik: "3171234567890071", nama: "Reza Gunawan", hubungan: "Anak", jenisKelamin: "Laki-laki", tanggalLahir: "2003-03-30", pekerjaan: "Mahasiswa" },
        ],
    },
];
