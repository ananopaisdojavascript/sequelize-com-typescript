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
const user_model_1 = __importDefault(require("../models/user.model"));
const sequelize_1 = require("sequelize");
class UserRepository {
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.create({
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    phone: user.phone,
                    address: user.address,
                });
            }
            catch (error) {
                throw new Error("Failed to create user!");
            }
        });
    }
    retrieveAll(searchParams) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let condition = {};
                if (searchParams.name) {
                    condition.name = { [sequelize_1.Op.like]: `%${searchParams.name}%` };
                }
                if (searchParams.email) {
                    condition.email = { [sequelize_1.Op.like]: `%${searchParams.email}%` };
                }
                if (searchParams.password) {
                    condition.password = { [sequelize_1.Op.like]: `%${searchParams.password}%` };
                }
                if (searchParams.phone) {
                    condition.phone = { [sequelize_1.Op.like]: `%${searchParams.phone}%` };
                }
                if (searchParams.address) {
                    condition.address = { [sequelize_1.Op.like]: `%${searchParams.address}%` };
                }
                return yield user_model_1.default.findAll({
                    where: condition
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    retrieveById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.findByPk(id);
            }
            catch (error) {
                throw new Error("Failed to retrieve user!");
            }
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, email, password, phone, address } = user;
            try {
                const updatedUser = yield user_model_1.default.update({ name, email, password, phone, address }, { where: { id } });
                return updatedUser[0];
            }
            catch (error) {
                throw new Error("Failed to update user!");
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.default.destroy({
                    where: { id }
                });
            }
            catch (error) {
                throw new Error("Failed to delete user!");
            }
        });
    }
}
exports.default = new UserRepository();
