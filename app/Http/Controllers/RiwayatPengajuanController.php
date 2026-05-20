<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RiwayatPengajuanController extends Controller
{
    public function index()
    {
        return Inertia::render('Warga/Riwayat-Pengajuan/RiwayatPage');
    }
}
