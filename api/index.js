import express from 'express';
import bodyParser from 'body-parser';   
import cors from 'cors';
import Createblog from '../Routes/Addblog.js';
import blog from '../Routes/Addblog.js';
import Routeblogshow from '../Routes/Showblog.js';
import Routepatientdata from '../Routes/Addpatientdata.js';
import Routelogin from '../Routes/Login.js';
import RouteService from '../Routes/Addservice.js';
import RouteshowService from '../Routes/ShowService.js';
import { connection } from '../Connection.js';


const app = express();



connection.then(() => {
    console.log("Connection successful");
})
.catch((error) => {
    console.log("Connection Error", error);
});

app.listen(5000);

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use('/Admin/Adminblog', Createblog);
app.use('/Admin/Showblog', Createblog);
app.use('/Blog', blog);
app.use('/images', express.static('images'));
app.use("/Blogshow", Routeblogshow);
app.use("/Admin/Patientdata", Routepatientdata);
app.use("/Admin/ShowPatientdata", Routepatientdata);
app.use("/Login", Routelogin);
app.use("/Admin/AddService", RouteService);
app.use("/Admin/ShowService", RouteService);
app.use("/Servicesshow", RouteshowService);
