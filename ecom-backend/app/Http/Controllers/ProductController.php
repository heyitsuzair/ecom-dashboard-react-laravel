<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    //
    function addProduct(Request $req)
    {
        $product = new Product;
        $product->name = $req->input('name');
        $product->price = $req->input('price');
        $product->description = $req->input('description');
        $product->img_path = $req->file('file')->store('products');
        $product->save();
        return $product;
    }
    function getProducts()
    {
        return Product::all();
    }
}