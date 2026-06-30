<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Warga;
use App\Models\Surat;
use App\Services\ActivityService;
use Carbon\Carbon;

class RTController extends Controller
{
    protected $activityService;

    public function __construct(ActivityService $activityService)
    {
        $this->activityService = $activityService;
    }

    public function index()
    {
        // Get current month and year
        $now = Carbon::now();
        $startOfMonth = $now->copy()->startOfMonth();
        $endOfMonth = $now->copy()->endOfMonth();
        $lastMonth = $now->copy()->subMonth();

        // Total Penduduk
        $totalPenduduk = Warga::count();

        // Pengajuan Menunggu (perlu diverifikasi)
        $pengajuanMenunggu = Surat::where('status', 'diproses')->count();

        // Surat Diproses
        $suratDiproses = Surat::where('status', 'diproses')->count();

        // Selesai Bulan Ini
        $selesaiBulanIni = Surat::where('status', 'selesai')
            ->whereBetween('updated_at', [$startOfMonth, $endOfMonth])
            ->count();

        // Selesai bulan lalu untuk perbandingan
        $selesaiBulanLalu = Surat::where('status', 'selesai')
            ->whereBetween('updated_at', [
                $lastMonth->copy()->startOfMonth(),
                $lastMonth->copy()->endOfMonth()
            ])
            ->count();

        // Perubahan selesai bulan ini vs bulan lalu
        $changeSelesai = $selesaiBulanIni - $selesaiBulanLalu;

        // Recent Applications (5 data terbaru)
        $recentApplications = Surat::with('warga')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($pengajuan) {
                $nama = $pengajuan->warga->nama
                    ?? $pengajuan->warga_data['nama_lengkap']
                    ?? 'Unknown';

                return [
                    'name' => $nama,
                    'type' => $pengajuan->jenis_surat,
                    'date' => $pengajuan->created_at->diffForHumans(),
                    'status' => $this->mapStatus($pengajuan->status),
                    'id' => $pengajuan->id,
                ];
            });

        // Get recent activities using ActivityService
        // Assuming you have authenticated user, for now we'll use a default user
        // In real implementation, use auth()->id()
        $userId = auth()->id() ?? 1; // Fallback to 1 if not authenticated

        $recentActivities = $this->activityService->getRecentActivities($userId, 5);

        // Get pending surat count
        $pendingSuratCount = $this->activityService->getPendingSuratCount($userId);

        // Check if user has warga data
        $hasWargaData = $this->activityService->hasWargaData($userId);

        // Stats untuk dashboard
        $stats = [
            'totalPenduduk' => $totalPenduduk,
            'pengajuanMenunggu' => $pengajuanMenunggu,
            'suratDiproses' => $suratDiproses,
            'selesaiBulanIni' => $selesaiBulanIni,
            'pendingSuratCount' => $pendingSuratCount,
        ];

        return Inertia::render('RT/RTPage', [
            'stats' => $stats,
            'recentApplications' => $recentApplications,
            'recentActivities' => $recentActivities,
            'changeSelesai' => $changeSelesai,
            'hasWargaData' => $hasWargaData,
            'user' => auth()->user(),
        ]);
    }

    /**
     * Map status dari database ke status yang ditampilkan di UI
     */
    private function mapStatus(string $status): string
    {
        return match ($status) {
            'pending', 'menunggu' => 'Menunggu',
            'processing', 'diproses' => 'Diproses',
            'completed', 'selesai' => 'Selesai',
            default => ucfirst($status),
        };
    }
}
