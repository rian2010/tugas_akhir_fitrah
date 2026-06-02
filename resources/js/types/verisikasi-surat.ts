// types/verisikasi-surat.ts
export type SubmissionStatus = 'Menunggu' | 'Disetujui' | 'Ditolak';

export interface Submission {
    id: string;
    name: string;
    title: string;
    status: SubmissionStatus;
    date: string;
    description: string;
    additional_info?: string;
    notes?: string;
    submission_number?: string;
    letter_type_id?: string;
    created_at?: string;
    warga_data?: {
        nama_lengkap?: string;
        nik?: string;
        tempat_lahir?: string;
        tanggal_lahir?: string;
        jenis_kelamin?: string;
        agama?: string;
        pekerjaan?: string;
        alamat?: string;
        rt?: string;
        rw?: string;
    };
    actual_status?: string;
}
