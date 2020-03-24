<div>
    <div class="wrapper fadeInDown">
            <div id="formContent">
                <h2 id="h2">Login</h2>
                <div class="fadeIn first">
                    <img src="imagenes/Logo.png" id="icon" alt="User Icon" />
                </div>
                    <form method="post" action="index.php?c=Inicio&a=noticias">
                        <div class="form-group container">
                            <input type="text" class="form-control" id="usuario" name="usuario" placeholder="User">
                        </div>
                        <div class="form-group container">
                            <input type="password" class="form-control" id="password" name="password" placeholder="password">
                        </div>
                        <div class="container">
                        <input type="submit" class="btn btn-primary btn-lg btn-block" value="Log In">
                        <br>
                        </div>
                    </form>
                <div id="formFooter">
                <a class="container" href="#">¿Olvidaste tu contraseña?</a>
                <br>
                <label>¿No tienes una cuenta?</label><a class="underlineHover" href="index.php?c=user&a=registro"> Regístrate</a>
                </div>
            </div>
    </div>
</div>