<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Warga;

class DataWargaController extends Controller
{
    public function index()
    {
        $data = Warga::orderBy('no_kk')
            ->orderBy('nama_lengkap')
            ->get()
            ->map(fn($w) => [
                'id'            => $w->id,
                'no_kk'         => $w->no_kk,
                'nama_lengkap'  => $w->nama_lengkap,
                'nik'           => $w->nik,
                'tanggal_lahir' => $w->tanggal_lahir,
                'jenis_kelamin' => $w->jenis_kelamin,
                'agama'         => $w->agama,
                'email'         => $w->email,
                'nomor_telepon' => $w->nomor_telepon,
                'alamat_lengkap' => $w->alamat_lengkap,
                'rt'            => $w->rt,
                'rw'            => $w->rw,
                'kelurahan'     => $w->kelurahan,
                'file_kk'       => $w->file_kk  ? asset('storage/' . $w->file_kk)  : null,
                'file_ktp'      => $w->file_ktp ? asset('storage/' . $w->file_ktp) : null,
            ]);

        // Group by no_kk to form KK families
        $grouped = $data->groupBy('no_kk')->map(fn($anggota, $noKk) => [
            'noKK'    => $noKk,
            'alamat'  => $anggota->first()['alamat_lengkap'],
            'rt'      => $anggota->first()['rt'],
            'rw'      => $anggota->first()['rw'],
            'kelurahan' => $anggota->first()['kelurahan'],
            'anggota' => $anggota->values(),
        ])->values();

        return Inertia::render('RT/DataWarga/DataWargaPage', [
            'kkList' => $grouped,
        ]);
    }
}
