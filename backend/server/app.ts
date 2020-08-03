import express, { json } from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";

import CONFIG from "./config";
import schema from "./shemas";

const app = express();
app.use(json());
app.use(cors());

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(CONFIG.PORT, () => {
    console.log(`Server started on port ${ CONFIG.PORT }`)
});