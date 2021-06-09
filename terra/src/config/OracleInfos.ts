const oracleInfos: {
  [asset: string]: {
    ticker: string;
    type:
      | 'forex' // http://data.fixer.io/api/latest?access_key=${API_KEY}&symbols=KRW,SDR,MNT,USD // base is EUR
      | 'stock' // https://api.polygon.io/v2/aggs/ticker/AAPL/prev?unadjusted=true&apiKey=${API_KEY}
      | 'crypto'; // https://api.coingecko.com/api/v3/coins/mirror-protocol?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false
  };
} = {
  LUNA: {
    ticker: 'terra-luna',
    type: 'crypto',
  },
  UST: {
    ticker: 'USD',
    type: 'forex',
  },
  KRT: {
    ticker: 'KRW',
    type: 'forex',
  },
  SDT: {
    ticker: 'XDR',
    type: 'forex',
  },
  MNT: {
    ticker: 'MNT',
    type: 'forex',
  },
  MIR: {
    ticker: 'mirror-protocol',
    type: 'crypto',
  },
  mAAPL: {
    ticker: 'AAPL',
    type: 'stock',
  },
  mGOOGL: {
    ticker: 'GOOGL',
    type: 'stock',
  },
  mTSLA: {
    ticker: 'TSLA',
    type: 'stock',
  },
  mNFLX: {
    ticker: 'NFLX',
    type: 'stock',
  },
  mQQQ: {
    ticker: 'QQQ',
    type: 'stock',
  },
  mTWTR: {
    ticker: 'TWTR',
    type: 'stock',
  },
  mMSFT: {
    ticker: 'MSFT',
    type: 'stock',
  },
  mAMZN: {
    ticker: 'AMZN',
    type: 'stock',
  },
  mBABA: {
    ticker: 'BABA',
    type: 'stock',
  },
  mIAU: {
    ticker: 'IAU',
    type: 'stock',
  },
  mSLV: {
    ticker: 'SLV',
    type: 'stock',
  },
  mUSO: {
    ticker: 'USO',
    type: 'stock',
  },
  mVIXY: {
    ticker: 'VIXY',
    type: 'stock',
  },
  aUST: {
    ticker: 'USD',
    type: 'forex',
  },
  mFB: {
    ticker: 'FB',
    type: 'stock',
  },
  ANC: {
    ticker: 'anchor-protocol',
    type: 'crypto',
  },
  vETH: {
    ticker: 'ethereum',
    type: 'crypto',
  },
  bETH: {
    ticker: 'ethereum',
    type: 'crypto',
  },
};

export = oracleInfos;
