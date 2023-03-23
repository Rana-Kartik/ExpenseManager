

const jwt = require('jsonwebtoken')

module.exports =async function(req,res,proceed){
   
    try{
        const token = req.cookies.token
        if(!token){
            return res.status(500).json({
                statuscode : 500,
                message : 'you can Login'
            })
        }
        else
        {
            const decoded = jwt.verify(token, 'secret')
            req.userid = decoded.userid
            proceed()
        }
    }
    catch(error){
        return res.status(500).json({
            message : 'error'
        })
    }
}