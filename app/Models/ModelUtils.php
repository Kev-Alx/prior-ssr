<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelUtils extends Model
{
    use HasFactory;
    public static function filterNullValues(array $data) : array
    {
        return array_filter($data, function ($value) {
            return $value !== null;
        });
    }

}
