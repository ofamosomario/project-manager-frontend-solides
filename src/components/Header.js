import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './Header.css'

const styles = {
  link: {
    textDecoration: 'none',
    color: 'inherit',
    marginLeft: '16px',
  },
  title: {
    flexGrow: 1,
  },
};

export const Header = () => {
  return (
    <AppBar position="static" color="primary" className="custom-appbar">
      <Toolbar>
        <Typography variant="h6" component="div" sx={styles.title}>
          Project Manager
        </Typography>

        <Link to="/projects" style={styles.link}>
          <Button color="inherit">Listagem de Projetos</Button>
        </Link>
        <Link to="/projects/create" style={styles.link}>
          <Button color="inherit">Novo Projeto</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
