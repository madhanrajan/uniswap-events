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
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function create(hash, exchangePair) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.item.create({ data: {
                hash: hash,
                exchangePair: exchangePair
            } });
        const allItems = yield prisma.item.findMany();
        console.log(`Number of entries: ${allItems.length}`);
    });
}
exports.create = create;
