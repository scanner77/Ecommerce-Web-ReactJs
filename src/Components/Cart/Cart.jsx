import React from 'react'
import {Container, Typography, Button, Grid} from '@material-ui/core'
import useStyles from './styles'
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom'



const Cart = ({ cart, handleAddToCart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();
   

    const EmptyCart = () => (
        <Typography variant = "subtitle1">
            You have no items in your shopping cart! 
            <Link to = "/" className = {classes.link}>
            Start adding some..
            </Link>
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing = {3}>
                {cart.line_items.map((item)=>(
                    <Grid item xs = {12} sm = {4} key = {item.id}>
                        <CartItem item = {item} onUpdateCartQty = {handleUpdateCartQty} onRemoveFromCart = {handleRemoveFromCart}/>
                    </Grid> 
                ))}
            </Grid>
            <div className = {classes.cardDetails}>
                <Typography variant = "h4">Subtotal: { cart.subtotal.formatted_with_symbol}</Typography>
                <div>
                    <Button className = {classes.emptyButton} size = "large" type = "button" variant = "contained" color = "secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                    <Button component = {Link} to = "/checkout" className = {classes.checkoutButton} size = "large" type = "button" variant = "contained" color = "primary">CheckOut</Button>
    
                </div>
            </div>
        </>
    );
    
    if(!cart.line_items) return 'Loading...'; //when our cart.line_items have not been fetched yet
    return (
        <Container>
            <div className = {classes.toolbar}/> {/* This div pushes the div below the navigation bar */}
            <Typography className = {classes.title} variant = "h3" gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart
