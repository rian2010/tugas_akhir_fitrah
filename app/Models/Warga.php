<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Warga extends Model
{
    protected $fillable = [
        'user_id',
        'nama_lengkap',
        'no_kk',
        'nik',
        'tanggal_lahir',
        'jenis_kelamin',
        'agama',
        'email',
        'status_keluarga',
        'status_kepemilikan',
        'nomor_telepon',
        'alamat_lengkap',
        'rt',
        'rw',
        'kelurahan',
        'file_kk',
        'file_ktp',
    ];

    public function kepalaKeluarga()
    {
        return $this->belongsTo(User::class, 'no_kk', 'no_kk');
    }

    public const STATUS_KELUARGA = [
        'kepala keluarga' => 'Kepala Keluarga',
        'istri' => 'Istri',
        'anak' => 'Anak',
    ];

    public const STATUS_KEPEMILIKAN = [
        'milik sendiri' => 'Milik Sendiri',
        'kontrak' => 'Kontrak',
        'numpang' => 'Numpang',
    ];
}
