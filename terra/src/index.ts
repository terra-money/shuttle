require("dotenv").config();

import Shuttle from './Shuttle';

const shuttle = new Shuttle();

shuttle.startMonitoring().then().catch(err => {
    console.log(`Exit with ${err}`)
});
