<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Warga;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
            'statusKeluargaOptions' => Warga::STATUS_KELUARGA,
            'statusKepemilikanOptions' => Warga::STATUS_KEPEMILIKAN,
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
                'status_keluarga'         => 'required|in:kepala_keluarga,istri,anak',
                'status_kepemilikan'         => 'required|in:sewa,milik_sendiri',
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

    public function update(Request $request, $id)
    {
        $warga = Warga::findOrFail($id);

        // Validate the request
        $validated = $request->validate([
            'nama_lengkap' => 'required|string|max:255',
            'nik' => 'required|string|size:16|unique:wargas,nik,' . $id,
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'agama' => 'required|string|in:Islam,Kristen,Katolik,Hindu,Buddha,Konghucu,Lainnya',
            'email' => 'required|email|unique:wargas,email,' . $id . '|unique:users,email,' . ($warga->user_id ?? 0),
            'status'         => 'required|in:kepala_keluarga,istri,anak',
            'status_kepemilikan'         => 'required|in:sewa,milik_sendiri',
            'nomor_telepon' => 'required|string|regex:/^08[0-9]{8,11}$/',
            'alamat_lengkap' => 'required|string',
            'rt' => 'required|string|max:3',
            'rw' => 'required|string|max:3',
            'kelurahan' => 'required|string|max:255',
            'file_kk' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120',
            'file_ktp' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120',
            'remove_kk' => 'nullable|in:true,false',
            'remove_ktp' => 'nullable|in:true,false',
        ]);

        try {
            DB::beginTransaction();

            // Handle KK file upload/removal
            if ($request->hasFile('file_kk')) {
                // Delete old file if exists
                if ($warga->file_kk && Storage::disk('public')->exists($warga->file_kk)) {
                    Storage::disk('public')->delete($warga->file_kk);
                }
                // Store new file
                $kkPath = $request->file('file_kk')->store('dokumen/kk', 'public');
                $warga->file_kk = $kkPath;
            } elseif ($request->input('remove_kk') === 'true') {
                // Remove file without replacing
                if ($warga->file_kk && Storage::disk('public')->exists($warga->file_kk)) {
                    Storage::disk('public')->delete($warga->file_kk);
                }
                $warga->file_kk = null;
            }

            // Handle KTP file upload/removal
            if ($request->hasFile('file_ktp')) {
                // Delete old file if exists
                if ($warga->file_ktp && Storage::disk('public')->exists($warga->file_ktp)) {
                    Storage::disk('public')->delete($warga->file_ktp);
                }
                // Store new file
                $ktpPath = $request->file('file_ktp')->store('dokumen/ktp', 'public');
                $warga->file_ktp = $ktpPath;
            } elseif ($request->input('remove_ktp') === 'true') {
                // Remove file without replacing
                if ($warga->file_ktp && Storage::disk('public')->exists($warga->file_ktp)) {
                    Storage::disk('public')->delete($warga->file_ktp);
                }
                $warga->file_ktp = null;
            }

            // Update warga data
            $warga->nama_lengkap = $validated['nama_lengkap'];
            $warga->nik = $validated['nik'];
            $warga->tanggal_lahir = $validated['tanggal_lahir'];
            $warga->jenis_kelamin = $validated['jenis_kelamin'];
            $warga->agama = $validated['agama'];
            $warga->email = $validated['email'];
            $warga->status_keluarga = $validated['status_keluarga'];
            $warga->status_kepemilikan = $validated['status_kepemilikan'];
            $warga->nomor_telepon = $validated['nomor_telepon'];
            $warga->alamat_lengkap = $validated['alamat_lengkap'];
            $warga->rt = $validated['rt'];
            $warga->rw = $validated['rw'];
            $warga->kelurahan = $validated['kelurahan'];
            $warga->save();

            // Update associated user if exists
            if ($warga->user) {
                $warga->user->update([
                    'name' => $validated['nama_lengkap'],
                    'email' => $validated['email'],
                ]);
            }

            DB::commit();

            return redirect()->back()->with('success', 'Data warga berhasil diupdate');
        } catch (\Exception $e) {
            DB::rollBack();

            // Delete newly uploaded files if something went wrong
            if (isset($kkPath) && Storage::disk('public')->exists($kkPath)) {
                Storage::disk('public')->delete($kkPath);
            }
            if (isset($ktpPath) && Storage::disk('public')->exists($ktpPath)) {
                Storage::disk('public')->delete($ktpPath);
            }

            return redirect()->back()->with('error', 'Gagal mengupdate data warga: ' . $e->getMessage());
        }
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
