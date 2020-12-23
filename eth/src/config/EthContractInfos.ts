const contractInfos: {
  [network: string]: {
    [asset: string]: {
      contract_address: string;
    };
  };
} = {
  bsc_testnet: {
    LUNA: {
      contract_address: '0xA1B4Aa780713df91e9Fa0FAa415ce49756D81E3b',
    },
    UST: {
      contract_address: '0x66BDf3Bd407A63eAB5eAF5eCE69f2D7bb403EfC9',
    },
    KRT:  {
      contract_address: '0x59a870b16adE2A152815Ba0d4Fa074fc3F71A828',
    },
    SDT: {
      contract_address: '0x5e2c2088d3fB10aAb25a0D323CdBEc5147232B1a',
    },
    MNT: {
      contract_address: '0x1449D1Ba8FB922E74F7761F077e77EAe66A0f8DA',
    },
    MIR: {
      contract_address: '0x320106A19C934ab8dbdde8056Ebae5A6f340720e',
    },
    mAAPL: {
      contract_address: '0x0dFa0F08136DA5d28618E7E31A7e24b01a95bB69',
    },
    mGOOGL: {
      contract_address: '0x56a31ea21862447E3Af9bfe76A45679E44103274',
    },
    mTSLA: {
      contract_address: '0xA2a42F0deB45ca7310a3C02A70fb569d5d5248FA',
    },
    mNFLX: {
      contract_address: '0xc6F5e6476958cA81eC8FC68A1ea7c68206b0e501',
    },
    mQQQ: {
      contract_address: '0x1Ad3354B2E7C0F7D5A370a03CAf439DD345437a9',
    },
    mTWTR: {
      contract_address: '0x5C4273b1B20112321f0951D0bC2d5eD40c800226',
    },
    mMSFT: {
      contract_address: '0xE4f2C30E938c24ee874dfDFAb20fFFBA81323457',
    },
    mAMZN: {
      contract_address: '0xfBC94545AD2ff3F7B009258FB43F2EAb46744767',
    },
    mBABA: {
      contract_address: '0xFc78bf14Dc997e681dAc4b4D811B45026d04123F',
    },
    mIAU: {
      contract_address: '0xeff3b95faC30230D30F8c8222670A3812D79857B',
    },
    mSLV: {
      contract_address: '0x662DDF725F5BDE9b31BBD16793Fd0c234F67979B',
    },
    mUSO: {
      contract_address: '0x5D428492846bd05D8137e56Fe806D28606453cbf',
    },
    mVIXY: {
      contract_address: '0x57986628daaDC418E09A2917D6c8b793B7dC1ACD',
    }
  },
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
