"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220308052244 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220308052244 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "task" ("id" serial primary key, "title" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "duration" int not null);');
    }
    async down() {
        this.addSql('drop table if exists "task" cascade;');
    }
}
exports.Migration20220308052244 = Migration20220308052244;
//# sourceMappingURL=Migration20220308052244.js.map