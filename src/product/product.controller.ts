import { NextFunction, Request, RequestHandler, Response } from "express";
import { ProductService } from "./product.service";
import { ResponseDto } from "../dtos/response.dto";
import { ResponseStatus } from "../dtos/interfaces/response.interface";
import { SuccessMessages } from "../constants/success-messages.enum";
import { HttpStatus } from "../constants/http-status.enum";


export class ProductController {
    constructor(private readonly productService: ProductService) { }

    /**
 * Get Product by Id
 * @param request {Request}
 * @param response (Response}
 * @param next {NextFunction}
 */
    getProductById: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result = await this.productService.getProductById(request.params.id);
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.GET_PRODUCT_SUCCESS, result);
            return response.status(HttpStatus.OK).send(resObj);
        } catch (e) {
            next(e);
        }
    }

    /**
 * Update Product
 * @param request {Request}
 * @param response (Response}
 * @param next {NextFunction}
 */

    updateProduct: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const result = await this.productService.updateProduct(request.params.id, request.body);
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.UPDATE_PRODUCT_SUCCESS, result);
            return response.status(HttpStatus.OK).send(resObj);
        } catch (e) {
            next(e);
        }
    }

    /**
 * Delete Product
 * @param request {Request}
 * @param response (Response}
 * @param next {NextFunction}
 */

    deleteProduct: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
        try {
            await this.productService.deleteProduct(request.params.id);
            const resObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.DELETE_PRODUCT_SUCCESS);
            return response.status(HttpStatus.NO_CONTENT).send(resObj);
        } catch (e) {
            next(e);
        }
    }
}