"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
class UserController {
    create(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!request.body.user) {
                response.status(400).send({
                    message: "Content can not be empty!"
                });
                return;
            }
            try {
                const user = request.body;
                if (!user.name || !user.email || !user.password || !user.phone || !user.address) {
                    throw new Error("Name, email, password, phone and address are required");
                }
                const saveUser = yield user_repository_1.default.save(user);
                response.status(201).send(saveUser);
            }
            catch (error) {
                next(error);
            }
        });
    }
    findAll(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                response.send(yield user_repository_1.default.retrieveAll());
            }
            catch (error) {
                next(error);
            }
        });
    }
    findById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(request.params.id);
            try {
                response.send(yield user_repository_1.default.retrieveById(id));
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = request.body;
                const validate = !user.id || !user.name || !user.email || !user.password || !user.phone || !user.address;
                if (validate) {
                    throw new Error("Content can not be empty!");
                }
                user = yield user_repository_1.default.update(user);
                response.status(201).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(request.params.id);
            try {
                response.send(yield user_repository_1.default.delete(id));
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = UserController;
