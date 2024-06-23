const dotEnv = require("dotenv");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { request, response } = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const chalk = require("chalk");
const prism = new PrismaClient();
//---Archivos de rutas---
const productoRouter = require("./routes/productoRoutes");
const facturaRouter = require("./routes/facturaRoutes");
const detalleFacturaRouter = require("./routes/detalleFacturaRoutes");
const reservaRouter = require("./routes/reservaRoutes");

// Acceder a la configuracion del archivo .env
dotEnv.config();
// Puero que escucha por defecto 300 o definido .env
const port = process.env.PORT || 3000;
// Middleware CORS para aceptar llamadas en el servidor
app.use(cors());
// Middleware para loggear las llamadas al servidor
app.use(logger("dev"));
// Middleware para gestionar Requests y Response json
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
//---- Definir rutas ----
app.use("/producto/", productoRouter);
app.use("/factura/", facturaRouter);
app.use("/detalleFactura/", detalleFacturaRouter);
app.use("/reserva/", reservaRouter);

// Servidor
app.listen(port, () => {
  console.log(chalk.blue(`http://localhost:${port}`));
  console.log(chalk.blue.bgRed("Presione CTRL-C para deternerlo\n"));
});
