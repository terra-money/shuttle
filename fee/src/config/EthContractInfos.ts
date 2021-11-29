const contractInfos: {
  [network: string]: {
    [asset: string]: {
      contract_address: string;
      black_list?: string[];
    };
  };
} = {
  bsc: {
    minter: {
      contract_address: '0x65866fbdb58c13d4c81f47779c11b1bfa127641f',
    },
    LUNA: {
      contract_address: '0xECCF35F941Ab67FfcAA9A1265C2fF88865caA005',
    },
    UST: {
      contract_address: '0x23396cF899Ca06c4472205fC903bDB4de249D6fC',
    },
    KRT: {
      contract_address: '0xfFBDB9BDCae97a962535479BB96cC2778D65F4dd',
    },
    SDT: {
      contract_address: '0x7d5f9F8CF59986743f34BC137Fc197E2e22b7B05',
    },
    MNT: {
      contract_address: '0x41D74991509318517226755E508695c4D1CE43a6',
    },
    MIR: {
      contract_address: '0x5B6DcF557E2aBE2323c48445E8CC948910d8c2c9',
    },
    mAAPL: {
      contract_address: '0x900AEb8c40b26A8f8DfAF283F884b03EE7Abb3Ec',
    },
    mGOOGL: {
      contract_address: '0x62D71B23bF15218C7d2D7E48DBbD9e9c650B173f',
    },
    mTSLA: {
      contract_address: '0xF215A127A196e3988C09d052e16BcFD365Cd7AA3',
    },
    mNFLX: {
      contract_address: '0xa04F060077D90Fe2647B61e4dA4aD1F97d6649dc',
    },
    mQQQ: {
      contract_address: '0x1Cb4183Ac708e07511Ac57a2E45A835F048D7C56',
    },
    mTWTR: {
      contract_address: '0x7426Ab52A0e057691E2544fae9C8222e958b2cfB',
    },
    mMSFT: {
      contract_address: '0x0ab06caa3Ca5d6299925EfaA752A2D2154ECE929',
    },
    mAMZN: {
      contract_address: '0x3947B992DC0147D2D89dF0392213781b04B25075',
    },
    mBABA: {
      contract_address: '0xcA2f75930912B85d8B2914Ad06166483c0992945',
    },
    mIAU: {
      contract_address: '0x1658AeD6C7dbaB2Ddbd8f5D898b0e9eAb0305813',
    },
    mSLV: {
      contract_address: '0x211e763d0b9311c08EC92D72DdC20AB024b6572A',
    },
    mUSO: {
      contract_address: '0x9cDDF33466cE007676C827C76E799F5109f1843C',
    },
    mVIXY: {
      contract_address: '0x92E744307694Ece235cd02E82680ec37c657D23E',
    },
    mFB: {
      contract_address: '0x5501F4713020cf299C3C5929da549Aab3592E451',
    },
    mCOIN: {
      contract_address: '0x49022089e78a8D46Ec87A3AF86a1Db6c189aFA6f',
    },
  },
  bsc_testnet: {
    minter: {
      contract_address: '0xB8C4943Ae02ab64Ea6d1f956136606F67bb0Cb56',
    },
    LUNA: {
      contract_address: '0xA1B4Aa780713df91e9Fa0FAa415ce49756D81E3b',
    },
    UST: {
      contract_address: '0x66BDf3Bd407A63eAB5eAF5eCE69f2D7bb403EfC9',
    },
  },
  hmy: {
    minter: {
      contract_address: '0xFda6AB27C9BcDF8bAc691bC135B04e792f219e84',
    },
    LUNA: {
      contract_address: '0x95CE547D730519A90dEF30d647F37D9E5359B6Ae',
    },
    UST: {
      contract_address: '0x224e64ec1BDce3870a6a6c777eDd450454068FEC',
    },
    aUST: {
      contract_address: '0x4D9d9653367FD731Df8412C74aDA3E1c9694124a',
    },
  },
  hmy_testnet: {
    minter: {
      contract_address: '0x2bE9ad04bd28297e4b3B97097F8ae9954FEb264A',
    },
    LUNA: {
      contract_address: '0xdfe87bF751D4abEb3E4926DdAa1e6736B07d8FF4',
    },
    UST: {
      contract_address: '0x0C096AdFdA2a3Bf74e6Ca33c05eD0b472b622247',
    },
  },
  ropsten: {
    minter: {
      contract_address: '0x5dFeBAFdd0079Cd6D32415bd2507B842812B8a0F',
    },
    LUNA: {
      contract_address: '0xbf51453468771D14cEbdF8856cC5D5145364Cd6F',
    },
    UST: {
      contract_address: '0x6cA13a4ab78dd7D657226b155873A04DB929A3A4',
    },
    aUST: {
      contract_address: '0x006479f75D6622AE6a21BE17C7F555B94c672342',
    },
    bETH: {
      contract_address: '0xDD7e8f8047D78bB103FAb4bAc1259Da207Da3861',
      black_list: ['0xA60100d5e12E9F83c1B04997314cf11685A618fF'],
    },
  },
  mainnet: {
    minter: {
      contract_address: '0x9123077acafb3d743c68418304b2a11566cc1175',
    },
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
    mFB: {
      contract_address: '0x0e99cC0535BB6251F6679Fa6E65d6d3b430e840B',
    },
    aUST: {
      contract_address: '0xa8De3e3c934e2A1BB08B010104CcaBBD4D6293ab',
    },
    ANC: {
      contract_address: '0x0F3ADC247E91c3c50bC08721355A41037E89Bc20',
    },
    mCOIN: {
      contract_address: '0x1e25857931F75022a8814e0B0c3a371942A88437',
    },
    bETH: {
      contract_address: '0xF9dcf31EE6EB94AB732A43c2FbA1dC6179c98965',
      black_list: ['0x707F9118e33A9B8998beA41dd0d46f38bb963FC8'],
    },
  },
};

export default contractInfos;
