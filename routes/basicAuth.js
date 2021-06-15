function authUser(req, res, next){
    if(req.session.user){
        next()
    }else{
        //alert('Sorry, you need to sign in');
        res.redirect("/login")
    }
}

function authRole(role){
    return (req, res, next) => {
        if(req.session.user.role === role){
            next()
        }else{
            res.status(401)
            return res.send('Not allowed')
        }
        
    }
}

module.exports = {
    authUser,
    authRole
};

  