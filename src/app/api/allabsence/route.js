import mysql from 'mysql2/promise';

export async function GET(request) {

    var allAbsence;
    try {
        // Connect to MySQL
        const connection = await mysql.createConnection({
          host: '127.0.0.1',      // Update with your database host
          user: 'user01',           // Update with your MySQL user
          password: 's$crete01',   // Update with your MySQL password
          database: 'testem', 
          port: 3306  // Update with your database name
        })

        const query ="select * from absence_data"
        const[result,ields] = await connection.execute(query)
        allAbsence = result
        console.log(result)

        await connection.end()

    }catch (error) {
        console.error('Database error:', error);
        
      }

    
    return Response.json(allAbsence);
  }