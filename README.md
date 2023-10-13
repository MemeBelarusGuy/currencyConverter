This is currency converter web-application.<br>
Your server folder should contain .env file.<br><br>
<b>.env file should have :</b><br>
PORT (optional) - 3333 or any other, but then you have to change links in axios methods!<br>
DB_URL - your mongoDB url.<br>
API_KEY - visit https://www.exchangerate-api.com/ to get your api key.<br>
<br>
Your mongoDB consists of 2 collections:<br>
1. currency - collection where stores currency data.<br>
Every object has:<br>
name (ex. USD),<br> rus (ex. Доллар США), <br>value : 1$ cost,<br>
isShowed:boolean
2. currencyupdates - collection where stores one object with information of last update.
   <br>
If <b>Date.now() - lastTimeUpdated > twoHours </b>, server ask API for new data and update our currency collection.<br>
   <br>
To run this project:<br>
cd ..server npm i && npm run start:dev<br>
cd ..client npm i && npm start
