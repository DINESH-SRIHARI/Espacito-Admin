const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const jwtSecret="MyNameIsEnduvasiSrihariDinesh!@#"
app.use(cors({
  origin: ["http://localhost:3000", "https://espacito-admin.netlify.app"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
}));
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
//-------------------------database connection
mongoose
  .connect(`mongodb+srv://sriharidinesh77:Asdfg123@cluster0.supo9kq.mongodb.net/foodapp?retryWrites=true&w=majority`)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

//-----------------------------------------------mongo admin

app.use(express.json());
const Food = require('./model/Food');

app.post("/addfood", (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.body.categoryName)
  const data = new Food({
    categoryName: req.body.categoryName,
    name: req.body.name,
    img: req.body.imageURL,
    regular: req.body.regular,
    medium: req.body.medium,
    large: req.body.large,
    description: req.body.description
  });

  data.save();
  res.json({ success: true});
});
//updating the card fetails
app.post("/updated/:id", async(req, res) => {
  const { id } = req.params;
  const { categoryName, name, imageURL, regular, medium, large, description } = req.body;

  try {
    // Find the document by ID and update its fields
    const updatedDocument = await Food.findByIdAndUpdate(
      id,
      {
        categoryName,
        name,
        imageURL,
        regular,
        medium,
        large,
        description,
      },
      { new: true } // Returns the updated document
    );

    if (!updatedDocument) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    res.json({ success: true, message: 'Document updated successfully', data: updatedDocument });
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
//deleting the item
app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the document by ID and delete it
    const deletedDocument = await Food.findByIdAndDelete(id);

    if (!deletedDocument) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    res.json({ success: true, message: 'Document deleted successfully', data: deletedDocument });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});







const AdminUser = require('./model/Adminuser');

app.post("/createuser", async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const data = new AdminUser({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email,
    });
    console.log(data);
    await data.save();
    res.redirect("/")
    
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
//data gathering...............................................................................




// //getting category
const catschema=new mongoose.Schema({
  catname:String,
})
const category=mongoose.model('type',catschema)
// const catdata = new category({
//     catname:"dinesh",
// })
// catdata.save();
// //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


app.post('/adminaddcat', async (req, res) => {
    try {
      const catdata = new category({
        catname:req.body.categoryName,
        })
    catdata.save();
    res.json({ success: true, message: 'Category Added successfully'});
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  
});

app.post('/getcategories', async (req, res) => {
  try {
    const data =await  category.find();
    console.log(data)
  res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }

});
//deleting the category
app.delete('/deletecategory/:id',async(req,res)=>{
  const { id } = req.params;
  try {
    const deletedDocument = await category.findByIdAndDelete(id);
    if (!deletedDocument) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    res.json({ success: true, message: 'category deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
})


app.post('/getalldata', async (req, res) => {
  try {
    // Use the Mongoose find method to retrieve all documents from the collection
    const allData = await Food.find();
    const allDatacat = await category.find();

    // Combine the data into a single object
    const combinedData = {
      foodData: allData,
      categoryData: allDatacat
    };

    // Send the combined data as a JSON response
    res.json(combinedData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//admin edit option here
app.get('/getalldata/:id', async (req, res) => {
  const { id } = req.params;
  console.log("this is called admin edit")
  try {
    // Use the id parameter to fetch data from MongoDB
    const result = await Food.findById(id);
    
    if (!result) {
      return res.status(404).json({ error: 'Data not found' });
    }

    // Send the response back to the client
    res.json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







app.use(express.json()); // Parse JSON requests

app.get("/", (req, res) => {
  res.send("hi");
});

const { body, validationResult } = require('express-validator');
const User = require('./model/User');



//login start
//admin login
app.post("/loginuser", [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userRecord = await AdminUser.findOne({ email: req.body.email });

    if (!userRecord) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Email Address' }] });
    }
    if (req.body.password!==userRecord.password) {
      console.log(pwdcompare)
      return res.status(400).json({ errors: [{ msg: 'Invalid Password' }] });
    }
      const data={
        user:{
          id:userRecord.id
      }
      }
      const authtoken=jwt.sign(data,jwtSecret)
      res.json({ success: true, authtoken:authtoken });
      console.log(authtoken)
      console.log("User LoggedIn");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

////userorders
const Orders = require('./model/Orders');
app.post('/orderedData',async(req,res)=>{
  let data=req.body.order_data
  
  await data.splice(0,0,{Order_date:req.body.order_date})
  let emid=await Orders.findOne({'email':req.body.email})
  if(emid===null){
    try {
      await Orders.create({
        email:req.body.email,
        orderdata:[data]
      })
    } catch (error) {
      console.log(error)
    }
  }
  else{
    try {
      console.log("it is old")
      await Orders.findOneAndUpdate({email:req.body.email},
        {
          $push:{orderdata:data}}).then(()=>{
            res.json({success:true})
          })
    } catch (error) {
      console.log(error)
    }
  }
})


app.post("/updateStatus", (req, res) => {
  const { orderId, status } = req.body;

  // Find the order by orderId
  const orderToUpdate = orders.find((order) => order.order_id === orderId);

  if (orderToUpdate) {
    // Update the status
    orderToUpdate.orderdata[0][0].status = status;
    res.status(200).send("Status updated successfully");
  } else {
    res.status(404).send("Order not found");
  }
});

app.post('/myorderedData', async (req, res) => {
  try {
    const mydata = await Orders.find();
    res.json({ Orderdata: mydata || [] });
  } catch (error) {
    console.error('Error fetching my order data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/updateOrderStatus',async(req,res)=>{
  
  const order = await Orders.findById(req.body.orderId);
  const orderData = order.orderdata;
  //console.log( orderData[req.body.itemIdx][0].status)
  try {
    const updated = await Orders.findOneAndUpdate(
      { _id: req.body.orderId },
      {
        $set: {
          [`orderdata.${req.body.itemIdx}.0.status`]: req.body.newStatus
        }
      },
      { new: true } 
    );
    
    res.json({ Orderdata: true });
  } catch (error) {
    console.error('Error fetching my order data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
