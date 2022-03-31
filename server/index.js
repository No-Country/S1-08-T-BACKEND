import  app  from "./app.js";
import { config } from 'dotenv';


//dotenv
config();

//PORT
const PORT = process.env.PORT || 8000;

//Starting the server
const server = app.listen(PORT,() =>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
})

export default server
