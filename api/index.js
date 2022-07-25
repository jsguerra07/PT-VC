
const express = require("express")
const app = express()
const morgan = require("morgan")

const logger = require("./utils/logger")



app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

let array = ["Arquitectura basada en componentes", 
             "Componentes reutilizables",
             "Código Abierto",
             "Renderizado eficiente del lado del cliente y del servidor",
             "Servicio avanzado de inyección de dependencias",
             "Curva de aprendizaje rápida",
             "Flexibilidad- se adapta a diferentes stacks",
             "micro-frontends",
             "Soportada por facebook",
             "Gran comunidad que aporta al desarrollo",
             "Crea aplicaciones web y móviles",
             "Pasar de app a móvil es relativamente rápido",
             "Aplicaciones móviles multiplataforma",
             "Código JSX- similar a HTML",
             "SPA- eficientes en cuanto a rendimiento y velocidad de renderizado",
             "Soporta Typescript"
            ];
let array2 = []

app.get("/", (req, res) => {
    res.send(array)
})


const getChocolateFest = (n1, c1, m1) => {
    console.log(n1, c1, m1, "hola")
    if (c1== 0) {
        return 0
    }
    else if (m1 == 0) {
        let chocolate = Math.floor(n1 / c1)
        return (chocolate)
    }else if (m1 == 1){
        let chocolate = Math.floor(n1 / c1)
        return (chocolate * 2)
    }
    else {
        let chocolate = Math.floor(n1 / c1);
        return (chocolate + Math.floor((chocolate - 1) / (m1 - 1)))
    }

}

app.post("/chocolateFeast", async (req, res) => {
    try {
        const { n, c, m } = req.body

        let n1 = parseInt(n)
        let c1 = parseInt(c)
        let m1 = parseInt(m)
        const chocolates = await getChocolateFest(n1, c1, m1)
        //console.log(chocolates)
        /* array.push(n1,c1,m1)
        console.log(array) */
        array2.push(chocolates)
        //res.status(200).send(array2[0])
        res.json(chocolates)
    }catch(error) {
        res.send(error)
    }
}) 

//SEGUNDA PARTE

app.post("/webhook", async (req,res) => {
    try{
        //const exampleData = req.body
        const {EventType, Timestamp, TaskAttributes} = req.body
        //console.log(exampleData);
        console.log(EventType, Timestamp, TaskAttributes);
        logger.info(
            {
                Fecha_Hora: Timestamp,
                Tipo_evento: EventType,
                Identificador_conversacion: TaskAttributes.conversationSid,
                Datos_de_contacto: TaskAttributes.data
            })
        res.send("webhook is working")
    }catch (error){
        res.send(error)
    }
})


app.listen(3001, () => {
    logger.info("listen on port 3001")
})