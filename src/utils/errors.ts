import { GeneralError } from "./general-error";

export default class ErrorFactory {

    static invalidCredentialsErr(data: any = null) {
        return new GeneralError("Invalid credentials", 400, data);
    }

    static userAlreadyExistsErr(data: any = null) {
        return new GeneralError("User already exists", 409, data);
    }

    static userNotFoundErr(data: any = null) {
        return new GeneralError("User not found", 404, data);
    }

    static invalidPasswordErr(data: any = null) {
        return new GeneralError("Invalid password", 401, data);
    }

    static refreshTokenNotSpecifiedErr(data: any = null) {
        return new GeneralError("Refresh token not specified", 400, data);
    }

    static invalidUserIdErr(data: any = null) {
        return new GeneralError("Invalid user id", 400, data);
    }

    static fileNotUploadedErr(data: any = null) {
        return new GeneralError("No file were uploaded", 400, data);
    }

    static invalidListParams(data: any = null) {
        return new GeneralError("Invalid list params", 400, data);
    }

    static invalidFileId(data: any = null) {
        return new GeneralError("Invalid file id", 400, data);
    }

    static fileNotFound(data: any = null) {
        return new GeneralError("File not found", 404, data);
    }
}

