<?php
    class FrontController{
        public function __construct(){

        }

        public function rutear(){
            $controller = (isset($_REQUEST['c'])) ? $_REQUEST['c'] : 'Inicio';
            $action = (isset($_REQUEST['a'])) ? $_REQUEST['a'] : 'mostrar';
            // strtolower — Convierte una cadena a minúsculas
            $controller = strtolower($controller);
            //ucwords — Convierte a mayúsculas el primer caracter de cada palabra de una cadena
            $controller = ucwords($controller) . "Controller";
            require_once "controller/" . $controller . ".php";
            $controller = new $controller();
            $controller ->$action();
        } 
    }
?> 