const express = require('express');
const port = 8000;
const path = require('path');

//including ur DATABASE Configuration
const db = require('./config/mongoose');
const { update } = require('./models/contact');

//this Contact will be used to create enteries
const Contact = require('./models/contact');

//app is naming convention
//we need to fire express to get all of its functionalites
const app = express();

// telling express to use to ejs as the template/view engine
app.set('view engine','ejs');

//telling ejs the directory to store view/template
app.set('views',path.join(__dirname,'views'));

//setting the middleware,, use signifies middleware
app.use(express.urlencoded());

//including static files
app.use(express.static("./assets"));


//setting the response from server
//controller for route homepage
// R-read
app.get('/',function(req,res){

    Contact.find({},function(err,contacts){
        if(err){
            console.log("error in fetching contacts from Database : ", err);
            return ;
        }

        return res.render('home',{
            title:"Contacts list",
            contact_list : contacts
        });

    }).collation({
        locale: "en",
        strength: 1
     }).sort({
         name:1
     });
});

//C-create
//controller for route create-contact
app.post('/create-contact',function(req,res){

    // lets see how ajax sends request
    console.log(req.body);
    

    Contact.create(req.body,function(err,newContact){
        if(err){
            console.log("error in creating contact",err);
            return;
        }
        //if contact created
        console.log('********',newContact);
        res.send('contact created and back in ajax');
    });
});

//D-delete
//controller for route delete-contact(app.delete works with AJAX)
// method:2 ---- Request.Query
app.get('/delete-contact',function(req,res){

    console.log('lets see the request sent by ajax',req.query);
    //extract the id of contact to be deleted
    let id = req.query.id;

    //find the contact with this id in the database and delete it
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error in deleting the contact");
            return ;
        }
        console.log("the contact has been deleted from the database");  
        return;
    });

    console.log('here in controller');

    res.send("contact deleted and back to ajax");
});

// -------------------------------------------------------------
// U-Update
//route and controller for update request
app.post('/update-contact',function(req,res){

    let id = req.body.id;
    let updatedContact ;
    Contact.findByIdAndUpdate(id,{
        name: req.body.name,
        phone: req.body.phone
        },function (err,docs) {
            if (err){
                console.log(err);
            }
            
            updatedContact = docs;
            console.log("Updated User : ",updatedContact);

           return;
        }
        );   
    
    console.log('contact updated and now in *********controller********')
    res.send(`contact updated and back in ajax`);

});



// running the server
app.listen(port,function(err){
    if(err){
        console.log("error in running the server: ",err);
    }
    console.log('Yup!!! My Express Server is Running on port: ',port);
});