import React, {useState, useEffect} from 'react'
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { commerce } from '../../../lib/commerce'
import {Link} from 'react-router-dom'


const steps = ['Shipping Address', 'Payment Details']

const Checkout = ({cart, order, onCaptureCheckout, error}) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({})
    const [checkoutToken, setCheckoutToken] = useState(null)
    

    useEffect(() => {
        if(cart.id){
        const generateToken = async () => {
            try{
                const token = await commerce.checkout.generateToken(cart.id, {type : 'cart'})

                setCheckoutToken(token)
            }catch(error){
                console.log(error)
            }
        }
        generateToken();
    }
    }, [cart]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const test = (data) => {
        setShippingData(data);
        nextStep(); //after we call the shipping data, we go to next step
    }

    
    let Confirmation = () => (order.customer ? (
        <>
          <div>
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
          </div>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
      ) : (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ));
    
      if (error) {
        Confirmation = () => (
          <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
          </>
        );
      }

    const Form = () => activeStep === 0 
    ? <AddressForm checkoutToken={checkoutToken}  setShippingData={setShippingData} test={test} />
    : <PaymentForm checkoutToken={checkoutToken} backStep={backStep} shippingData={shippingData} nextStep = {nextStep} onCaptureCheckout={onCaptureCheckout}/>;

    return (
        <>
           <div className= {classes.toolbar} />
           <main className = {classes.layout}>
           <Paper className = {classes.paper}>
               <Typography variant = "h4" align = "center">Checkout</Typography>
               <Stepper activeStep = {activeStep} className = {classes.stepper}>
                    {steps.map((step) => (
                        <Step key = {step}>
                            <StepLabel>
                                {step}
                            </StepLabel>
                        </Step>
                    ))}
               </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
           </Paper>
           
           </main>  
        </>
    )
}

export default Checkout
