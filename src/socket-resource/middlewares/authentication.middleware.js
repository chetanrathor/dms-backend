import JwtService from "../../libs/jwt.service.js";

export const authenticationMiddleware = (socket, next) =>{
    const token = socket.handshake.headers['authorization']

        if (!token) {
            return next(new Error("Authentication error: Token is required"));
        }

        try {
            // Verify the token
            const decoded = JwtService.decodeToken(token)
            socket.user = decoded; // Attach user data to the socket
            next(); // Proceed to the next middleware or connection
        } catch (error) {
            console.error("Authentication error:", error);
            return next(new Error("Authentication error: Invalid token"));
        }
}