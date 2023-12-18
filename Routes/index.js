import { Router } from "express";
import authroutes from "./auth.routes.js";
import productroutes from "./product.routes.js";

const route = Router();

route.use('/auth', authroutes);
route.use('/products', productroutes);

export default route;