const cors = require('cors');

let whitelist;
if (process.env.PRODUCTION_BUILD === 'true') {
    whitelist = ['http://localhost:4200', 'http://localhost:8100', 'https://techsessoriesbd.com', 'https://www.techsessoriesbd.com'];
} else {
    whitelist = ['http://localhost:4200', 'http://localhost:8100', 'https://techsessoriesbd.com', 'https://www.techsessoriesbd.com'];
}

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(
                new Error('Not allowed by CORS')
            )
        }
    }
}

module.exports = cors(corsOptions);
