import jwt from "jsonwebtoken"

const userExtractor = (_req, res, next) => {
    try {
        const autorizacion = _req.get('authorization')

        let token = ''

        if (autorizacion && autorizacion.toLocaleLowerCase().startsWith('bearer')) {
            token = autorizacion.substring(7)
        }


        let decodeToker = {}
        decodeToker = jwt.verify(token, process.env.SECURITY)

        if (!token || !decodeToker.id) {
            res.status(401).json({
                error: "Error token invalido"
            })
        }

        const {id:userId} = decodeToker

        _req.userId = userId

        next()

    } catch (error) {
        res.status(404).json({
            error:"token invalido"
        })
    }
}

export default userExtractor