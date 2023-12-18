import { Router } from "express";
import { addProducts, filterProducts, getAllProducts, singleProducts } from "../Controllers/Product.Controllers.js";
import { checkUserId } from "../Middlewires/AllMiddlewires.js";

const productroutes = Router();

productroutes.get('/all-products', getAllProducts);
productroutes.post('/single-product', singleProducts)
productroutes.post('/add-product', checkUserId, addProducts);
productroutes.post('/filter-prodcuts', filterProducts)

export default productroutes;