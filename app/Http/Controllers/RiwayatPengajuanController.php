<?php

namespace App\Http\Controllers;

use App\Models\Surat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RiwayatPengajuanController extends Controller
{
    public function index()
    {
        // FIX: Fetch submissions for the logged-in user by user_id, not id
        $submissions = Surat::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($surat) {
                // Decode warga_data if it's stored as JSON
                $wargaData = is_string($surat->warga_data)
                    ? json_decode($surat->warga_data, true)
                    : $surat->warga_data;

                // Map status from database to frontend status (updated for your status values)
                $statusMap = [
                    'pending' => 'diterima',
                    'setuju' => 'selesai',  // When admin approves, it goes to verifikasi
                    'tolak' => 'ditolak',
                ];

                // Map letter type to display name
                $letterTypeMap = [
                    'domisili' => 'Surat Keterangan Domisili',
                    'usaha' => 'Surat Keterangan Usaha',
                    'skck' => 'Surat Pengantar SKCK',
                    'keluarga' => 'Surat Keterangan Keluarga'
                ];

                // Calculate estimasi selesai (3 days after submission)
                $estimasiSelesai = $surat->created_at->copy()->addDays(3);

                return [
                    'id' => $surat->id,
                    'nomorPengajuan' => $surat->submission_number,
                    'jenisSurat' => $letterTypeMap[$surat->letter_type_id] ?? $surat->letter_type_id,
                    'keperluan' => $surat->purpose,
                    'tanggalDiajukan' => $surat->created_at->format('d M Y'),
                    'estimasiSelesai' => $estimasiSelesai->format('d M Y'),
                    'status' => $statusMap[$surat->status] ?? 'diterima',
                    'pesanAdmin' => $this->getAdminMessage($surat->status),
                    'fileSurat' => $surat->file_path ?? null,
                    // Warga data for letter preview
                    'namaLengkap' => $wargaData['nama_lengkap'] ?? '',
                    'nik' => $wargaData['nik'] ?? '',
                    'tempatLahir' => $wargaData['tempat_lahir'] ?? '',
                    'tanggalLahir' => $wargaData['tanggal_lahir'] ?? '',
                    'jenisKelamin' => $wargaData['jenis_kelamin'] ?? '',
                    'agama' => $wargaData['agama'] ?? '',
                    'pekerjaan' => $wargaData['pekerjaan'] ?? '',
                    'alamat' => $wargaData['alamat'] ?? '',
                    'rt' => $wargaData['rt'] ?? '',
                    'rw' => $wargaData['rw'] ?? '',
                ];
            });

        return Inertia::render('Warga/Riwayat-Pengajuan/RiwayatPage', [
            'submissions' => $submissions
        ]);
    }

    private function getAdminMessage($status)
    {
        $messages = [
            'pending' => 'Pengajuan Anda telah diterima dan akan segera diverifikasi oleh Admin RT',
            'setuju' => 'Pengajuan Anda telah disetujui dan sedang dalam proses pembuatan surat',
            'tolak' => 'Pengajuan ditolak. Silakan hubungi admin RT untuk informasi lebih lanjut',
        ];

        return $messages[$status] ?? 'Pengajuan sedang diproses';
    }
}

