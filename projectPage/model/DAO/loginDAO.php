<?php
    class LoginDAO{
        private $conexion;
        private $usuarios;
        public function __construct(){
            $this ->conexion = Conexion::getConexion();
            $this->usuarios = array(); 
        }

        public function consultar($dato){
            $sql="SELECT * FROM pusuario WHERE usuario='".$dato['usuario']."' AND contraseña='".$dato['password']."' 
            AND estado='A'";
            try{
                $sentencia = $this ->conexion ->prepare($sql);
                $parametros = array();
                $sentencia ->execute($parametros);
                while($resultados = $sentencia ->fetchAll(PDO::FETCH_OBJ)){
                    $this->parametros[]=$resultados;
                }
                if (empty($this->parametros)){
                    return false;
                }
                return true;
            }catch(Exception $e){
                $e ->getMessage();
            }
        }

    }    
?>