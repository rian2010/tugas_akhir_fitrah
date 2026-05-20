<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WargaController;
use App\Http\Controllers\RTController;
use App\Http\Controllers\SuratController;
use App\Http\Controllers\PendataanController;
use App\Http\Controllers\RiwayatPengajuanController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware(['auth', 'role:warga'])->prefix('warga')->group(function () {
    Route::controller(WargaController::class)->group(function () {
        Route::get('/', 'index')->name('warga.index');
    });

    Route::controller(PendataanController::class)->group(function () {
        Route::get('/data-warga', 'index')->name('data.index');
    });

    Route::controller(SuratController::class)->group(function () {
        Route::get('/pengajuan-surat', 'index')->name('surat.index');
    });

    Route::controller(RiwayatPengajuanController::class)->group(function () {
        Route::get('/riwayat-pengajuan', 'index')->name('riwayat.index');
    });
});

Route::middleware(['auth', 'role:rt'])->controller(RTController::class)->group(function () {
    Route::get('/rt', 'index')->name('rt.index');
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
