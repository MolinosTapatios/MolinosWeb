import conn from "./conexion.js"
import md5 from "md5"

export const validarUsuario = ({username, password}) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * from usuarios where username = '${username}'`,(error, result,fields)=>{
            if (error) {
                reject(error);
              } else {
                if(md5(password) === result[0].password){
                  resolve({
                    id:result[0].id,
                    tipo:result[0].tipo_usuario_id,
                    flag:true,
                  })
                }else{
                  resolve({
                    flag: false,
                    msg: 'Usuario o contraseña incorrecto'
                  })
                }
              }
        })
    })
}