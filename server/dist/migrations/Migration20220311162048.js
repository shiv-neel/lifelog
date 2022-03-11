"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20220311162048 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20220311162048 extends migrations_1.Migration {
    async up() {
        this.addSql('create table "user" ("id" serial primary key, "username" text not null, "password" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
        this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    }
    async down() {
        this.addSql('drop table if exists "user" cascade;');
    }
}
exports.Migration20220311162048 = Migration20220311162048;
//# sourceMappingURL=Migration20220311162048.js.map