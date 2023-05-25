var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http.ts
var http_exports = {};
__export(http_exports, {
  io: () => io,
  serverHtpp: () => serverHtpp
});
module.exports = __toCommonJS(http_exports);
var import_express = __toESM(require("express"));
var import_http = __toESM(require("http"));
var import_path = __toESM(require("path"));
var import_socket = require("socket.io");
var app = (0, import_express.default)();
app.use(import_express.default.static(import_path.default.join(__dirname, "../public")));
var serverHtpp = import_http.default.createServer(app);
var io = new import_socket.Server(serverHtpp);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  io,
  serverHtpp
});
