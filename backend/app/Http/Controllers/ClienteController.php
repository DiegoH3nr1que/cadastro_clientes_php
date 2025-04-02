<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Cliente;
use App\Models\ApiLog;

class ClienteController extends Controller
{
    public function index()
    {
        return response()->json(Cliente::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nome' => 'required|string',
            'email' => 'required|email|unique:clientes',
            'telefone' => 'nullable|string',
            'cep' => 'nullable|string|size:8',
        ]);

        $data['data_cadastro'] = now();

        $cliente = Cliente::create($data);

        if (!empty($data['cep'])) {
            $url = 'https://viacep.com.br/ws/' . $data['cep'] . '/json/';

            try {
                $response = Http::withOptions(['verify' => false])
                    ->retry(3, 2000)
                    ->timeout(10)
                    ->get($url);

                ApiLog::create([
                    'url' => $url,
                    'status_code' => $response->status(),
                    'response_body' => json_encode($response->json(), JSON_UNESCAPED_UNICODE),
                ]);
            } catch (\Exception $e) {
                Log::error('Erro na requisição ViaCEP: ' . $e->getMessage());
            }
        }

        return response()->json($cliente, 201);
    }
}
