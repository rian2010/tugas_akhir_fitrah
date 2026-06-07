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
}
