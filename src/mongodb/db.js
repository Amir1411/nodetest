import mongoose from "mongoose";
let conn = mongoose.createConnection("mongodb://localhost/nodetest");


// the middleware function
module.exports = function() {
    // create schema
    let model_schema_products = mongoose.Schema(
        {
            id: String,
            title: String,
            category_id: String,
            description: String
        }, 
        {
            collection: 'Product'
        }
    );
    let CollectionModel_product = conn.model('Product', model_schema_products);

    let model_schema_categories = mongoose.Schema(
        {
            id: String,
            title: String,
            products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }]
        }, 
        {
            collection: 'Categories'
        }
    );
    let CollectionModel_categories = conn.model('Categories', model_schema_categories);
    

    return function(req, res, next) {
        req.Product = CollectionModel_product;
        req.Categories = CollectionModel_categories;
        next();
    };
};