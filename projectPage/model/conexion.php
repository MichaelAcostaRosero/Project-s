<?php
    require_once "config/config.php";
    class Conexion{
        private static $conexion=null;

        private function __construct(){

        }
        //isset Determina si una variable está definida y no es NULL
        public static function getConexion(){
            try{
                if(!isset(self::$conexion)){
                    self::$conexion = new PDO("mysql:host=".LOCALHOST.";port=". PUERTO .";dbname=". BDNOMBRE , USUARIO, PASSWORD);
                    /*Establece el valor de un atributo en el elemento indicado. Si el atributo ya existe, el valor es actualizado, 
                    en caso contrario, el nuevo atributo es añadido con el nombre y valor indicado.*/
                    self::$conexion ->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                    self::$conexion->exec("set character set utf8");
                }
            }catch(exception $e){
                //die — Equivalente a exit
                die("error " . $e->getMessage());
            }
            return self::$conexion;
       }
    }
?>