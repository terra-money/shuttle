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
  mainnet: {}
};

export = contractInfos;
