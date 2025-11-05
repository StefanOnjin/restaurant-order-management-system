const { pool } = require('../server/config/database');
const fs = require('fs').promises;
const path = require('path');

async function runMigrations() {
  try {
    console.log(' Pokrećem migracije...\n');

    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    
    const migrationsDir = path.join(__dirname, 'migrations');
    const files = await fs.readdir(migrationsDir);
    const sqlFiles = files.filter(f => f.endsWith('.sql')).sort();

    if (sqlFiles.length === 0) {
      console.log('  Nema migracija za izvršavanje');
      return;
    }

    for (const file of sqlFiles) {
      
      const check = await pool.query(
        'SELECT * FROM migrations WHERE name = $1',
        [file]
      );

      if (check.rows.length === 0) {
        console.log(` Izvršavam: ${file}`);
        
        const sql = await fs.readFile(
          path.join(migrationsDir, file),
          'utf-8'
        );

        await pool.query(sql);

        await pool.query(
          'INSERT INTO migrations (name) VALUES ($1)',
          [file]
        );

        console.log(` Uspešno: ${file}\n`);
      } else {
        console.log(`  Preskačem: ${file} (već izvršena)\n`);
      }
    }

    console.log(' Sve migracije izvršene!\n');

    
    const result = await pool.query(
      'SELECT name, executed_at FROM migrations ORDER BY executed_at'
    );
    console.log(' Izvršene migracije:');
    result.rows.forEach(row => {
      console.log(`   - ${row.name} (${new Date(row.executed_at).toLocaleString('sr-RS')})`);
    });

  } catch (error) {
    console.error(' Greška:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

runMigrations();