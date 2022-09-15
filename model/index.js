const mongoose = require('mongoose');
const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }

    mongoose.connect('mongodb+srv://banda:bandabanda@cluster0.aqaj3o5.mongodb.net/?retryWrites=true&w=majority', {
        dbName: 'sample_traning',
        useNewUrlParser: true,
        userCreateIndex: true,
    }, (error) => {
        if (error) {
            console.log('몽고디비 연결 에러', error);
        } else {
            console.log('몽고디비 연결 성공');
        }
    });
}

mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
});

mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다');
    connect();
});

module.exports = connect;