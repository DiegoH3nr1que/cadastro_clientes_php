<?php

namespace App\Http\Controllers;

use App\Models\ApiLog;

class ApiExternalController extends Controller
{
    public function index()
    {
        return response()->json(ApiLog::all());
    }
}
