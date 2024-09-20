<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MainAd extends Model
{
    use HasFactory;
    protected $primaryKey = 'uuid';

    public $incrementing = false;
    protected $table = 'main_ad';
    protected $fillable = [
        'uuid',
        'title',
        'description',
        'link',
        'image',
    ];
}
