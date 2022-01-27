var express = require('express');
const dotenv = require('dotenv');
const {RtcTokenBuilder, RtmTokenBuilder, RtcRole, RtmRole} = require('agora-access-token');

//configure dotenv to get private keys in .env
dotenv.config();

//configure express for routes management
var app = express();

//get the default port
var PORT = process.env.PORT;

/*
    appid and app certificate from agora dashboard, they are used to generate agora access token
    replace this with your own
*/


appID="65257899b2a74d5689f9e596d2848566" //app id
appCertificate="d5b905576e874d33ab07a85424cc9fdb"  //certificate key


/*

    - this is the function used to generate the token
    - pass the channel name as a string 
    - return is a json object with token
*/
var generateAccessToken =  (channel) => {

    const uid = 0;
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 84600
    const currentTimestamp = Math.floor(Date.now() / 1000)
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

    // Build token with uid
    const token = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, uid, role, privilegeExpiredTs);
    console.log({token, uid});
    return {token};
};

//default route
app.get("/", (req, res) => res.json('Welcome to Roomies'));

//route to generate the token
app.get("/generatetoken", async (req, res) => {
    var channel = req.query.channel
    return res.json(generateAccessToken(channel));
});

//port assigned to your script
app.listen(PORT, () =>  console.log('Service URL http://127.0.0.1:' + PORT + "/"));