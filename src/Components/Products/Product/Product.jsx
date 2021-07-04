import React from 'react'
import {Card, 
        CardMedia,
        CardContent,
        CardActions,
        Typography,
        IconButton
        } from '@material-ui/core'
        //these above keywords are called named imports.
        //they should be used exactly as their name
import {AddShoppingCart} from '@material-ui/icons'
import useStyles from './styles';

const Product = ({product, onAddToCart}) => {
    const classes = useStyles();
   
    
    return (
        <Card className = {classes.root}>
            {/* inside this we will have all the layout  
            for one specific product. That means
            - layout for image
            - layout for description
            - '       '    title */}


            <CardMedia className = {classes.media} image = {product.media.source} title={product.name}/> 
                <CardContent>

                    <div className = {classes.CardContent}>
                    <Typography variant = "h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant = "h5" >
                        {product.price.formatted_with_symbol}
                    </Typography>
                    <Typography dangerouslySetInnerHTML = {{ __html: product.description }} variant = "body2"  color = "textSecondary"/>
                    </div>

                </CardContent>

                <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton aria-label = "Add to Cart" onClick = {() => onAddToCart(product.id, 1)}>
                        <AddShoppingCart />
                    </IconButton>    
                </CardActions> {/* Later on we will hook this button
                               to the addtocarfunction from commerce.js     
                                */}


        </Card>
    )
}

export default Product
