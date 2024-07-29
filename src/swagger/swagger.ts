import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Kanban App API',
            version: '1.0.0',
            description: 'API for managing boards, columns and tasks',
        },
        servers: [
            {
                url: 'http://31.128.43.139/',
                description: 'Open server',
            },
        ],
    },
    apis: ['./src/routes/**/*.ts'],
};

const specs = swaggerJsdoc(swaggerOptions);

const swaggerSetup = (app: Application) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default swaggerSetup;