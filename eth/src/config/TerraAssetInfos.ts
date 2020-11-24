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
      contract_address: 'terra135uup8xwt6fec2jc664mcy0xnqjjh4y3efsqrh'
    },
    mAAPL: {
      contract_address: 'terra1y05wu4hsdzshsq9vtug2ttavtql6dcfrl0yv7s'
    },
    mGOOGL: {
      contract_address: 'terra1v0kd60lksznk482yh6yr8gu4ehfx298sq58w7y'
    },
    mTSLA: {
      contract_address: 'terra17qm6jss8nq36cazclyvhz5j5kuc8nk8ygwcnps'
    },
    mNFLX: {
      contract_address: 'terra1qdp36cxzkddw8s88wyw2sdpmxgvhld5ar4m5mr'
    },
    mQQQ: {
      contract_address: 'terra19re2s49qgs3uc0fegfaxx8yqzlyl0f8r725qrs'
    },
    mTWTR: {
      contract_address: 'terra1wjvwjuhkq99vh0wvxpx6ux0qj036mfsanlm34v'
    },
    mMSFT: {
      contract_address: 'terra15e990g3huu0ayfneja43lpvec6hlygmpjrqs2u'
    },
    mAMZN: {
      contract_address: 'terra1tgmnj654p4nlcvfny7cm65v3kn5pgu8tx6lnpe'
    },
    mBABA: {
      contract_address: 'terra1nff6yrcf3dnq57fn0c56ue8l86fs5eaf0l7uyh'
    },
    mIAU: {
      contract_address: 'terra10q9sksr0qy6ztz85yuyz65mndegwzlh3h706py'
    },
    mSLV: {
      contract_address: 'terra1rk4kstfxvpwd3vh6ygy3r3uf72cllrvnsuj9qh'
    },
    mUSO: {
      contract_address: 'terra1ntzes35xr0gtexgkg3v2tt599w7eda4nrtxe4v'
    },
    mVIXY: {
      contract_address: 'terra150ec7cwlsne4xh6h2z88hkrkgf37s8un577xmx'
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
