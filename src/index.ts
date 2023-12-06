import  express  from "express";
import cors from "cors";

const app = express();

app.use(
   cors({
     origin: ["*"],
  })
);

app.use((req,res) => {
    res.status(404);
});

app.listen(process.env.PORT,() => {
    console.log(
        `Servdor execuando em: ${process.env.HOST}: ${process.env.PORT}`
    );
});

