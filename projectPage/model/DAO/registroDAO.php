<?php
    require_once 'model/conexion.php';
    class registroDAO{
        private $conexion;
        public function __construct(){
            $this ->conexion = Conexion::getConexion();
        }
        public function consultarCiudad(){
                $sql="select * from pciudad where estado='A'";
                try{
                $sentencia= $this->conexion->prepare($sql);
                $parametros= array();
                $sentencia->execute($parametros);
                $resultados= $sentencia->fetchAll(PDO::FETCH_ASSOC);
                return $resultados;
                }catch(Exception $e){
                    die($e->getMessage());
                    die($e->getTrace());
                }
        }
    }
?>