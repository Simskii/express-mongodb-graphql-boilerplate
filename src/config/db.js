import mongoose from 'mongoose';
import config from '../config/config';

mongoose.Promise = global.Promise;

mongoose.set('debug', true);

try {
    mongoose.connect(config.MONGO_URL, {
        useMongoClient: true,
    });
} catch (err) {
    console.log(err);
}

mongoose.connection
    .once('open', () => console.log('MongoDB Running'))
    .on('error', e => {
        throw e;
    });
