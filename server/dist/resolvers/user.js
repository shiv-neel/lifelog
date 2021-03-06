"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entities/User");
const argon2_1 = __importDefault(require("argon2"));
let RegisterInput = class RegisterInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "password", void 0);
RegisterInput = __decorate([
    (0, type_graphql_1.InputType)()
], RegisterInput);
let LoginInput = class LoginInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
LoginInput = __decorate([
    (0, type_graphql_1.InputType)()
], LoginInput);
let FieldError = class FieldError {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldError);
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User, { nullable: true }),
    __metadata("design:type", User_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
let UserResolver = class UserResolver {
    getAllUsers({ em }) {
        return em.find(User_1.User, {});
    }
    getUserById(id, { em }) {
        return em.findOne(User_1.User, { id });
    }
    async me({ em, req }) {
        let sess = req.session;
        if (!sess.userId)
            return null;
        const user = await em.findOne(User_1.User, { id: sess.userId });
        return user;
    }
    async register(options, { em, req }) {
        const errors = [];
        const existingUsername = await em.findOne(User_1.User, {
            username: options.username.toLowerCase(),
        });
        if (existingUsername) {
            errors.push({
                field: 'username',
                message: `User with username ${options.username} already exists.`,
            });
        }
        const existingEmail = await em.findOne(User_1.User, {
            email: options.email.toLowerCase(),
        });
        if (existingEmail)
            errors.push({
                field: 'email',
                message: `User with email ${options.email} already exists.`,
            });
        if (options.username.length <= 2)
            errors.push({
                field: 'username',
                message: 'Username must be longer than 2 characters.',
            });
        if (options.password.length <= 6)
            errors.push({
                field: 'password',
                message: 'Password must be longer than 6 characters.',
            });
        const hashedPassword = await argon2_1.default.hash(options.password);
        if (errors.length)
            return { errors };
        try {
            const res = await em
                .createQueryBuilder(User_1.User)
                .getKnexQuery()
                .insert({
                username: options.username,
                email: options.email,
                password: hashedPassword,
                created_at: new Date(),
                updated_at: new Date(),
            })
                .returning('*');
            const user = res[0];
            let sess = req.session;
            sess.userId = user.id;
            return { user };
        }
        catch (err) {
            if (!errors.length)
                errors.push({
                    field: 'username',
                    message: 'Could not register user. Please try again.',
                });
            return { errors };
        }
    }
    async login(options, { em, req }) {
        const user = await em.findOne(User_1.User, {
            username: options.username.toLowerCase(),
        });
        if (!user) {
            return {
                errors: [{ field: 'username', message: 'Username does not exist.' }],
            };
        }
        const passwordIsValid = await argon2_1.default.verify(user.password, options.password);
        if (!passwordIsValid) {
            return {
                errors: [{ field: 'password', message: 'Password is incorrect.' }],
            };
        }
        let sess = req.session;
        sess.userId = user.id;
        return { user };
    }
    async logout({ em, req }) {
        let sess = req.session;
        if (!sess.userId)
            return null;
        const user = await em.findOne(User_1.User, { id: sess.userId });
        sess.userId = null;
        return user;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [User_1.User]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getAllUsers", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserById", null);
__decorate([
    (0, type_graphql_1.Query)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)('options')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)('options')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => User_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map