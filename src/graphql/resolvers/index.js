import Tenant from '../../models/Tenant';
import UserResolvers from './user.resolvers';

const resolvers = {
    User: {
        tenant: ({ tenant }) => Tenant.findById(tenant),
        fullname: (user) => `${user.firstname} ${user.lastname}`,
    },
    Query: {
        getUsers: UserResolvers.getUsers,
    },
};

export default resolvers;
