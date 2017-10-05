import jwt from 'jsonwebtoken';
import constants from '../config/constants';
import User from '../models/User';

export function decodeToken(token) {
    const arr = token.split(' ');
    if (arr[0] === 'JWT' || 'jwt') {
        try {
            const valid = jwt.verify(arr[1], constants.JWT_SECRET);
            return valid;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }
}

export async function requireAuth(user) {
    if (!user || !user._id) {
        return new Error('Unauthorized');
    }

    const me = await User.findById(user._id);

    if (!me) {
        return new Error('Unauthorized!');
    }
    return me;
}

export async function userMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization;

        if (token != null) {
            const user = await decodeToken(token);
            if (!user) {
                return res.status(403).json({
                    message: 'Token expired',
                });
            }
            req.user = user;
        } else {
            req.user = null;
        }
        return next();
    } catch (error) {
        throw error;
    }
}
