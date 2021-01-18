import axios from 'axios';
import * as http from 'http';
import * as https from 'https';
import OracleInfos from './config/OracleInfos';

const UPDATE_INTERVAL = 3600 * 1000; // 1 hour
const QUOTE_TICKER = process.env.FEE_QUOTE_TICKER as string;
const FIXER_API_KEY = process.env.FIXER_API_KEY as string;
const POLYGON_API_KEY = process.env.POLYGON_API_KEY as string;

const ax = axios.create({
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  timeout: 15000,
});

type OracleType = 'stock' | 'forex' | 'crypto';
class Oracle {
  URLs: { [type: string]: string };

  data: {
    [asset: string]: {
      type: OracleType;
      ticker: string;
      price: number;
      lastUpdated: number;
    };
  };

  constructor() {
    this.URLs = {
      crypto:
        'https://api.coingecko.com/api/v3/coins/TICKER?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false',
      forex: `http://data.fixer.io/api/latest?access_key=${FIXER_API_KEY}&symbols=TICKER,${QUOTE_TICKER}`,
      stock: `https://api.polygon.io/v2/aggs/ticker/TICKER/prev?unadjusted=true&apiKey=${POLYGON_API_KEY}`,
    };

    this.data = {};
    for (const [asset, value] of Object.entries(OracleInfos)) {
      this.data[asset] = {
        type: value.type,
        ticker: value.ticker,
        price: 0,
        lastUpdated: 0,
      };
    }
  }

  buildURL(type: OracleType, ticker: string): string {
    return this.URLs[type].replace('TICKER', ticker);
  }

  // return asset price in QUOTE_TICKER quote
  async getPrice(asset: string): Promise<number> {
    if (asset === QUOTE_TICKER) {
      return 1;
    }

    const data = this.data[asset];
    const now = new Date().getTime();
    if (data.price !== 0 && now < data.lastUpdated + UPDATE_INTERVAL) {
      return data.price;
    }

    const URL = this.buildURL(data.type, data.ticker);
    try {
      const price = this.parseResposne(asset, (await ax.get(URL)).data);
      // Update price info
      this.data[asset].price = price;
      this.data[asset].lastUpdated = now;

      return price;
    } catch (err) {
      console.error(`Failed to load oracle price for ${asset}: ${err}`);
      return data.price;
    }
  }

  parseResposne(asset: string, response: any): number {
    const type = this.data[asset].type;
    const ticker = this.data[asset].ticker;

    if (type === 'forex') {
      const rates = response['rates'];
      const priceBase = rates[QUOTE_TICKER]; // Base / EUR
      const priceAsset = rates[ticker]; // Asset / EUR

      return priceBase / priceAsset; // Base / Asset
    }

    if (type === 'stock') {
      return parseFloat(response['results'][0]['vw']);
    }

    if (type === 'crypto') {
      return response['market_data']['current_price'][
        QUOTE_TICKER.toLocaleLowerCase()
      ];
    }

    return 0;
  }
}

export = Oracle;
