const findOne = (db, data) => {
    return new Promise((resolve, reject) => {
        db.findOne(data, function(err, user) {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        })
    })
};

const find = (db, data) => {
    return new Promise((resolve, reject) => {
        db.find(data, function(err, user) {
            if (err) {
                reject(err);
            } else {
                resolve(user);
            }
        })
    })
};

const save = (db, data) => {
    let record = new db(data);
    return new Promise((resolve, reject) => {
        record.save((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result)
            }
        })
    })
};

const update = (db, checkData, updateData) => {
    return new Promise((resolve, reject) => {
        db.findOneAndUpdate(checkData, { $set: updateData }, { new: true }, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
};

const search = (db, data) => {
    return new Promise((resolve, reject) => {
        db.find(data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
};

const remove = (db, data) => {
    return new Promise((resolve, reject) => {
        db.remove(data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
};

const getCategoryList = (db) => {
    return new Promise((resolve, reject) => {
        db.find()
		.populate('Products')
		.exec(function(err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
		});
    })
};

export default {
    findOne,
    find,
    save,
    update,
    search,
    remove,
    getCategoryList
};