<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index($request)
    {
        $user = $request->user();

        if ($user->hasRole('rt')) {
            return Inertia::render('RT/RTPage');
        }

        if ($user->hasRole('warga')) {
            return Inertia::render('Warga/WargaPage');
        }

        return Inertia::render('dashoard');
    }
}
