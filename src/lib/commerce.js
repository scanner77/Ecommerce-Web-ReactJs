import Commerce from '@chec/commerce.js'

export const commerce = new Commerce(process.env.REACT_APP_CHEC_PUBLIC_KEY,true);
//Here we are creating a new instance of a Commerce which is going to be our store 
//We will create a .env file where we will put our API keys because it will not be uploaded to git because env contains environmental variables. You can only see these variables in your pc
//true here means this const commerce is going to create a new commerce store