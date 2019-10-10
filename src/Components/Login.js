import React from 'react';
import '../Login.css'
export default function Login() {
    return(
        <div className="App">
      <head>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
      <link href="https://fonts.googleapis.com/css?family=Saira+Stencil+One&display=swap" rel="stylesheet"/>
      </head>

      <div className="background">
        <div className="fContainer">
          <span className="nameStyle">Contador </span><br />
          <div className="loginInput">
            <form>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                  placeholder="Ingresa tu correo" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Contraseña</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Contraseña" />
              </div>
              <button type="submit" className="btn-login">Entrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
}