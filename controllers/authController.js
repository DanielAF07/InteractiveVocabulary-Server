
exports.autenticarUsuario = async (req, res) => {

    if(req.body.user === process.env.USER_EMAIL && req.body.password === process.env.USER_PW){
        return res.status(200).json({auth: true})
    } else {
        return res.status(400).json({auth: false})
    }

}