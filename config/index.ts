import * as prodConfig from "./prod";
import * as devConfig from "./dev";

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

export default config;
