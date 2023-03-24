import dotenv from 'dotenv'
import mysql from 'mysql2'
dotenv.config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    ssl: {"rejectUnauthorized":true}
  });

  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to MySQL database:', error)
      return
    }
    console.log('Connected to MySQL database.')
  });

export default connection


// const connection = mysql.createConnection(process.env.DATABASE_URL)
// console.log('Connected to PlanetScale!')

// export default connection