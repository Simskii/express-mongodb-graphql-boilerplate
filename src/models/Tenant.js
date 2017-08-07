import mongoose, { Schema } from 'mongoose';

const TenantSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
        },
    }
);

export default mongoose.model('Tenant', TenantSchema);
