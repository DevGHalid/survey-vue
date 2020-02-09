<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Sheet;

class SheetController extends Controller
{
  public function __construct()
  {
    $this->middleware('auth:api');
  }

  /**
   * @return Request $request
   * @return object
   */
  public function create(Request $request)
  {
    $user = Auth::user();

    $sheet = Sheet::create([
      'user_id' => $user->id,
      'form_id' => $request->form_id,
      'title' => $request->title,
      'page' => 1
    ]);

    return response()->json([
      'success' => true,
      'sheet' => [
        'user_id' => $sheet->user_id,
        'form_id' => $sheet->form_id,
        'title' => $sheet->title,
        'created_at' => $sheet->created_at
      ]
    ]);
  }
}
