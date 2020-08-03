import { join } from "path";
import { config } from "dotenv";

const root = join(__dirname, ".env");;
config({ path: root });

export default {
    PORT: process.env.PORT!
};