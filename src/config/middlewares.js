import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

const isDev = process.env.NODE_ENV = 'development';
const isProd = process.env.NODE_ENV = 'production';

export default app => {
    if (isProd) {
        app.use(helmet());
        app.use(compression());
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
    if (isDev) {
        app.use(morgan('dev'));
    }
};

