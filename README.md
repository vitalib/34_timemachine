# Timer for Websites That Steal Your Time 
URL to timer script: https://cdn.rawgit.com/vitalib/34_timemachine/32a8c278/index.js
This project helps to control time was spent on sites. It requires special extension for Chrome browser.

# Installing

Install extension for Chrome browser [Custom JavaScript for websites](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija).

Open configuration of [cjs](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija) browser extension on the site you want to controll. Click on the link "your own external scripts", add path https://cdn.rawgit.com/vitalib/34_timemachine/32a8c278/index.js. Don`t forget to press "enable cjs for this host" to enable custom JS.

After that in top-left corner of web page you will see a countdown timer. After 3 minutes it will throw pop-up remainders. 

For faster development you can use JS code hosted on localhost. Simple web server can be used for that, run:

```bash

python3 -m http.server
```

Add path `http://localhost:8000/index.js` to [cjs](https://chrome.google.com/webstore/detail/custom-javascript-for-web/poakhlngfciodnhlhhgnaaelnpjljija) browser extension. Done.


# Project Goals

The code is written for educational purposes. Training course for web-developers - [DEVMAN.org](https://devman.org)
