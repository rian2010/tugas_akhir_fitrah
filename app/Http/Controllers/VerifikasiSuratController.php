<?php

namespace App\Http\Controllers;

use App\Models\Surat;
use App\Models\Warga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VerifikasiSuratController extends Controller
{
    public function index()
    {
        // Fetch all submissions with warga data
        $submissions = Surat::with('warga')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($surat) {
                // Decode warga_data if it's stored as JSON
                $wargaData = is_string($surat->warga_data)
                    ? json_decode($surat->warga_data, true)
                    : $surat->warga_data;

                // Map status from database to frontend status
                $statusMap = [
                    'pending' => 'Menunggu',
                    'setuju' => 'Disetujui',
                    'tolak' => 'Ditolak'
                ];

                // Map letter type to display name
                $letterTypeMap = [
                    'domisili' => 'Surat Keterangan Domisili',
                    'usaha' => 'Surat Keterangan Usaha',
                    'skck' => 'Surat Pengantar SKCK',
                    'keluarga' => 'Surat Keterangan Keluarga'
                ];

                return [
                    'id' => (string) $surat->id,
                    'name' => $wargaData['nama_lengkap'] ?? $surat->warga->nama_lengkap ?? 'Unknown',
                    'title' => $letterTypeMap[$surat->letter_type_id] ?? $surat->letter_type_id,
                    'status' => $statusMap[$surat->status] ?? 'Menunggu',
                    'date' => $surat->created_at->format('d M Y'),
                    'description' => $surat->purpose,
                    'additional_info' => $surat->additional_info,
                    'notes' => $surat->notes,
                    'submission_number' => $surat->submission_number,
                    'letter_type_id' => $surat->letter_type_id,
                    'created_at' => $surat->created_at,
                    'warga_data' => $wargaData,
                    'actual_status' => $surat->status, // Keep original status for updating
                ];
            });

        return Inertia::render('RT/VerifikasiSurat/Page', [
            'submissions' => $submissions
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:Menunggu,Disetujui,Ditolak'
        ]);

        $surat = Surat::findOrFail($id);

        // Map frontend status to database status
        $statusMap = [
            'Menunggu' => 'pending',
            'Disetujui' => 'setuju',
            'Ditolak' => 'tolak'
        ];

        $newStatus = $statusMap[$request->status];
        $surat->status = $newStatus;
        $surat->save();

        return redirect()->back()->with('success', 'Status pengajuan berhasil diupdate');
    }

    public function approve($id)
    {
        $surat = Surat::findOrFail($id);
        $surat->status = 'setuju';
        $surat->save();

        return redirect()->back()->with('success', 'Pengajuan disetujui');
    }

    public function reject($id)
    {
        $surat = Surat::findOrFail($id);
        $surat->status = 'tolak';
        $surat->save();

        return redirect()->back()->with('success', 'Pengajuan ditolak');
    }
}

