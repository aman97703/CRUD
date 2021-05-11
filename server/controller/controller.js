var Userdb = require('../model/model');

// create and sabe new user
exports.create = (req,res)=>{
    // validate the request
    if(!req.body){
        res.status(400).send({
            message: "content can not be empty"
        });
        return;
    }

    // new user 
    const user = new Userdb({
        name :req.body.name,
        email :req.body.email,
        gender :req.body.gender,
        status :req.body.status
    })

    // save user in the database
    user
        .save(user).then(data =>{
            // res.send(data);
            res.redirect('/addUser')
        }).catch(err=>{
            res.status(500).send({
                message: err.message || "some error occured while creatign a create operation"
            });
        })
}

// retrieve and return all users
exports.find = (req,res)=>{

    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id).then(data=>{
            if(!data){
                res.status(404).send({message: `can not find user by id : ${id}. May be id is wrong`})
            }
            else{
                res.send(data)
            }
        }).catch(err=>{
            res.status(500).send({message: `Error while retriving`})
        })

    }else{
        Userdb.find().then(user => {
            res.send(user)
        }).catch(err =>{
            res.status(500).send({message: err.message || "Error occured while retriving user information"})
        })
    }

}

// update a new identfied by user id
exports.update = (req,res)=>{
    if(!req.body){
        return res.status(400).send({message: "Data can not be empty"});
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false}).then(data=>{
        if(!data){
            return res.status(404).send({message:`can not update user with ${id}. May be user not found!`})
        }else{
            res.send(data)
        }
    }).catch(err=>{
        res.status(500).send({message: "ErrorUpdate user information"});
    })

}

// delete a  user  by id
exports.delete = (req,res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id).then(data=>{
        if(!data){
            res.status(404).send({message: `can not delete with id : ${id}. May be id is wrong`})
        }
        else{
            res.send({
                message: `User was deleted successfully which name is : ${req.query.name}`
            })
        }
    }).catch(err=>{
        res.status(500).send({message: `Could not dlt id : ${id}`})
    });
}
