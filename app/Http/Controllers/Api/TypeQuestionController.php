<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TypeQuestion;

class TypeQuestionController extends Controller
{
  public function __construct()
  {
    $this->middleware('auth:api');
  }

  /**
   * @return object
   */
  public function index()
  {
    $type_questions = TypeQuestion::select('id', 'name', 'slug', 'icon', 'question')->get(); 

    return response()->json([
      'questions' => $type_questions
    ]);
  }
}
