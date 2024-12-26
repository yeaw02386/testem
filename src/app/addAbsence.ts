'use server';
import mysql from 'mysql2/promise';

export async function addAbusence(formData:FormData){
    try {
        // Connect to MySQL
        const connection = await mysql.createConnection({
          host: '127.0.0.1',      // Update with your database host
          user: 'user01',           // Update with your MySQL user
          password: 's$crete01',   // Update with your MySQL password
          database: 'testem', 
          port: 3306  // Update with your database name
        })

        console.log(Object.values(formData))
        const query =`
      INSERT INTO absence_data
      (name,phone_number,cause,type,absence_begin_data,absence_end_data, timestamp,accept_status)
      VALUES (?, ?, ?, ?, ?, ?, ?,?)
    `;
        const[result,fields] = await connection.execute(query,Object.values(formData))
        console.log(result)

        await connection.end()

    }catch (error) {
        console.error('Database error:', error);
        
      }
}