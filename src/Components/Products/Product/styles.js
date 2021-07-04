import {makeStyles} from '@material-ui/core/styles'

 export default makeStyles(() => ({
     //Inisde of this object we will write the styles in css and js kinda way
     root:{
         maxWidth: '100%'
     },
     media: {
         height: 0,
         paddingTop: '56.25%'
     },
     cardActions: {
         display: 'flex',
         justifyContent: 'flex-end'
     },
     CardContent: {
        display: 'flex',
        justifyContent: 'space-between'
     }


 }));