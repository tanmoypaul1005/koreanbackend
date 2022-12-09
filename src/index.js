const express = require('express')
const app = express();
require('dotenv').config();
const DataBaseconnect = require("./config/DataBase");
const passport = require("passport");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const MongoStore = require('connect-mongo'); 
const bodyParser = require('body-parser');
require("./config/Passport")(passport);
const { getSsl } = require('./config/ssl');
// const SSLCommerzPayment = require("sslcommerz");
const SSLCommerzPayment = require('sslcommerz-lts');

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser("secretcode"));

app.use(passport.initialize())
// app.use(passport.session())

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl:`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nswkl.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    collectionName:"sessions"
  }),
  // cookie: { secure: true }
}))

//DataBase Connectd
DataBaseconnect()
app.get('/', (req, res) => {
  res.send('Hello World!')
})





const AdminRoutes=require('./Route/Admin/AdminRoute');
const UserRoutes=require('./Route/UserRoute');
const CategoryRoute=require('./Route/CategoryRouter');
const ProductRoute=require('./Route/ProductRoute');
const CartRoute=require('./Route/CartRoute');
const AddressRoute=require('./Route/AddressRoute');
const ReviewRoute=require('./Route/ReviewsRoutes');
const OrderRoute=require('./Route/OrderRoute');
const sslRoute=require('./Route/sslRoute');
const RelatedProductRoute=require('./Route/RelatedProductRoute');

app.use('/api',AdminRoutes);
app.use('/api',UserRoutes);
app.use('/api',CategoryRoute);
app.use('/api',ProductRoute);
app.use('/api',CartRoute);
app.use('/api',AddressRoute);
app.use('/api',ReviewRoute);
app.use('/api',OrderRoute);
app.use('/api',sslRoute);
app.use('/api',RelatedProductRoute);

app.listen(process.env.PORT, () => {
  console.log(`This app listening on port ${process.env.PORT}`)
})