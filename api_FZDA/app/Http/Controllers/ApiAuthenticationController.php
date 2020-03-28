<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ApiAuthenticationController extends Controller
{
    public function __construct()
    {
        // $this->middleware('guest');
    }

    public function api_register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed',
        ]);
        if ($validator->fails()) {
            return response()->json(array(
                'success' => false,
                'errors' => $validator->getMessageBag()->toArray(),

            ), 400); // 400 being the HTTP code for an invalid request.
        } else {
            $user = new User([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);
            $user->save();
            return response()->json(array(
                'success' => true,
                'message' => 'Successfully created user!',
            ), 200);
        }
    }
}
