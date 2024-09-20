<?php

namespace App\Http\Controllers;

use App\Models\Ad;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Redirect;

class AdController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'main_image' => 'nullable',
            'link' => 'required',
        ]);
        $fields['uuid'] = Str::uuid()->toString();
        Ad::create($fields);

        return Redirect::route('item.index', ['type' => 'ads', 'itemId' => $fields['uuid']]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Ad $ad)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ad $ad)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ad $ad)
    {
        $fields = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'main_image' => 'nullable',
            'link' => 'required',
        ]);
        $ad->update($fields);
        return Redirect::back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ad $ad)
    {
        $ad->delete();
        return Redirect::route('type.index', ['type' => 'ads']);
    }
}
