<?php
    require_once "config/config.php";
    class UserController{
        public function __construct(){
            
        }

        public function registro(){
            require_once HEADER;
            require_once REGISTRO_USUARIO;
            require_once FOOTER;
        }
    }
?>