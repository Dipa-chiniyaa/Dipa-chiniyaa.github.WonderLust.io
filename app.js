//basic setup
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/Listing");
const methodOverride = require("method-override");

//path definition
const path = require("path");
const Listing = require("./models/Listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
//before connection to mongo be sure to connect with mongosh and start the server
async function main() {
  await mongoose.connect(MONGO_URL);
}
//settings
app.set("view engine", 'ejs');
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))


//our basic API
//root
app.get("/", (req, res) => {
  res.send("Hi, I'm Root");
});

//detail page API
app.get("/listings", async (req,res) =>{
  let allListings = await listing.find({});
  res.render('listings/index.ejs',{allListings});
});

//create New Listing page API
app.get("/listings/new", (req,res)=>{
  res.render("listings/new.ejs")
});


// detail page with ID API
app.get("/listings/:id", async (req,res) => {
  let {id} = req.params;
  const myListing = await Listing.findById(id);
  res.render("listings/show.ejs",{myListing});
});

//first step API of UPADTE
app.get("/listings/:id/edit", async (req,res) => {
  let {id} = req.params;
  //purpose of this listing is to feel existing data in form
  const editingListing = await Listing.findById(id);
  res.render("listings/edit.ejs",{editingListing});
});

//main API of UPDATE
app.put("/listings/:id",async (req,res)=>{
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//Deleting API
app.delete("/listings/:id", async (req,res)=>{
  let {id} = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
  // console.log("Let's Delete this record: ",deletedListing);
});

//new listing API
app.post("/listings",async (req,res)=>{
  const newListing = new Listing(req.body.listing) ;
  await newListing.save();
  res.redirect("/listings");
});


app.listen(8080, () => {
  console.log("server set on port 8080");
});


/** --------------------------- Project Phasse #01 : getting started with Route -----------------------------
 * 
 * 
 * 
 
//this is testing root for our listing model
// app.get("/getlisting", async (req,res) => {
//     let listingExample = new listing({
//       title:"my own Villa",
//       description : "By the Beach",
//       price:1200,
//       location:"manhattam, USA",
//       country:"USA",

//     });
//     await listingExample.save();
//     console.log("saved data successfully");
//     res.send("successful testing");

// });



 *  
 * ----------------------------------------------------------------------------------------------------------
 */