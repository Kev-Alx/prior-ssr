<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use Illuminate\Support\Str;
use App\Http\Requests\StoreFaqRequest;
use App\Http\Requests\UpdateFaqRequest;
use Illuminate\Support\Facades\Redirect;

class FaqController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Faq::query()->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFaqRequest $request)
    {
        $fields = $request->validate([
            'slug' => 'required',
            'question' => 'required',
            'answer' => 'required'
        ]);
        // dd($fields);
        $fields['uuid'] = Str::uuid()->toString();
        // dd($fields);
        Faq::create($fields);

        return Redirect::back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Faq $faq)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Faq $faq)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFaqRequest $request, Faq $faq)
    {
        $fields = $request->validate([
            'slug' => 'required',
            'question' => 'required',
            'answer' => 'required'
        ]);
        $faq->update($fields);
        return Redirect::back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Faq $faq)
    {
        $faq->delete();
        return Redirect::route('type.index', ['type' => 'faq']);
    }
}
