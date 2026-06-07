<?php

namespace App\Http\Controllers;

use App\Models\Surat;
use App\Models\Warga;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SuratController extends Controller
{
    public function index()
    {
        // Get current user's warga data
        $wargas = Warga::where('user_id', Auth::id())->get();



        // Letter types configuration
        $letterTypes = [
            [
                'id' => 'domisili',
                'title' => 'Surat Keterangan Domisili',
                'description' => 'Surat keterangan tempat tinggal untuk keperluan administrasi, sekolah, atau pekerjaan',
                'estimatedTime' => '1-2 Hari Kerja',
                'type' => 'domisili'
            ],
            [
                'id' => 'usaha',
                'title' => 'Surat Keterangan Usaha',
                'description' => 'Surat keterangan untuk membuka usaha atau keperluan perizinan usaha',
                'estimatedTime' => '2-3 Hari Kerja',
                'type' => 'usaha'
            ],
            [
                'id' => 'skck',
                'title' => 'Surat Pengantar SKCK',
                'description' => 'Surat pengantar untuk pembuatan Surat Keterangan Catatan Kepolisian',
                'estimatedTime' => '1 Hari Kerja',
                'type' => 'skck'
            ],
            [
                'id' => 'keluarga',
                'title' => 'Surat Keterangan Keluarga',
                'description' => 'Surat keterangan tentang susunan anggota keluarga',
                'estimatedTime' => '1-2 Hari Kerja',
                'type' => 'keluarga'
            ],
        ];


        return Inertia::render('Warga/PengajuanSurat/Page', [
            'letterTypes' => $letterTypes,
            'authUser' => Auth::user(),
            'wargas' => $wargas // Pass warga data to frontend
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'letter_type_id' => 'required|string',
            'purpose' => 'required|string|min:10',
            'additional_info' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $warga = Warga::where('user_id', Auth::id())->first();

        if (!$warga) {
            return response()->json([
                'message' => 'Data penduduk tidak ditemukan. Silakan lengkapi profil Anda terlebih dahulu.'
            ], 400);
        }

        $submission = Surat::create([
            'letter_type_id' => $request->letter_type_id,
            'purpose' => $request->purpose,
            'additional_info' => $request->additional_info,
            'notes' => $request->notes,
            'user_id' => Auth::id(),
            'warga_id' => $warga->id,
            'status' => 'pending',
            'submission_number' => 'SURAT-' . date('Ymd') . '-' . rand(1000, 9999),
            // Don't use json_encode() - Laravel will handle it automatically
            'warga_data' => [  // Just pass array, Laravel will JSON encode
                'nama_lengkap' => $warga->nama_lengkap,
                'nik' => $warga->nik,
                'tempat_lahir' => $warga->tempat_lahir,
                'tanggal_lahir' => $warga->tanggal_lahir,
                'jenis_kelamin' => $warga->jenis_kelamin,
                'agama' => $warga->agama,
                'pekerjaan' => $warga->pekerjaan,
                'alamat' => $warga->alamat,
                'rt' => $warga->rt,
                'rw' => $warga->rw,
            ]
        ]);

        return redirect()->back()->with('success', 'Pengajuan surat berhasil dikirim!');
    }
    public function history()
    {
        $submissions = Surat::with('warga')
            ->where('id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($submissions);
    }
}
