export type Gender = "Laki-laki" | "Perempuan";
export type StatusWarga = "Tetap" | "Sementara";
export type HubunganKeluarga =
    | "Kepala Keluarga"
    | "Istri"
    | "Suami"
    | "Anak"
    | "Orang Tua"
    | "Saudara"
    | "Lainnya";

export interface AnggotaKeluarga {
    nik: string;
    nama: string;
    hubungan: HubunganKeluarga;
    jenisKelamin: Gender;
    tanggalLahir: string;
    pekerjaan: string;
}

export interface KartuKeluarga {
    id: string;
    noKK: string;
    rt: string;
    rw: string;
    alamat: string;
    status: StatusWarga;
    anggota: AnggotaKeluarga[];
}
