<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\ActivityService;
use Illuminate\Support\Facades\Log;

class WargaController extends Controller
{
    protected ActivityService $activityService;

    public function __construct(ActivityService $activityService)
    {
        $this->activityService = $activityService;
    }

    public function index()
    {
        try {
            $userId = auth()->id();

            if (!$userId) {
                return redirect()->route('login');
            }

            $activities = $this->activityService->getRecentActivities($userId);
            $pendingSuratCount = $this->activityService->getPendingSuratCount($userId);
            $hasWargaData = $this->activityService->hasWargaData($userId);

            return Inertia::render('Warga/WargaPage', [
                'activities' => $activities,
                'stats' => [
                    'pendingSuratCount' => $pendingSuratCount,
                    'hasWargaData' => $hasWargaData,
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('Error loading warga dashboard: ' . $e->getMessage());

            return Inertia::render('Warga/WargaPage', [
                'activities' => collect([]),
                'stats' => [
                    'pendingSuratCount' => 0,
                    'hasWargaData' => false,
                ],
                'error' => 'Failed to load dashboard data. Please try again.',
            ]);
        }
    }
}

