<?php

use App\Models\Ad;
use App\Models\Faq;
use App\Models\User;
use Inertia\Inertia;
use App\Models\MainAd;
use App\Models\Article;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdController;
use Illuminate\Support\Str;
use App\Http\Controllers\FaqController;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Redirect;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;

Route::get('/', function () {

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'categories' => Category::all(),
        'articles' => Article::select('title', 'publish_date', 'description', 'category_id', 'slug', 'main_image')->where('main_featured', false)->where('publish_date', '<=', Date::now())->where('is_published', true)->with('category')->get(),
        'main_article' => Article::select('title', 'description', 'slug', 'main_image')->where('main_featured', true)->where('publish_date', '<=', Date::now())->first(),
        'ad' => MainAd::first()
    ]);
});


Route::get('/login', function () {
    return Inertia::render('AdminLogin');
})->name('login');

Route::get('/faq', function () {
    return Inertia::render('Faq', [
        'faqs' => Faq::orderBy("question", 'asc')->get()
    ]);
});

Route::get('/privacy-policy', function () {
    return Inertia::render('PrivacyPolicy');
});

Route::get('/ad', function () {
    return Inertia::render('Ad', [
        'ads' => Ad::query()->orderBy('created_at', 'desc')->get()
    ]);
})->name('ads');

