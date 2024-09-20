<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Carbon\Carbon;

class ArticleController extends Controller
{
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'slug' => 'required',
            'author' => 'required',
            'category_id' => 'required',
            'read_time' => 'required',
            'publish_date' => 'required',
            'main_image' => 'required',
            'content' => 'nullable',
            'main_featured' => 'required',
            'category_featured' => 'required',
            'is_published' => 'required'
        ]);

        if ($fields['main_featured'] == true) {
            Article::where('main_featured', true)->update(['main_featured' => false]);
        }
        if ($fields['category_featured'] == true) {
            Article::where('category_featured', true)->where('category_id', $fields['category_id'])->update(['category_featured' => false]);
        }
        $fields['publish_date'] = Carbon::parse($fields['publish_date']);
        $fields['uuid'] = Str::uuid()->toString();
        Article::create($fields);

        return Redirect::route('item.index', ['type' => 'article', 'itemId' => $fields['uuid']]);
    }

    public function update(Request $request, Article $article)
    {
        $fields = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'slug' => 'required',
            'author' => 'required',
            'category_id' => 'required',
            'read_time' => 'required',
            'main_image' => 'nullable',
            'publish_date' => 'required',
            'content' => 'nullable',
            'main_featured' => 'required',
            'category_featured' => 'required',
            'is_published' => 'required'
        ]);
        if ($fields['main_featured'] == true) {
            Article::where('main_featured', true)->where('uuid', '!=', $article['uuid'])->update(['main_featured' => false]);
        }
        if ($fields['category_featured'] == true) {
            Article::where('category_featured', true)->where('category_id', $fields['category_id'])->where('uuid', '!=', $article['uuid'])->update(['category_featured' => false]);
        }
        $fields['publish_date'] = Carbon::parse($fields['publish_date']);
        $article->update($fields);
        return Redirect::back()->with(
            'categories',
            Category::query()->get()
        );
    }

    public function destroy(Article $article)
    {
        $article->delete();
        return Redirect::route('type.index', ['type' => 'article']);
    }

}
