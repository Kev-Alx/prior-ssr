<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;



class CategoryController extends Controller
{
    //
    public function index()
    {
        return Category::query()->get();
    }
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required',
            'description' => 'required'
        ]);
        // dd($fields);
        $fields['uuid'] = Str::uuid()->toString();
        // dd($fields);
        Category::create($fields);

        return Redirect::back();
    }

    public function update(Request $request, Category $category)
    {
        $fields = $request->validate([
            'name' => 'required',
            'description' => 'required'
        ]);
        $category->update($fields);
        return Redirect::back();
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return Redirect::route('type.index', ['type' => 'category']);
    }
}
