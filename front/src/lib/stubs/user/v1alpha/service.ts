// @generated by protobuf-ts 2.8.2
// @generated from protobuf file "user/v1alpha/service.proto" (package "user.v1alpha", syntax proto3)
// tslint:disable
import { DeleteResponse } from "./message";
import { DeleteRequest } from "./message";
import { UpdatePasswordResponse } from "./message";
import { UpdatePasswordRequest } from "./message";
import { UpdateResponse } from "./message";
import { UpdateRequest } from "./message";
import { RegisterResponse } from "./message";
import { RegisterRequest } from "./message";
import { FindResponse } from "./message";
import { FindRequest } from "./message";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
/**
 * @generated ServiceType for protobuf service user.v1alpha.UserService
 */
export const UserService = new ServiceType("user.v1alpha.UserService", [
    { name: "Find", options: {}, I: FindRequest, O: FindResponse },
    { name: "Register", options: {}, I: RegisterRequest, O: RegisterResponse },
    { name: "Update", options: {}, I: UpdateRequest, O: UpdateResponse },
    { name: "UpdatePassword", options: {}, I: UpdatePasswordRequest, O: UpdatePasswordResponse },
    { name: "Delete", options: {}, I: DeleteRequest, O: DeleteResponse }
]);