Route::get('/admin', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth']);
Route::post('/admin/logout', function () {
    Auth::logout();
    Session::flush();
    return redirect('/login');
});

Route::get('/search', function (Request $request) {

    $validated = $request->validate([
        's' => 'nullable|string|max:255'
    ]);

    $query = $validated['s'] ?? '';
    $query = htmlspecialchars($query, ENT_QUOTES, 'UTF-8');
    $articles = Article::query()
        ->where('publish_date', '<=', Date::now())
        ->where('title', 'like', "%$query%")
        ->where('is_published', true)
        ->orWhere('content', 'like', "%$query%")
        ->with('category')
        ->get();
    return Inertia::render('SearchArticle', [
        'articles' => $articles,
    ]);
});

Route::get('/category/{category}', function ($category) {
    if (!preg_match('/^[a-zA-Z0-9-]+$/', $category)) {
        abort(404);
    }
    $cat = Category::where('name', 'like', "%$category%")->first();
    return Inertia::render('Category', [
        'articles' => Article::select('title', 'publish_date', 'description', 'category_id', 'slug', 'main_image')->where('publish_date', '<=', Date::now())->where('is_published', true)->where('category_featured', false)->where('category_id', $cat['uuid'])->with('category')->get(),
        'main_article' => Article::select('title', 'description', 'slug', 'main_image', 'author')->where('publish_date', '<=', Date::now())->where('category_featured', true)->where('category_id', $cat['uuid'])->first(),
        'cat' => $category
    ]);
});

Route::get('/{slug}', function ($slug) {
    if (!preg_match('/^[a-zA-Z0-9-]+$/', $slug)) {
        abort(404);
    }
    $article = Article::where('slug', $slug)->where('publish_date', '<=', Date::now())->with('category')->firstOrFail();
    return Inertia::render('Article', [
        'article' => $article,
        'related' => Article::where('category_id', $article['category_id'])->where('uuid', '!=', $article['uuid'])->with('category')->orderBy('created_at')->get()
    ]);
})->where('slug', '^[a-zA-Z0-9-]+$');

Route::post(
    '/admin/upload',
    function (Request $request) {
        // dd($request);
        $valid = $request->validate([
            'file' => 'required|file|mimes:png,jpg,jpeg'
        ]);
        // Dapatkan objek file dari request
        $file = $valid['file'];

        // Simpan file ke dalam folder 'uploads'
        $path = $file->storePublicly('uploads', 'public');

        // Berikan respons dengan path file yang disimpan
        return response()->json(['path' => $path]);
    }
)->middleware(['auth']);

Route::get('/admin/{type}', function (Request $request, $type) {
    if (!preg_match('/^[a-zA-Z0-9-]+$/', $type)) {
        abort(404);
    }
    $items = [];
    if ($type == 'category') {
        $items = Category::query()->select('uuid', 'name')->orderBy('updated_at', 'desc')->get();
    } else if ($type === 'article') {
        $items = Article::query()->select('uuid', 'title', 'is_published', 'main_featured', 'category_featured')->orderBy('updated_at', 'desc')->get();
    } else if ($type === 'faq') {
        $items = Faq::query()->select('uuid', 'question')->orderBy('updated_at', 'desc')->get();
    } else if ($type === 'ads') {
        $items = Ad::all();
    } else if ($type === 'user') {
        $items = User::all();
    } else {
        return Inertia::render('NotFound');
    }
    return Inertia::render('Dashboard', [
        'items' => $items,
    ]);
})->where('type', '^[a-zA-Z0-9-]+$')->middleware(['auth'])->name('type.index');

Route::get('/admin/{type}/{itemId}', function (Request $request, $type, $itemId) {
    if (!preg_match('/^[a-zA-Z0-9-]+$/', $type)) {
        abort(404);
    }
    $items = [];
    $item = null;
    if ($type == 'category') {
        $items = Category::query()->select('uuid', 'name')->orderBy('updated_at', 'desc')->get();
        $item = Category::query()->where('uuid', $itemId)->first();
    } else if ($type === 'article') {
        $items = Article::query()->select('uuid', 'title', 'is_published', 'main_featured', 'category_featured')->orderBy('updated_at', 'desc')->get();
        $item = Article::query()->where('uuid', $itemId)->first();
    } else if ($type === 'faq') {
        $items = Faq::query()->select('uuid', 'question')->orderBy('updated_at', 'desc')->get();
        $item = Faq::query()->where('uuid', $itemId)->first();
    } else if ($type === 'ads') {
        $items = Ad::query()->select('uuid', 'name')->orderBy('updated_at', 'desc')->get();
        if ($itemId === 'main') {
            $item = MainAd::all();
        } else {
            $item = Ad::query()->where('uuid', $itemId)->first();
        }
    } else if ($type === 'user') {
        $items = User::query()->select('id', 'name')->orderBy('updated_at')->get();
        $item = User::query()->where('id', $itemId)->first();
    } else {
        return Inertia::render('NotFound');
    }
    return Inertia::render('Dashboard', [
        'item' => $item,
        'items' => $items,
        'categories' => Category::all(),
    ]);
})->where('type', '^[a-zA-Z0-9-]+$')->middleware(['auth'])->name('item.index');

Route::middleware('auth')->group(function () {
    Route::post('/category', [CategoryController::class, 'store'])->name('category.store');
    Route::put('/category/{category}', [CategoryController::class, 'update'])->name('category.update');
    Route::delete('/category/{category}', [CategoryController::class, 'destroy'])->name('category.destroy');

    Route::post('/article', [ArticleController::class, 'store'])->name('article.store');
    Route::put('/article/{article}', [ArticleController::class, 'update'])->name('article.update');
    Route::delete('/article/{article}', [ArticleController::class, 'destroy'])->name('article.destroy');

    Route::post('/faq', [FaqController::class, 'store'])->name('faq.store');
    Route::put('/faq/{faq}', [FaqController::class, 'update'])->name('faq.update');
    Route::delete('/faq/{faq}', [FaqController::class, 'destroy'])->name('faq.destroy');

    Route::post('/ad', [AdController::class, 'store'])->name('ad.store');
    Route::put('/ad/{ad}', [AdController::class, 'update'])->name('ad.update');
    Route::delete('/ad/{ad}', [AdController::class, 'destroy'])->name('ad.destroy');

    Route::post('/user', [UserController::class, 'store'])->name('user.store');
    Route::put('/user/{user}', [UserController::class, 'update'])->name('user.update');
    Route::delete('/user/{user}', [UserController::class, 'destroy'])->name('user.destroy');


    Route::put('/mainad', function (Request $request) {
        $fields = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'link' => 'required',
            'image' => 'required'
        ]);

        $mainad = MainAd::first();
        if ($mainad) {
            $mainad->update($fields);
        } else {
            $fields['uuid'] = Str::uuid()->toString();
            MainAd::create($fields);
        }
        return Redirect::back();
    })->name('faq.update');
});

Route::post('/admin/session', function (Request $request) {
    $valid = $request->validate([
        'email' => 'required|email'
    ]);

    $email = $valid['email'];
    Session::put('email', $email);
    $user = User::where('email', $email)->first();
    if ($user) {
        Auth::login($user);
        return redirect('/admin');
    } else {
        return redirect('/login');
    }
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__ . '/auth.php';
