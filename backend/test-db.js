const pool = require("./config/database");

async function testarConexao() {
    try {
        const resultado = await pool.query("SELECT NOW()");
        console.log("✅ Conectado ao PostgreSQL!");
        console.log("Horário do banco:", resultado.rows[0].now);
    } catch (erro) {
        console.error("❌ Erro ao conectar ao PostgreSQL:");
        console.error(erro.message);
    } finally {
        await pool.end();
    }
}

testarConexao();