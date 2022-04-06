const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
            return { bdString: "mongodb+srv://deoz_user:BBuebn7jYjOraTv1@cluster0.7lcvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", jwtSenha: "jwtsenha" }
        case 'hml':
            return { bdString: "mongodb+srv://deoz_user:BBuebn7jYjOraTv1@cluster0.7lcvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", jwtSenha: "jwtsenha" }
        case 'prod':
            return { bdString: "mongodb+srv://deoz_user:BBuebn7jYjOraTv1@cluster0.7lcvj.mongodb.net/EssentiaStudio?retryWrites=true&w=majority", jwtSenha: "jwtsenha" }
    }
    
}

console.log('api iniciada em: ' + env.toUpperCase() + " - ");

module.exports = config();