const express =require("express");
const user =require("../user")
const router = new express.Router();
const auth = require('../middleware/auth');


router.post("/user",async (req,res) =>{
    const newuser = new user(req.body)
    try{
        await newuser.save();
        const token= await newuser.generateAuthToken();
        res.status(201).send({newuser,token})
    }catch(e){
        console.log('error',e)
        res.status(400).send()
    }
})

router.get('/user/me',auth,async(req,res)=>{
   
        res.send(req.user)
    
})


router.patch('/user/me',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
         updates.forEach((update) => req.user[update] = req.body[update])
         await req.user.save(); 
         res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/user/me',auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

// route for logging the user 

router.post('/user/login', async(req,res) =>{
    try{
         const User = await user.findByCredentials(req.body.email,req.body.password)
         const token = await User.generateAuthToken();
         res.send({User,token})
            
    }
    catch(e){
        res.status(400).send();
    }
})

router.post('/user/logout',auth,async(req,res)=>{
    try{
          req.user.tokens = req.user.tokens.filter((token)=>{
              return token.token !== req.token
          })

          await req.user.save()
          res.send()
    }
    catch(e){
        res.status(500).send()
    }
})

router.post('/user/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens=[]
        await req.user.save();
        res.send()
    }
    catch(e){res.status(500).send()}
})

module.exports = router;