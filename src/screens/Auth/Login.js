import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from '@material-ui/core';
import { Route, Routes, Link, useNavigate, redirect } from 'react-router-dom';
export const orange = '#FFA600';
export const green = '#7FB069';
export const red = '#F96A14';

function Login() {
  const classes = useStyles();
  const Logo = require('../../Imagen.png');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [buttonText, setButtonText] = useState('Iniciar sesión');
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error al registrar', error);
    }
  };
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      setToken(data.token);
      setName(data.name);
      navigate(`/saludo?name=${data.name}`);
    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  };

  const handleSwitchForm = () => {
    setIsLogin(!isLogin);
    setButtonText(isLogin ? 'Regístrate' : 'Iniciar sesión');
  };

  return (
    <div className={classes.container}>
      <div className={classes.background}></div>
      <div className={classes.content}>
        <img src={Logo} alt="Logo" className={classes.logo} />
        <Typography variant="h1" className={classes.title}>
          {isLogin ? 'Inicio de Sesión' : 'Registro'}
        </Typography>
          <form className={classes.form} onSubmit={handleFormSubmit}>
            {!isLogin && (
              <div className={classes.formGroup}>
                <TextField
                  type="text"
                  label="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={classes.input}
                />
              </div>
            )}
            <div className={classes.formGroup}>
              <TextField
                type="email"
                label="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={classes.input}
              />
            </div>
            <div className={classes.formGroup}>
              <TextField
                type="password"
                label="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={classes.input}
              />
            </div>
            <Button variant="contained" color="secondary" type="submit">
              {buttonText}
            </Button>
          </form>
        <Typography variant="body1">
          {isLogin ? '¿No tienes una cuenta? ' : '¿Ya tienes una cuenta? '}
          <Button color="primary" onClick={handleSwitchForm}>
            {isLogin ? 'Regístrate' : 'Iniciar sesión'}
          </Button>
        </Typography>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(135deg, ${orange} 0%, ${green} 100%)`,
    zIndex: -1,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  },
  logo: {
    width: 150,
    marginBottom: theme.spacing(4),
  },
  title: {
    fontSize: 24,
    marginBottom: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
}));

export default Login;
