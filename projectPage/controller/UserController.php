<?php
    require_once "config/config.php";
    class UserController{
        public function __construct(){
            
        }

        public function registro(){
            if(!isset($_REQUEST['t'])&& empty($_REQUEST['t'])){
                $tipoDAO = new registroDAO();
                $ciudad = $tipoDAO ->consultarCiudad();
                
            require_once HEADER;
            require_once REGISTRO_USUARIO;
            require_once FOOTER;
            }
        }

        public function ciudad(){

        }
    }
?>