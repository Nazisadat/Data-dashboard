import React from 'react';
// import {Fragment, useState} from 'react';
import {AppBar, Toolbar, IconButton, Typography, Button}  from '@material-ui/core';
import { Menu, AccountCircle} from '@material-ui/icons';


function Header() {

  return (
        <div>
           <AppBar position="static">
<Toolbar>
<IconButton  color="inherit" edge ="start" aria-label="menu">
    <Menu/>
</IconButton>
<Typography varient="h6" 

>
    Material-UI
</Typography>
<Button color="inherit"> Login</Button>
<Button color="inherit">Register</Button>
<IconButton color="inherit" aria-label="account">
    <AccountCircle/>
</IconButton>
</Toolbar>

           </AppBar>
     
        </div>

    );
}

export default Header;