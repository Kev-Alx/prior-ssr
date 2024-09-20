<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $primaryKey = 'uuid';

    public $incrementing = false;
    protected $fillable = [
        'uuid',
        'name',
        'description'
    ];

    public static function validateRules()
    {
        return [
            'name' => 'required|string',
            'description' => 'required|string'
        ];
    }

    public static function validationMessages()
    {
        return [
            'name.required' => 'Name is required',
            'description.required' => 'Description is required'
        ];
    }

    public function resourceData($request)
    {
        return ModelUtils::filterNullValues([
            'name' => $request->name,
            'description' => $request->description
        ]);
    }
    public function articles()
    {
        return $this->hasMany(Article::class);
    }
}
