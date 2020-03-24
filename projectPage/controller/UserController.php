<?php
    require_once "config/config.php";
    require_once "model/DAO/registroDAO.php";
        class UserController{
        public function __construct(){
            
        }

        public function registro(){
            if(!isset($_REQUEST['t']) && empty($_REQUEST['t'])){
                $tipoDAO = new registroDAO();
                $ciudades = $tipoDAO ->consultarCiudad();
                
            require_once HEADER;
            require_once "view/usuarios/registroView.php";
            require_once FOOTER;
            }
        }

    }
?>