import  app  from "./app.js";


//PORT
const PORT = process.env.PORT || 8000;

//Starting the server
const server = app.listen(PORT,() =>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
})

export default server
