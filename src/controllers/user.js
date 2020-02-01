import { validate } from "../modules/generic";
import User from "../modals/userModal";
import {status} from '../constant/status';
import {message} from '../constant/message';
import responses from '../constant/responses';
import { generateRandomString } from "../modules/commonFunction";
import md5 from 'md5';

export class UserController {

	add_category(req, res) {
		const { title } = req.body;
		let verify = validate({ title });

		let CategoryModel = req.Categories;
		if (verify.status) { 
			let created_on = new Date();
			let id = md5(created_on.getTime()+generateRandomString());
			let created_on_timestamp = created_on.getTime();
			let data = {
				id, 
				title, 
				is_active: 1,
				is_deleted: 0,
				created_on: created_on.toString(),
				created_on_timestamp,
				updated_on: created_on.toString(),
			};
			User.save(CategoryModel, data)
			.then((updatedData) => {
				responses.successResponse(res, status.SUCCESS_STATUS, message.SUCCESS_MESSAGE, updatedData);
			})
			.catch((error) => {console.log(error);responses.errorResponse(res, status.BAD_REQUEST_STATUS, error.message)});
		} else {
			responses.errorResponse(res, status.PARAMETER_MISSING_STATUS, verify.data[Object.keys(verify.data)[0]]);
		}
	}

	add_product(req, res) {
		const { category_id, title } = req.body;
		let verify = validate({ category_id, title });

		let ProductModel = req.Product;
		if (verify.status) { 
			let created_on = new Date();
			let id = md5(created_on.getTime()+generateRandomString());
			let created_on_timestamp = created_on.getTime();
			let data = {
				id, 
				title,
				category_id,
				is_active: 1,
				is_deleted: 0,
				created_on: created_on.toString(),
				created_on_timestamp,
				updated_on: created_on.toString(),
			};
			User.save(ProductModel, data)
			.then((updatedData) => {
				responses.successResponse(res, status.SUCCESS_STATUS, message.SUCCESS_MESSAGE, updatedData);
			})
			.catch((error) => {console.log(error);responses.errorResponse(res, status.BAD_REQUEST_STATUS, error.message)});
		} else {
			responses.errorResponse(res, status.PARAMETER_MISSING_STATUS, verify.data[Object.keys(verify.data)[0]]);
		}
	}

	get_category_list(req, res) {
		let CategoryModel = req.Categories;
		User.getCategoryList(CategoryModel)
		.then((updatedData) => {
			responses.successResponse(res, status.SUCCESS_STATUS, message.SUCCESS_MESSAGE, updatedData);
		})
		.catch((error) => {console.log(error);responses.errorResponse(res, status.BAD_REQUEST_STATUS, error.message)});
	}
}
const controller = new UserController();
export default controller;