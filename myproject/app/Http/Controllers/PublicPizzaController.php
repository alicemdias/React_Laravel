<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Pizza;
use Inertia\Inertia;
use Inertia\Response;

class PublicPizzaController extends Controller

{
    public function show(Pizza $pizza): Response

    {
        return Inertia::render('Pizzas/Show', [
            'pizza' => $pizza
        ]);
    }
}