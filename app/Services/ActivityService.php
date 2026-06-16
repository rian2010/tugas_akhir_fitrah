<?php

namespace App\Services;

use App\Models\Warga;
use App\Models\Surat;
use Illuminate\Support\Collection;

class ActivityService
{
    /**
     * Get recent activities for a user
     */
    public function getRecentActivities(int $userId, int $limit = 10): Collection
    {
        $wargaActivities = $this->getWargaActivities($userId);
        $suratActivities = $this->getSuratActivities($userId);

        return $wargaActivities
            ->concat($suratActivities)
            ->sortByDesc('created_at')
            ->values()
            ->take($limit);
    }

    /**
     * Get count of pending surat for a user
     */
    public function getPendingSuratCount(int $userId): int
    {
        return Surat::where('user_id', $userId)
            ->where('status', 'pending')
            ->count();
    }

    /**
     * Check if user has warga data
     */
    public function hasWargaData(int $userId): bool
    {
        return Warga::where('user_id', $userId)->exists();
    }

    /**
     * Get warga activities
     */
    private function getWargaActivities(int $userId): Collection
    {
        return Warga::where('user_id', $userId)
            ->latest()
            ->take(5)
            ->get()
            ->map(fn($item) => [
                'id' => 'warga-' . $item->id,
                'type' => 'warga',
                'title' => 'Data Penduduk',
                'description' => $item->nama . ' telah didaftarkan',
                'created_at' => $item->created_at->toISOString(),
                'created_at_formatted' => $item->created_at->diffForHumans(),
            ]);
    }

    /**
     * Get surat activities
     */
    private function getSuratActivities(int $userId): Collection
    {
        return Surat::where('user_id', $userId)
            ->latest()
            ->take(5)
            ->get()
            ->map(fn($item) => [
                'id' => 'surat-' . $item->id,
                'type' => 'surat',
                'title' => 'Pengajuan Surat: ' . $item->jenis_surat,
                'description' => 'Status: ' . ucfirst($item->status),
                'created_at' => $item->created_at->toISOString(),
                'created_at_formatted' => $item->created_at->diffForHumans(),
                'status' => $item->status,
            ]);
    }
}
