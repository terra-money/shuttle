const contractInfos: {
  [network: string]: {
    [asset: string]: {
      contract_address: string;
    };
  };
} = {
  ropsten: {
    LUNA: {
      contract_address: '0xbf51453468771D14cEbdF8856cC5D5145364Cd6F',
    },
    UST: {
      contract_address: '0x6cA13a4ab78dd7D657226b155873A04DB929A3A4',
    },
    KRT: {
      contract_address: '0xF0b0fB87017b644eC76644Ea0FA704BFA5f20F0E',
    },
    SDT: {
      contract_address: '0x1d805d8660Ae73E3624AECAa34ca5FcF8E26E0a5',
    },
    MNT: {
      contract_address: '0x51e7f3ED326719a1469EbD7E68B8AB963d64eBA6',
    },
    MIR: {
      contract_address: '0xDAdC10D2dAC9E111835d4423670573Ae45714e7C',
    },
    mAAPL: {
      contract_address: '0xDAE57D13b42325562963C1E47E615eE25924635C',
    },
    mGOOGL: {
      contract_address: '0x58E3ba48E036341EF8Bbe0bF49caA9731Cc5C42B',
    },
    mTSLA: {
      contract_address: '0x2a445f4dA6Ea8845c594446b250ad535373bb7e4',
    },
    mNFLX: {
      contract_address: '0x1EA12ca0Ac017EfFE87ddF4c648a1a5359E850FA',
    },
    mQQQ: {
      contract_address: '0xE1d4509C539D9C3f1E01CeE22e7a79BF77348Ef3',
    },
    mTWTR: {
      contract_address: '0x0c9149d38AD1eBE71c50Bd04E0Ba4F999884C961',
    },
    mMSFT: {
      contract_address: '0x0736644C0257048861bAa72b6b234514c6b52655',
    },
    mAMZN: {
      contract_address: '0x3210BC26eB5427D0FC19dE7AB272b3BB3e4bC4b0',
    },
    mBABA: {
      contract_address: '0xF44c4C095E586B5a7Ba8AA0B2A8Dfad693d396b6',
    },
    mIAU: {
      contract_address: '0x51eD1489e3D311496592056608dD6cf025C03525',
    },
    mSLV: {
      contract_address: '0xECBe84E79bb26a7FF2474AA1b58d2696A9b5F58F',
    },
    mUSO: {
      contract_address: '0xDF00833C87bEfA3aF5634d81BE18E9DEf2F9C7c0',
    },
    mVIXY: {
      contract_address: '0xC1629641Cdb2D636Ae220fb759264306902c4AC0',
    },
  },
  mainnet: {
    LUNA: {
      contract_address: '0xd2877702675e6cEb975b4A1dFf9fb7BAF4C91ea9',
    },
    UST: {
      contract_address: '0xa47c8bf37f92aBed4A126BDA807A7b7498661acD',
    },
    KRT: {
      contract_address: '0xcAAfF72A8CbBfc5Cf343BA4e26f65a257065bFF1',
    },
    SDT: {
      contract_address: '0x676Ad1b33ae6423c6618C1AEcf53BAa29cf39EE5',
    },
    MNT: {
      contract_address: '0x156B36ec68FdBF84a925230BA96cb1Ca4c4bdE45',
    },
    MIR: {
      contract_address: '0x09a3EcAFa817268f77BE1283176B946C4ff2E608',
    },
    mAAPL: {
      contract_address: '0xd36932143F6eBDEDD872D5Fb0651f4B72Fd15a84',
    },
    mGOOGL: {
      contract_address: '0x59A921Db27Dd6d4d974745B7FfC5c33932653442',
    },
    mTSLA: {
      contract_address: '0x21cA39943E91d704678F5D00b6616650F066fD63',
    },
    mNFLX: {
      contract_address: '0xC8d674114bac90148d11D3C1d33C61835a0F9DCD',
    },
    mQQQ: {
      contract_address: '0x13B02c8dE71680e71F0820c996E4bE43c2F57d15',
    },
    mTWTR: {
      contract_address: '0xEdb0414627E6f1e3F082DE65cD4F9C693D78CCA9',
    },
    mMSFT: {
      contract_address: '0x41BbEDd7286dAab5910a1f15d12CBda839852BD7',
    },
    mAMZN: {
      contract_address: '0x0cae9e4d663793c2a2A0b211c1Cf4bBca2B9cAa7',
    },
    mBABA: {
      contract_address: '0x56aA298a19C93c6801FDde870fA63EF75Cc0aF72',
    },
    mIAU: {
      contract_address: '0x1d350417d9787E000cc1b95d70E9536DcD91F373',
    },
    mSLV: {
      contract_address: '0x9d1555d8cB3C846Bb4f7D5B1B1080872c3166676',
    },
    mUSO: {
      contract_address: '0x31c63146a635EB7465e5853020b39713AC356991',
    },
    mVIXY: {
      contract_address: '0xf72FCd9DCF0190923Fadd44811E240Ef4533fc86',
    },
  },
};

export = contractInfos;
