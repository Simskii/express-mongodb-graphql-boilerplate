import User from '../../models/User';
// import { requireAuth } from '../../services/auth';

export default {
    signup: async (_, { firstname, lastname, password, email }) => {
        const user = await User.create({ firstname, lastname, email, password });
        return {
            token: user.createToken(),
        };
    },
    login: async (_, { email, password }) => {
        try {
            const user = await User.findOne({ email });
            if (!user || !user.authenticateUser(password)) {
                throw new Error('Username or password is incorrect!');
            }
            return {
                token: user.createToken(),
            };
        } catch (error) {
            return error;
        }
    },
    getUsers: async (_, args, { user }) => {
        const users = await User.find({
            tenant: user.tenant,
        });
        return users;
    },
};
