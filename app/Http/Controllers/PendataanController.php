<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Warga;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class PendataanController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $noKk = Auth::user()->no_kk;
        return Inertia::render('Warga/DataWarga/Page', [

            'warga' => Warga::where('no_kk', $noKk)
                ->orderBy('nama_lengkap')
                ->get()
                ->map(fn($p) => [
                    ...$p->toArray(),
                    'file_kk'  => $p->file_kk  ? asset('storage/' . $p->file_kk)  : null,
                    'file_ktp' => $p->file_ktp ? asset('storage/' . $p->file_ktp) : null,
                ]),
            'authUser' => [
                'name' => $user->name,
                'email'        => $user->email,
                'no_kk'        => $user->no_kk,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'nama_lengkap'   => 'required|string|max:255',
                'nik'            => 'required|digits:16|unique:wargas,nik',
                'tanggal_lahir'  => 'required|date',
                'jenis_kelamin'  => 'required|in:Laki-laki,Perempuan',
                'agama'          => 'required|string',
                'email'          => 'required|email|unique:wargas,email',
                'nomor_telepon'  => 'required|string|regex:/^08\d{8,11}$/',
                'alamat_lengkap' => 'required|string',
                'rt'             => 'required|digits_between:1,3',
                'rw'             => 'required|digits_between:1,3',
                'kelurahan'      => 'required|string|max:100',
                'file_kk'        => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
                'file_ktp'       => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120',
            ]
        );

        $validated['user_id'] = Auth::id();

        $validated['no_kk']   = Auth::user()->no_kk;
        $validated['file_kk']  = $request->file('file_kk')->store('dokumen/kk', 'public');
        $validated['file_ktp'] = $request->file('file_ktp')->store('dokumen/ktp', 'public');

        Warga::create($validated);

        return redirect()->back()->with('success', 'Data warga berhasil disimpan.');
    }

    public function destroy(Warga $warga)
    {
        if ($warga->no_kk !== Auth::user()->no_kk) {
            abort(403);
        }

        Storage::disk('public')->delete($warga->file_kk);
        Storage::disk('public')->delete($warga->file_ktp);

        $warga->delete();

        return redirect()->back();
    }
}
