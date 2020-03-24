<div class="registro container">
<label id="encabezados">Crea una cuenta</label>
  <br>
  <form>
    <div class="form-row">
      <div class="col-md-4 mb-3">
        <label for="validationDefault01">Nombres</label>
        <input type="text" class="form-control" id="nombre" name="nombre"  placeholder="Michael Danilo" required>
      </div>
      <div class="col-md-4 mb-3">
        <label for="validationDefault02">Apellidos</label>
        <input type="text" class="form-control" id="apellido" name="apellido" placeholder="Acosta Rosero" required>
      </div>
      <div class="col-md-3 mb-2">
        <label for="validationDefaultUsername">Username</label>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroupPrepend2">@</span>
          </div>
          <input type="text" class="form-control" id="username" name="username" placeholder="mdar77" aria-describedby="inputGroupPrepend2" required>
        </div>
      </div>
    </div>
    <div class="form-row">
    <div class="form-group col-md-1">
      <label for="inputEmail4">Email</label>
    </div>
    <div class="form-group col-md-6">
      <input type="email" class="form-control" id="email" name="email" placeholder="example@gmail.com">
    </div>
    </div>
    <div class="form-row">
    <div class="form-group col-md-1">
      <label for="inputPassword4">Password</label>
    </div>
    <div class="form-group col-md-6">
      <input type="password" class="form-control" id="pass" name="pass" placeholder="al menos 8 caracteres" required>
    </div>
    </div>
    <div class="form-row">
      <div class="col-md-3 mb-3">
        <label for="validationDefault04">Ciudad</label>
          <select class="custom-select" id="ciudad" name="ciudad" required>
            <option selected disabled value="">Escojer...</option>
              <?php foreach ($datos as $ciudad) { ?>
                <option value="<?php echo $ciudad['ciudad_Id'] ?>">
                  <?php echo $ciudad['ciudad'] ?>
                </option>
              <?php } ?>
          </select>
      </div>
      <div class="col-md-3 mb-3">
        <label for="validationDefault04">Provincia</label>
        <select class="custom-select" id="provincia" name="provincia" required>
          <option selected disabled value="">Choose...</option>
          <option>...</option>
        </select>
      </div>
      <div class="col-md-3 mb-3">
        <label for="validationDefault04">Cantón</label>
        <select class="custom-select" id="canton" name="canton" required>
          <option selected disabled value="">Choose...</option>
          <option>...</option>
        </select>
      </div>
      <div class="col-md-3 mb-3">
        <label for="validationDefault04">Parroquia</label>
        <select class="custom-select" id="parroquia" name="parroquia" required>
          <option selected disabled value="">Choose...</option>
          <option>...</option>
        </select>
      </div>
    </div>
    <label id="h2">Fecha de nacimiento</label>
      <div class="form-row">
        <div class="col-md-1 mb-1"> 
          <select class="custom-select" id="dia" name="dia" required>
            <option selected disabled value="">Choose...</option>
            <option>...</option>
          </select>
        </div>
        <div class="col-md-1 mb-1">
          <select class="custom-select" id="mes" name="mes" required>
            <option selected disabled value="">Choose...</option>
            <option>...</option>
          </select>
        </div>
        <div class="col-md-1 mb-1">
          <select class="custom-select" id="año" name="año" required>
            <option selected disabled value="">Choose...</option>
            <option>...</option>
          </select>
        </div>
      </div>
      <label id="h2">Sexo</label>
      <div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="sexo" id="sexo" value="mujer">
          <label class="form-check-label" for="inlineRadio1">Mujer</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="sexo" id="sexo" value="hombre">
          <label class="form-check-label" for="inlineRadio2">Hombre</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="sexo" id="sexo" value="personalizado" disabled>
          <label class="form-check-label" for="inlineRadio3">Personalizado (disabled)</label>
        </div>
      </div>
      <br><br>
    <button class="btn btn-primary" type="submit">Registrar</button>
  </form>
</div>