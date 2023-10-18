<?php

namespace App\Http\Controllers;

use App\Models\Pizza;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PizzaController extends Controller
{
    public function index()
    {
        $pizzas = Pizza::all();

        return Inertia::render('Pizzas/All', ['pizzas' => $pizzas]);
    }

    public function edit(Pizza $pizza)
    {
        return Inertia::render('Pizzas/Edit', ['pizza' => $pizza]);
    }

    public function update(Pizza $pizza, Request $request)
    {
        $pizza->update([
            'status' => $request-> status,
        ]);
    }

    public function update(Pizza $pizza)
    {
    // Your update logic here
        $pizza->update(request()->all());

    return redirect()->route('pizzas.index'); // Redirect to the index page or another appropriate location.
    }
}
