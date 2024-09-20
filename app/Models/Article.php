<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;
    use HasUuids;
    // protected $table = 'articles';
    protected $primaryKey = 'uuid';
    public $incrementing = false;
    protected $fillable = [
        'title',
        'description',
        'category_id',
        'author',
        'slug',
        'read_time',
        'main_image',
        'publish_date',
        'content',
        'is_published',
        'admin_id',
        'main_featured',
        'category_featured'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    public static function validateRules()
    {
        return [
            'title' => 'required|string',
            'description' => 'required|string',
            'category_id' => 'required|uuid|exists:categories,uuid',
            'author' => 'required|string',
            'slug' => 'required|string',
            'read_time' => 'required|integer',
            'publish_date' => 'required|date',
            'content' => 'required|string',
            'is_published' => 'required|boolean'
        ];
    }


    public static function validationMessages()
    {
        return [
            'title.required' => 'Title is required',
            'description.required' => 'Description is required',
            'category_id.required' => 'Category is required',
            'author.required' => 'Author is required',
            'slug.required' => 'Slug is required',
            'read_time.required' => 'Read time is required',
            'publish_date.required' => 'Publish date is required',
            'content.required' => 'Content is required',
            'is_published.required' => 'Is published is required'
        ];
    }

    public function resourceData($request)
    {
        return ModelUtils::filterNullValues([
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'category_id' => $this->category_id,
            'author' => $this->author,
            'slug' => $this->slug,
            'read_time' => $this->read_time,
            'publish_date' => $this->publish_date,
            'content' => $this->content,
            'is_published' => $this->is_published
        ]);
    }

    public function controller()
    {
        return 'App\Http\Controllers\ArticleController';
    }

    public function relations()
    {
        return [
            'admins',
            'category'
        ];
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

}
