import { io } from "../../../index.js";
import JwtService from "../../libs/jwt.service.js";
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js";

export const commentNamespace = () => {
    const instance =  io.of('/comment')
    instance.use(authenticationMiddleware);
    return instance
}