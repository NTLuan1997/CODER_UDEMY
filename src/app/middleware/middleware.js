const ObjectId = require("mongodb").ObjectId;
const clientService = require("../services/clientService");
const userService = require("../services/userService");
const JWT = require("../utils/jwt");
const Client = require("./client");
class Middleware {

    constructor() { }

    clientTransaction(req, res, next) {

        function checkExists(condition) {
            return new Promise((resolve, reject) => {
                clientService.exists(condition)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                })
            })
        }

        if(req.headers.authorization && req.headers.authorization !== "Empty") {
            if(JWT.verify(req.headers.authorization.split(' ')[1])) {
                let { token, role } = JWT.decoded(req.headers.authorization.split(' ')[1]).payload;
                req.condition = {"_id": {"$eq": new ObjectId(token)}};

                if(role) {
                    if(req.headers.comment) {
                        let {type, token, limited, start} = JSON.parse(req.headers.comment);

                        if(type && type === "limited") {
                            req.type = type;
                            req.limited = limited;
                            req.start = start;
                            next();
                        }

                        if(type && type === "findClientByID") {
                            req.type = "Find";
                            req.condition = {"_id": {"$eq": token}};
                            next();
                        }
                    }

                    if(req.body.Type === "Thumbnail") {
                        req.condition = {"_id": {"$eq": req.body.Token}};
                        delete req.body.Type;
                        delete req.body.Token;
                        Client.edit(req.body, req, res, next);
                    }

                    if(req.body.Type === "Register") {
                        let condition = {"Email": {"$eq": req.body.Email}};
                        checkExists(condition)
                        .then((result) => {
                            if(result?.status) {
                                return res.status(404).json({status: false, type: "emailRegisterAlready"});

                            } else {
                                req.system = "manager";
                                req.type = "Register";
                                delete req.body.Type;
                                delete req.body.Func;
                                Client.register(req.body, req, res, next);
                            }
                        })
                        .catch((err) => {
                            throw err;
                        })
                    }

                } else {
                    clientService.exists(req.condition)
                    .then((result) => {
                        if(result.status) {
                            if(req.body.Type === "Edit") {
                                delete req.body.Type;
                                Client.edit(req.body, req, res, next);
                            }
            
                            if(req.method === "GET") {
                                req.type = "Find";
                                next();
                            }

                        } else {
                            return res.status(401).json({status: false, type:"authorizedInconrrect"});
                        }
                    })
                    .catch((err) => {
                        throw err;
                    })
                }

            } else {
                return res.status(401).json({status: false, type:"authorizedExperience"});
            }

        } else {
            if(req.body.Type === "Register") {
                let condition = {"Email": {"$eq": req.body.Email}};
                clientService.exists(condition)
                .then((result) => {
                    if(result?.status) {
                        return res.status(404).json({status: false, type: "emailRegisterAlready"});

                    } else {
                        req.type = "Register";
                        delete req.body.Type;
                        delete req.body.Func;
                        Client.register(req.body, req, res, next);
                    }
                })
                .catch((err) => {
                    throw err;
                })
            }
        }
    }

    userTransaction(req, res, next) {
        if(req.headers.authorization && req.headers.authorization !== "Empty") {
            if(JWT.verify(req.headers.authorization.split(' ')[1])) {
                let { token, role } = JWT.decoded(req.headers.authorization.split(' ')[1]).payload;
                console.log(role);
                console.log(token);
                next();

            } else {
                return res.status(404).json({status: false, type: "tokenExperience"});
            }
        } else {
            return res.status(404).json({status: false, type: "tokenBlank"});
        }
    }
}

module.exports = new Middleware;