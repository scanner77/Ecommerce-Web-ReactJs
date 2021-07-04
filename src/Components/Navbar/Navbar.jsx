import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import logo from '../../Assets/bikini-war.png'
import useStyles from './styles'
import {Link, useLocation} from  'react-router-dom' //here useLocation is a hook

const Navbar = ({totalItems}) => {
    const classes = useStyles();

    const location = useLocation(); 



    return (
        <>
           <AppBar position = "fixed" className = {classes.appBar} color="inherit"> {/* Appbar: Navigation Bar */}
               
               <Toolbar> {/* Used to wrap image and nama of our shop */}
                    <Typography component = {Link} to = "/" variant = "h6" className = {classes.title} color = "inherit">
                        <img src = {logo} alt = "Camarones.js" height = "25px" className = {classes.image} />
                        Computer Stuffs
                    </Typography>
                    
                <div className = {classes.grow} /> {/* As much space as we need */}
                        {location.pathname === '/' && (
                <div className = {classes.button}> {/* Inside this we will have a icon button */}
                    <IconButton component = {Link} to = "/cart" aria-label = "Show Cart Items" color = "inherit" >
                            <Badge badgeContent = {totalItems } color = "secondary">
                                <ShoppingCart />
                            </Badge> 
                    </IconButton> 
                </div>
                )}
               </Toolbar>
             
           </AppBar> 
        </>
    )
}

export default Navbar
