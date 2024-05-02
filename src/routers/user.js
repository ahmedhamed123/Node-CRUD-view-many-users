const express=require('express')
const User = require('../models/schema')
const mongoose = require('mongoose');
const router =express.Router()


router.post('/user/add.html',(req,res)=>{

    

    const user=new User(req.body)
    
    user.save()
    .then((user)=>{res.status(200).redirect("/")})
    .catch((e)=>{res.status(400).send(e)})
})

router.post('/search',(req,res)=>{
    User.find({$or:[{firstName: req.body.searchText},
        {lastName: req.body.searchText}]})
    .then((user)=>{
        // console.log(user);
        res.status(200).render("user/search",{usersSearch : user})
        
    })
    .catch((e)=>{res.status(400).send(e+"0000000000")})
})




router.get("/user/add.html",(req,res)=>{
    res.render("user/add")
    
  })

 


router.get("/",(req,res)=>{
    User.find({})
    .then((users)=>{
        res.status(200).render("index",{usersArray : users} )
        
    })
    .catch(e => {
        console.error('Error fetching users:', e);
        res.status(500).render('error', { error: 'Failed to load users' });
    })


  })

  




  router.get("/edit/:id",(req,res)=>{
    const _id=req.params.id

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("Invalid ID format");
    }

    User.findById(_id)
    .then((user)=>{
        if(!user){
           return res.status(404).send("UNABLE to find user")
        }
        res.status(200).render("user/edit",{editUser:user})
        // console.log(user)
    })
    .catch((e)=>{res.status(500).send("the error is"+e)})
    
  })



//   -----------------------------
 router.get("/user/:id",(req,res)=>{
    const _id=req.params.id

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("Invalid ID format");
    }

    User.findById(_id)
    .then((user)=>{
        if(!user){
           return res.status(404).send("UNABLE to find user")
        }
        res.status(200).render("user/view",{showUser:user})
        // console.log(user)
    })
    .catch((e)=>{res.status(500).send("the error is"+e)})
 })


//--------------------------------
router.put("/edit/:id", async(req,res)=>{
    
    try{
        const _id=req.params.id
        const updates = Object.keys(req.body) 
        const user=await User.findById(_id)
    
        if(!user){
            return res.status(404).send("NO user founded")
        }
    
        updates.forEach((element)=>(user[element]=req.body[element]))
        await user.save()
        res.status(200).redirect("/")
    }
    
    catch(e){
        res.status(500).send(e)
    }

})


//--------

router.delete('/delete/:id',async(req,res)=>{
    try{
        const _id=req.params.id
        const user=await User.findByIdAndDelete(_id)

        if(!user){
            return res.status(404).send("NO user founded")
        }
        res.status(200).redirect("/")
    }

    catch(e){
        res.status(500).send(e)
    }
  })













module.exports=router