<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WargaController;
use App\Http\Controllers\DataWargaController;
use App\Http\Controllers\RTController;
use App\Http\Controllers\SuratController;
use App\Http\Controllers\PendataanController;
use App\Http\Controllers\RiwayatPengajuanController;
use App\Http\Controllers\VerifikasiSuratController;
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
        Route::post('/data-warga/', 'store')->name('warga.store');
        Route::delete('/data-warga/{warga}', 'destroy')->name('warga.destroy');
    });

    Route::controller(SuratController::class)->group(function () {
        Route::get('/pengajuan-surat', 'index')->name('surat.index');
        Route::post('/pengajuan-surat', 'store')->name('surat.store');
    });

    Route::controller(RiwayatPengajuanController::class)->group(function () {
        Route::get('/riwayat-pengajuan', 'index')->name('riwayat.index');
    });
});

Route::middleware(['auth', 'role:rt'])->prefix('rt')->group(function () {
    Route::controller(RTController::class)->group(function () {
        Route::get('/', 'index')->name('rt.index');
    });

    Route::controller(DataWargaController::class)->group(function () {
        Route::get('/data-warga', 'index')->name('data-warga.index');
    });

    Route::controller(VerifikasiSuratController::class)->group(function () {
        Route::get('/verifikasi-surat', 'index')->name('verifikasi-surat.index');
        Route::patch('/rt/verifikasi-surat/{id}/status', 'updateStatus')->name('rt.verifikasi-surat.update-status');
        Route::post('/rt/verifikasi-surat/{id}/approve', 'approve')->name('rt.verifikasi-surat.approve');
        Route::post('/rt/verifikasi-surat/{id}/reject',  'reject')->name('rt.verifikasi-surat.reject');
    });
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
