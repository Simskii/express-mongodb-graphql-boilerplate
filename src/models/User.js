import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import constants from '../config/constants';

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
        },
        firstname: String,
        lastname: String,
        password: String,
        tenant: {
            type: Schema.Types.ObjectId,
            ref: 'Tenant',
            required: true,
        },
    },
    { timestamps: true },
);

UserSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = this._hashPassword(this.password);
        return next();
    }
    return next();
});

UserSchema.statics = {
};

UserSchema.methods = {
    _hashPassword(password) {
        return hashSync(password);
    },

    authenticateUser(password) {
        return compareSync(password, this.password);
    },

    createToken() {
        return jwt.sign(
            {
                _id: this._id,
            },
            constants.JWT_SECRET,
        );
    },
};

export default mongoose.model('User', UserSchema);
