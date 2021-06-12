function authUser(req, res, next){
    if(req.session.user){
        next()
    }else{
        res.send('Sorry, you need to sign in')
    }
}

function authRole(role){
    return (req, res, next) => {
        if(req.session.user == !role){
            res.status(401)
            return res.send('Not allowed')
        }
        next()
    }
}

module.exports = {
    authUser,
    authRole
};
//AUTHORIZATION
//app.use(req, res, next()){
  