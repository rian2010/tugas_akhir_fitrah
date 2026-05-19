<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WargaController extends Controller
{
    public function index()
    {
        return Inertia::render('Warga/WargaPage');
    }
}
