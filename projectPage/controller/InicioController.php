<?php
    require_once "config/config.php";
    require_once "model/session.php";
    require_once "model/DAO/loginDAO.php";
    require_once 'model/conexion.php';
    class InicioController{
        private $datosDAO;
        private $session;
 

        public function __construct(){
            $this ->datosDAO = new LoginDAO();
            $this ->session = new Session();
        }

        public function mostrar(){
            require_once HEADER;
            require_once LOGIN;
            require_once FOOTER;
        }
        
        //isset : determina si una variable se declara y es diferente deNULL
        //empty : determina si una variable está vacía
        public function noticias(){
            if(((isset($_REQUEST['usuario'])) && (!empty($_REQUEST['usuario']))) &&
            ((isset($_REQUEST['password'])) && (!empty($_REQUEST['password'])))){
            $dato['usuario']=$_REQUEST['usuario'];
            $dato['password']=$_REQUEST['password'];
                if($this ->datosDAO ->consultar($dato)){
                    require_once HEADER;
                    require_once NAV;
                    require_once CONSTRUCCION;
                    $this ->session ->iniciarSession();
                    echo "si existe";
                    require_once FOOTER;
                }else{
                    require_once HEADER;
                    echo'<div class="wrapper fadeInDown">
                            <div id="formContent">
                                <div class="alert alert-info" role="alert">
                                    ¡Datos incorrectos!
                                </div>
                            </div>
                        </div>';
                    require_once LOGIN;
                    require_once FOOTER;
                }
            }
            else{
                require_once HEADER;
                echo'<div class="wrapper fadeInDown">
                            <div id="formContent">
                                <div class="alert alert-info" role="alert">
                                    ¡Campos vacíos!
                                </div>
                            </div>
                        </div>';
                require_once LOGIN;
                require_once FOOTER; 
            }
        }
    }
    
?>