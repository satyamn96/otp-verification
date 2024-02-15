import axios from "axios";

const getRandom6DigitNumber = () => {
  const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);
  return randomSixDigitNumber;
};

const expiresAtTime = () => {
  const currentDate = new Date();
  const nextHalfHour = new Date(currentDate.getTime() + 5 * 60000);
  return nextHalfHour;
};

const sendOtp = async (otp, sender, send_to) => {
  const { gupshupUserid, gupshupPassword, gupshuptemplate } = sender;
  const url = "http://enterprise.smsgupshup.com/GatewayAPI/rest";
  const message = gupshuptemplate.replace(/\{#var#\}/g, otp);
  const data = {
    "method": "sendMessage",
    "send_to": `${send_to}`,
    "msg": `${message}`,
    "v": 1.1,
    "msg_type": "UNICODE_TEXT",
    "userid": `${gupshupUserid}`,
    "auth_scheme": "PLAIN",
    "password": `${gupshupPassword}`,
    "format": "JSON"
  };
  const config = {
    url: url,
    maxBodyLength: Infinity,
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    data: data
  };
  const response = await axios.request(config);
  const sentOtp = await response.data;
  return sentOtp;
}

export { getRandom6DigitNumber, expiresAtTime, sendOtp };
