import express from "express";
import projectsRoute from './routes/projects.routes.js'
import usersRoute from './routes/users.routes.js';
import cors from 'cors'
import { PORT } from "../config.js";
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    }
));
app.use('/api/', projectsRoute)
app.use('/auth/', usersRoute)
app.listen(PORT);
console.log('server runing on port: ' + PORT + '')