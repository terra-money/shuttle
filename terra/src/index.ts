require('dotenv').config();

import Shuttle from './Shuttle';

const shuttle = new Shuttle();

shuttle.startMonitoring().catch((err) => {
  console.error(`Exit with ${err}`);
});
