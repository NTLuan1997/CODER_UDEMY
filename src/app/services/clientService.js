const Service = require("./service");
// const ObjectId = require("mongodb").ObjectId;
const Client = require("../module/client");
class ClientService extends Service {

    constructor() {
        super();
    }

    /**
     * 
     * Method count Course.
     * @Returns Number all Courses of collection.
     */
    countClient() {
        return super.documentQuery((resolve, reject) => {
            resolve(Client.count({}));
        })
    }

    /**
     * 
     * @param {*} query 
     * @returns 
     */
        exists(condition) {
            return super.documentQuery((resolve, reject) => {
                Client.exists(condition, (err, doc) => {
                    if (err) reject(err);
                    let client = doc;
                    if(doc) {
                        client = {status: (doc?._id)? true : false, client: doc?._id};
                    }
                    resolve(client);
                })
            })
        }

        find(condition) {
            let query = (condition)? condition : {};
            return super.documentQuery((resolve, reject) => {
                Client.find(query).exec((err, doc) => {
                    if (err) reject(err);
                    resolve(doc);
                })
            })
        }

        save(body) {
            return super.documentQuery((resolve, reject) => {
                Client.create(body, (err, doc) => {
                    if (err) reject(err);
                    resolve({ status: true, doc });
                })
            })
        }

        update(condition, body) {
            return super.documentQuery((resolve, reject) => {
                Client.updateOne(condition, body, (err, doc) => {
                    if(err) reject(err);
                    resolve({status: true, message: "update done", doc});
                })
            })
        }


    /**
     * 
     * Method find one Course.
     * @param {*} id condition find single course.
     * @returns One Course document in collection.
     */
    findOneClient(query) {
        return super.documentQuery((resolve, reject) => {
            Client.findOne(query).exec((err, doc) => {
                if (err) reject(err);
                resolve(doc);
            })
        })
    }

    /**
     * 
     * Method find clients with limit.
     * @param {*} limit number want get
     * @param {*} start location begin get
     * @returns list clients registry of []
     */
    findLimitClient(limit, start) {
        return Promise.all([super.documentQuery((resolve, reject) => {
            Client.find({}).limit(limit).skip(start).exec((err, doc) => {
                if (err) reject(err);
                resolve(doc);
            })
        }), this.countClient()]);
    }

    /**
     * 
     * Method delete not sort
     * @param {*} query query condition find course when delete
     * @returns tatus after delete course
     */
    delete(query) {
        return super.documentQuery((resolve, reject) => {
            Client.deleteOne(query).exec((err, doc) => {
                if (err) reject(err);
                resolve({ status: true, message: "Delete done" });
            })
        })
    }

}

module.exports = new ClientService;
