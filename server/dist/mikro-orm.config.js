"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Task_1 = require("./entities/Task");
const path_1 = __importDefault(require("path"));
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[jt]s$/
    },
    dbName: 'lifelog',
    debug: !constants_1.__prod__,
    type: 'postgresql',
    entities: [Task_1.Task],
    allowGlobalContext: true
};
//# sourceMappingURL=mikro-orm.config.js.map