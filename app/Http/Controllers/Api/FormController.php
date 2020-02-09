<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{DB, Auth};
use App\Models\{Form, Sheet};

class FormController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * @return object
     */
    public function index(): object
    {
        $forms = Form::join('users', 'forms.user_id', '=', 'users.id')
            ->leftJoin('sheets', 'forms.id', '=', 'sheets.form_id')
            ->groupBy('forms.id', 'name', 'created', 'username')
            ->select(
                'forms.id',
                'forms.name AS name',
                'forms.created_at AS created',
                'users.name AS username',
                'users.id AS userId',
                DB::raw('COUNT(sheets.id) AS countSheets')
            )
            ->get();

        return response()->json([
          'formItems' => $forms
        ]);
    }

    /**
     * @param Request $request
     * @return object
     */
    public function create(Request $request): object
    {
        $user = Auth::user();

        $form = Form::create([
            'user_id' => $user->id,
            'name' => $request->name
        ]);

        return response()->json([
          'formItem' => [
            'id' => $form->id,
            'name' => $form->name,
            'created' => $form->created_at,
            'countSheets' => 0,

            'username' => $user->name,
            'userId' => $user->id
          ]
        ]);
    }

    /**
     * @param int $form_id
     * @return object
     */

     public function showSheets(int $form_id): object
     {
        // load user
        $user = Auth::user();

        // if ($user->can('showSheets')) {

        // }

        // load form
        $sheets = Sheet::select('id', 'user_id', 'form_id', 'title', 'page', 'created_at')
            ->whereFormId($form_id)
            ->get();

        return response()->json([
            'sheets' => $sheets,
        ]);
     }
    
    /**
     * @param int $form_id
     * @return object
     */
    public function destroy(int $form_id): object
    {
        // remove the form
        $result = Form::whereId($form_id)->delete();

        // remove sheets from the form
        Sheet::whereFormId($form_id)->delete();

        return response()->json([
            'success' => $result
        ]);
    }
}
