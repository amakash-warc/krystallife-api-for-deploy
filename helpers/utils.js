const moment = require('moment-timezone');
const nodemailer = require("nodemailer");
const {google} = require("googleapis");

exports.getDateString = (date) => {
    return moment(date).tz("Asia/Dhaka").format('YYYY-MM-DD');
}

exports.getDateDifference = (diffType, startDate, endDate) => {
    if (typeof startDate === "string") {
        startDate = new Date(startDate)
    }
    if (typeof endDate === "string") {
        endDate = new Date(endDate)
    }
    const a = moment(startDate, 'M/D/YYYY').tz("Asia/Dhaka");
    const b = moment(endDate, 'M/D/YYYY').tz("Asia/Dhaka");
    return a.diff(b, diffType ? diffType : 'd');
}

exports.convertToDateTime = (dateStr, timeStr) => {
    const date = moment(dateStr).tz("Asia/Dhaka");
    const time = moment(timeStr, 'HH:mm');

    date.set({
        hour: time.get('hour'),
        minute: time.get('minute'),
        second: time.get('second')
    });
    return date.format();
}

exports.sendEmail = async (emailBody) => {
    try {
        const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
        const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
        const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
        const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

        const oAuth2Client = new google.auth.OAuth2(
          CLIENT_ID,
          CLIENT_SECRET,
          REDIRECT_URI,
        );
        oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

        const accessToken = await oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'techsessoriesbd.info@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const info = await transporter.sendMail(emailBody);

        console.log('info', info);

    } catch (error) {
        console.log(error);
    }
}
