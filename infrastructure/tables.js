class Tables {
    init(connection){
        this.connection = connection;
        this.criarAtendimento();
    }

    criarAtendimento(){
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(100) NOT NULL, pet varchar(30) NOT NULL, servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'

        this.connection.query(sql, (error) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Tabela Atendimentos criada com sucesso!");
            }
        });
    }
}

module.exports = new Tables