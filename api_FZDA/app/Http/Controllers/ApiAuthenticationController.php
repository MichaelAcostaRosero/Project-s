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
        // {'name':names,'email':correo,'password':clave,'password_confirm':claveConfirm,
        // 'address':direccion,'local':isLocal,'descripcion':descripcion,'trabajos':jobs,
        // 'contactos':contact,'logo':logo}

        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            // 'email' => 'required|string|email|unique:users',
            // 'password' => 'required|string',
            // 'descripcion' => 'required|string|max:1000',
            // 'address' => 'required|string|max:150',
            // 'local' => 'required|boolean|max:150',
            'logo' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            // 'descripcion' => 'required|string|max:1000',
        ]);
        if ($validator->fails())
        {
            return response()->json(array(
                'success' => false,
                'errors' => $validator->getMessageBag()->toArray(),
            )); 
        } 
        else
        {
         if ($request->hasFile('logo')) {
              $foto = $request->file('logo');
              $namefile = time().$foto->getClientOriginalName();
              $foto->move(public_path().'/imagenes/logo/', $namefile);
            }
            $user = new User([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);
            // $user->save();
            return response()->json(array(
                'success' => true,
                'message' => 'Successfully created user!',
            ));
        }
    }
}
