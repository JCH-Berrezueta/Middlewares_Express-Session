const validarSession = (req, res, next) => {
    if (req.session && req.session.user === "Jonathan" && req.session.admin === true) {
        console.log("OK");
        next();
    } else {
        res.status(401).json({
            message: 'No hay sesion iniciada'
        });
    }
}

const validarLogin = (req, res) => {
    if (req.session && req.session.user === "Jonathan" && req.session.admin === true) {
        res.status(401).json({
            message: 'Validacion exitosa'
        });
    } else {
        res.status(401).json({
            message: 'No hay sesion iniciada'
        });
    }
}



const login = (req, res) => {
    if (!req.query.username || !req.query.password) {
        res.send('login failed');
    } else if (req.query.username === "Jonathan" || req.query.password === "100111000011") {
        req.session.user = "Jonathan";
        req.session.admin = true;
        res.send("login success!");
    }
}


const logout = (req, res) => {
    req.session.destroy();
    res.send("logout success!");
}

module.exports = {
    login,
    logout,
    validarLogin,
    validarSession
}
