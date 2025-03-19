const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const flash = require('connect-flash');//IMPORTANT FOR THE FLASH MESSAGES,IMPORTANT FOR THE FLASH MESSAGES
const session = require('express-session');//IMPORTANT FOR THE FLASH MESSAGES,IMPORTANT FOR THE FLASH MESSAGES

const Product = require('./models/product');
const Farm = require('./models/farm')
const categories = ['fruit', 'vegetable', 'dairy'];


mongoose.connect('mongodb://localhost:27017/farmStandTake2', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(flash());//IMPORTANT FOR THE FLASH MESSAGES,IMPORTANT FOR THE FLASH MESSAGES,IMPORTANT FOR THE FLASH MESSAGES
app.use(session({
    secret:'okbro',
    resave:false,
    saveUninitialized:true
}));//IMPORTANT FOR THE FLASH MESSAGES,IMPORTANT FOR THE FLASH MESSAGES,IMPORTANT FOR THE FLASH MESSAGES

// FARM ROUTES

app.use((req, res, next) => {
    res.locals.message =req.flash('success');//IMPORTANT FOR THE FLASH MESSAGES
    next();
})

app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', { farms });//dont need this anymore ',message:req.flash('success')' in farms IMPORTANT FOR THE FLASH MESSAGES
})
app.get('/farms/new', (req, res) => {
    res.render('farms/new')
})
app.get('/farms/:id', async (req, res) => {
    const farm = await Farm.findById(req.params.id).populate('products');
    res.render('farms/show', { farm })
})

app.delete('/farms/:id', async (req, res) => {
    const farm = await Farm.findByIdAndDelete(req.params.id);
    res.redirect('/farms');
})




app.post('/farms', async (req, res) => {
    const farm = new Farm(req.body);
    await farm.save();
    req.flash('success', 'Successfully made a new farm!');//IMPORTANT FOR THE FLASH MESSAGES
    res.redirect('/farms')
})

app.get('/farms/:id/products/new', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new', { categories, farm })
})

app.post('/farms/:id/products', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category });
    farm.products.push(product);
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`/farms/${id}`)
})



// PRODUCT ROUTES

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
})

app.get('/products/new', (req, res) => {
    // res.render('products/new', { categories })
    res.send(`<h1>⚠️ ATTENTION, WRONG ROUTE! ⚠️</h1>
    <h1>In this section, do <em>not</em> use the routes <em>starting</em> with "/products".</h1>
    <h1>Instead, you will use the routes starting with "<a href="/farms" target="_blank">/farms</a>".</h1>
    <h1>Therefore, please continue watching the lecture videos in this section and following Colt's exact steps.</h1>
    <h1>For reference, these are the correct steps to create a farm and its products in this section:</h1>
    <ol>
        <li>Open the <a href="/farms" target="_blank">/farms</a> route and create (add) a new farm.</li>
        <li>After creating a new farm, open the newly-created farm's show page.</li>
        <li>On the farm's show page, click to create (add) a new product.</li>
        <li>Create a new product from there.</li>
    </ol>`);
})

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('farm', 'name');
    res.render('products/show', { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})



app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})



