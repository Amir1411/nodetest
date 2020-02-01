import user from "../controllers/user";


export const setRouter = (app) => {

    /* Route for add_category */
    app.route("/user/add_category").post(user.add_category);

    /* Route for add_product */
    app.route("/user/add_product").post(user.add_product);

    /* Route for get_category_list */
    app.route("/user/get_category_list").get(user.get_category_list);
    
    return app;
};