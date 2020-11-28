const contractInfos: {
  [network: string]: {
    [asset: string]: {
      contract_address: string;
    };
  };
} = {
  ropsten: {
    LUNA: {
      contract_address: '0xc52fe3575F96A3cA9d4b032b4CED4683DD4Eb386'
    },
    UST: {
      contract_address: '0x449c38576BaA2802F13a17E20B19004526F24903'
    },
    KRT: {
      contract_address: '0xb335c9cCC284951d7087A9F07884F02af09B17dB'
    },
    SDT: {
      contract_address: '0x72F56282d9d682879849C8b3a5C03C00997a5911'
    },
    MNT: {
      contract_address: '0x346fE5b2f24cc4945A183C64915B091b67c04FF8'
    },
    MIR: {
      contract_address: '0x6705bEc064ea895102Be0D6Df3547535bb258f59'
    },
    mAAPL: {
      contract_address: '0x1eA5fA2Ff1f7d88275a7bD890470bBE0A79F51d1'
    },
    mGOOGL: {
      contract_address: '0x448F0B49d486C365B7DCAD78D27336DfD7dAc16E'
    },
    mTSLA: {
      contract_address: '0xFa93675dd5814060f0DE5297bD895847D43F257C'
    },
    mNFLX: {
      contract_address: '0x41C28A57C3e32a56e80Ceec8910eA8B5316D9543'
    },
    mQQQ: {
      contract_address: '0xf81D30D44aE6FfC2a1E02fa08783aBBCd224147f'
    },
    mTWTR: {
      contract_address: '0x2bECEB69354c8bBA28c8D8cFa1FC601861dE3821'
    },
    mMSFT: {
      contract_address: '0x741aDbdfFE13FDb97bfBF2353aA67Af696a1fE32'
    },
    mAMZN: {
      contract_address: '0x630bdA81E7b76CAA6EF0ecC49bc48dC3F5E46E65'
    },
    mBABA: {
      contract_address: '0xf20A4Bfdd525258389C3106B45A8bDE0cdef1396'
    },
    mIAU: {
      contract_address: '0x88f3aD3411031A3e5a342BCc9f353F6bb93D2824'
    },
    mSLV: {
      contract_address: '0x3eAFA8fbC7ebb7EDa384E3972bC0f53a5C0845De'
    },
    mUSO: {
      contract_address: '0x35a2A7a4e73e493E76368551A464Bb92ae409aFf'
    },
    mVIXY: {
      contract_address: '0xf4923A601EFfb26c133837cEa9a3D6F0954630EE'
    }
  },
  mainnet: {
    LUNA: {
      contract_address: '0xd2877702675e6cEb975b4A1dFf9fb7BAF4C91ea9'
    },
    UST: {
      contract_address: '0xa47c8bf37f92aBed4A126BDA807A7b7498661acD'
    },
    KRT: {
      contract_address: '0xcAAfF72A8CbBfc5Cf343BA4e26f65a257065bFF1'
    },
    SDT: {
      contract_address: '0x676Ad1b33ae6423c6618C1AEcf53BAa29cf39EE5'
    },
    MNT: {
      contract_address: '0x156B36ec68FdBF84a925230BA96cb1Ca4c4bdE45'
    },
    MIR: {
      contract_address: '0x09a3EcAFa817268f77BE1283176B946C4ff2E608'
    },
    mAAPL: {
      contract_address: '0xd36932143F6eBDEDD872D5Fb0651f4B72Fd15a84'
    },
    mGOOGL: {
      contract_address: '0x59A921Db27Dd6d4d974745B7FfC5c33932653442'
    },
    mTSLA: {
      contract_address: '0x21cA39943E91d704678F5D00b6616650F066fD63'
    },
    mNFLX: {
      contract_address: '0xC8d674114bac90148d11D3C1d33C61835a0F9DCD'
    },
    mQQQ: {
      contract_address: '0x13B02c8dE71680e71F0820c996E4bE43c2F57d15'
    },
    mTWTR: {
      contract_address: '0xEdb0414627E6f1e3F082DE65cD4F9C693D78CCA9'
    },
    mMSFT: {
      contract_address: '0x41BbEDd7286dAab5910a1f15d12CBda839852BD7'
    },
    mAMZN: {
      contract_address: '0x0cae9e4d663793c2a2A0b211c1Cf4bBca2B9cAa7'
    },
    mBABA: {
      contract_address: '0x56aA298a19C93c6801FDde870fA63EF75Cc0aF72'
    },
    mIAU: {
      contract_address: '0x1d350417d9787E000cc1b95d70E9536DcD91F373'
    },
    mSLV: {
      contract_address: '0x9d1555d8cB3C846Bb4f7D5B1B1080872c3166676'
    },
    mUSO: {
      contract_address: '0x31c63146a635EB7465e5853020b39713AC356991'
    },
    mVIXY: {
      contract_address: '0xf72FCd9DCF0190923Fadd44811E240Ef4533fc86'
    }
  }
};

export = contractInfos;
