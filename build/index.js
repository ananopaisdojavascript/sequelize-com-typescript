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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_entity_1 = __importDefault(require("./entity/user.entity"));
const app_data_source_1 = __importDefault(require("./app-data-source"));
app_data_source_1.default
    .initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((error) => {
    console.error("Error during Data Source initialization:", error);
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = 8000;
app.get("/users", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield app_data_source_1.default.getRepository(user_entity_1.default).find();
    return res.json(users);
}));
app.get("/users/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const results = yield app_data_source_1.default.getRepository(user_entity_1.default).findOneBy({ id });
        return res.send(results);
    });
});
app.post("/users", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = app_data_source_1.default.getRepository(user_entity_1.default).create(req.body);
        const results = yield app_data_source_1.default.getRepository(user_entity_1.default).save(user);
        return res.send(results);
    });
});
app.put("/users/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield app_data_source_1.default.getRepository(user_entity_1.default).findOneBy({
            id: req.params.id,
        });
        if (user) {
            app_data_source_1.default.getRepository(user_entity_1.default).merge(user, req.body);
            const results = yield app_data_source_1.default.getRepository(user_entity_1.default).save(user);
            return res.send(results);
        }
        else {
            return res.status(404).send("User not found");
        }
    });
});
app.delete("/users/:id", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield app_data_source_1.default.getRepository(user_entity_1.default).delete(req.params.id);
        return res.send(results);
    });
});
app.listen(port, () => {
    console.log(port);
});
