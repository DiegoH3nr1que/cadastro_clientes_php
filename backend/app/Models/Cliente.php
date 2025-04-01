<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $fillable = ['nome', 'email', 'telefone', 'data_cadastro'];

    protected $casts = [
        'data_cadastro' => 'datetime',
    ];
}
