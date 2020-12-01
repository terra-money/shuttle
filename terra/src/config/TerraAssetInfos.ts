const assetInfos: {
  [network: string]: {
    [asset: string]: {
      contract_address?: string;
      denom?: string;
    };
  };
} = {
  'tequila-0004': {
    LUNA: {
      denom: 'uluna'
    },
    UST: {
      denom: 'uusd'
    },
    KRT: {
      denom: 'ukrw'
    },
    SDT: {
      denom: 'usdr'
    },
    MNT: {
      denom: 'umnt'
    },
    MIR: {
      contract_address: 'terra10llyp6v3j3her8u3ce66ragytu45kcmd9asj3u'
    },
    mAAPL: {
      contract_address: 'terra16vfxm98rxlc8erj4g0sj5932dvylgmdufnugk0'
    },
    mGOOGL: {
      contract_address: 'terra1qg9ugndl25567u03jrr79xur2yk9d632fke3h2'
    },
    mTSLA: {
      contract_address: 'terra1nslem9lgwx53rvgqwd8hgq7pepsry6yr3wsen4'
    },
    mNFLX: {
      contract_address: 'terra1djnlav60utj06kk9dl7defsv8xql5qpryzvm3h'
    },
    mQQQ: {
      contract_address: 'terra18yx7ff8knc98p07pdkhm3u36wufaeacv47fuha'
    },
    mTWTR: {
      contract_address: 'terra1ax7mhqahj6vcqnnl675nqq2g9wghzuecy923vy'
    },
    mMSFT: {
      contract_address: 'terra12s2h8vlztjwu440khpc0063p34vm7nhu25w4p9'
    },
    mAMZN: {
      contract_address: 'terra12saaecsqwxj04fn0jsv4jmdyp6gylptf5tksge'
    },
    mBABA: {
      contract_address: 'terra15dr4ah3kha68kam7a907pje9w6z2lpjpnrkd06'
    },
    mIAU: {
      contract_address: 'terra19dl29dpykvzej8rg86mjqg8h63s9cqvkknpclr'
    },
    mSLV: {
      contract_address: 'terra1fdkfhgk433tar72t4edh6p6y9rmjulzc83ljuw'
    },
    mUSO: {
      contract_address: 'terra1fucmfp8x4mpzsydjaxyv26hrkdg4vpdzdvf647'
    },
    mVIXY: {
      contract_address: 'terra1z0k7nx0vl85hwpv3e3hu2cyfkwq07fl7nqchvd'
    }
  },
  'columbus-4': {
    LUNA: {
      denom: 'uluna'
    },
    UST: {
      denom: 'uusd'
    },
    KRT: {
      denom: 'ukrw'
    },
    SDT: {
      denom: 'usdr'
    },
    MNT: {
      denom: 'umnt'
    }
  }
};

export = assetInfos;
