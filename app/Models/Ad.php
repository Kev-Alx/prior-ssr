<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ad extends Model
{
    use HasFactory;
    protected $primaryKey = 'uuid';

    public $incrementing = false;
    protected $table = 'ads';
    protected $fillable = [
        'uuid',
        'name',
        'main_image',
        'description',
        'link',
    ];
}
