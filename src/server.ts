import { serverHtpp } from "./http"
import "./websocket";

serverHtpp.listen(3000, () => console.log("Server is running on PORT 3000"))