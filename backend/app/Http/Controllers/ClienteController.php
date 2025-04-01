<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente;

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
            'telefone' =>'nullable|string',
        ]);

        $data['data_cadastro'] = now();

        $cliente = Cliente::create($data);

        return response()->json($cliente, 201);
    }
}
