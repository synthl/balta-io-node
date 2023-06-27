
// importando as tecnologias (Criando um servidor Web)
const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');
const port = normalizePort(process.env.PORT || '3000'); // porta da aplicação

app.set('port', port); // setando a porta para a const port

const server = http.createServer(app); // criando o servidor

// servidor ouvindo a porta
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log(`API rodando na porta ${port}`);

// normalizando a porta onde estará a rodando essa API (Normalizando a porta)
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

// tratando erros da API não conseguir rodar em casos de privilégios não suficientes ou serviço já em uso (Gerenciando Erros do Servidor)
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
        'Pipe' + port :
        'Port' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// configuração do debug (Iniciando o Debug)
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : 'port ' + addr.port;
    debug(`Listening on ${bind}`);
}