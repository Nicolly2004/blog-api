import  express  from "express";
import cors from "cors";
import routesV1 from "./routes/routesV1";

const app = express();

app.use(
   cors({
     origin: ["*"],
  })
);

app.use("/api/v1",routesV1);

app.get("/",(req,res) => {
    res.send("Hello World!");
});

app.use((req,res) => {
    res.status(404);
    res.send("Rota não encontrada!!!")
});

app.listen(process.env.PORT,() => {
    console.log(
        `Servdor executando em: ${process.env.HOST}: ${process.env.PORT}`
    );
});

