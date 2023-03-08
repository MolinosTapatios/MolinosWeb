import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'containers-us-west-93.railway.app',
    user: 'root',
    password: 'gupZAagttaKdHHSo4OFi',
    database: 'railway',
    port: '6769'
  });

  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to MySQL database:', error);
      return;
    }
    console.log('Connected to MySQL database.');
  });

export default connection