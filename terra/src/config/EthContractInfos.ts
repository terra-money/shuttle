const contractInfos: {
  [network: string]: {
    [asset: string]: {
      contract_address: string;
    };
  };
} = {
  kovan: {
    minter: {
      contract_address: '0xd6c8e716f71179D9b9e0B8A513D806777E882F34',
    },
    UST: {
      contract_address: '0xC5EE7115D5e05C2e07878095470B54a52B80cE74',
    },
  },
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
    KRT: {
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
    },
    mFB: {
      contract_address: '0x354CA25cf8eB08537f6047e9daF02Eb02222C1D5',
    },
    mCOIN: {
      contract_address: '0x24fE38158A7550bEd9A451CBeA67dA4BdC920E95',
    },
  },
  hmy_testnet: {
    minter: {
      contract_address: '0x2e88377Ed1A8A65F35301CEA5d8Ea4e3185B4811',
    },
    LUNA: {
      contract_address: '0x7b6c03Dbd88d35c7b212154E0027ED3e37232c87',
    },
    UST: {
      contract_address: '0x9536d67b73986DE88C2D261efFd3d992C0eb3Bae',
    },
    KRT: {
      contract_address: '0xDf449e7c1a739cF554B1823F68AC76f36019E7e7',
    },
    SDT: {
      contract_address: '0xF6C26EB1381A0A2677afCb648e14AFd2E4620425',
    },
    MNT: {
      contract_address: '0x83c218de3959d1666ae497AB8445F496be26720f',
    },
    MIR: {
      contract_address: '0xb9776E6dC0627Fa655B5Edba7847aDF77975bFD2',
    },
    mAAPL: {
      contract_address: '0x2691C0877730bbBc099aC98404B972Ecda25Dd59',
    },
    mGOOGL: {
      contract_address: '0x9D72e449d118a5d731Cd1bA61e30Bb4a43A9a089',
    },
    mTSLA: {
      contract_address: '0x420F6B6Ae06883783693Af7853F9067C9Ab8A13f',
    },
    mNFLX: {
      contract_address: '0x5E23D8B4822Dc334CD4d9bECAafcf843E3B56996',
    },
    mQQQ: {
      contract_address: '0xBdeCaa9C409087486266F1Cf36d6cE2175876ED3',
    },
    mTWTR: {
      contract_address: '0x835F366F12E53E47FD7A9A69324EecFC936482aa',
    },
    mMSFT: {
      contract_address: '0xC568E95D29eaC9e3E391186D82339B26E90700e5',
    },
    mAMZN: {
      contract_address: '0x0536f52Af31E5145033f6e0fBeaD4f64253f88DB',
    },
    mBABA: {
      contract_address: '0xCC6A9e65fA3855c86E434aDE369e7B606a99371d',
    },
    mIAU: {
      contract_address: '0x31064BbCB363e97a374EE520E1fCDD5B37Ef1Fb0',
    },
    mSLV: {
      contract_address: '0xe64eb3933b9aD5e61d04D6c0Dc64D94238561c13',
    },
    mUSO: {
      contract_address: '0xEDe7a36A27FE7d040E4666D7B8d0515e1EB0be4B',
    },
    mVIXY: {
      contract_address: '0x23F39Ee199707dd5fD27e7B0A23E4B9E4e2eFc2f',
    },
    mFB: {
      contract_address: '0x1a966a0e125526Bd0afaa1578FcE4a190a8e5E8d',
    },
    mCOIN: {
      contract_address: '0x97c576c33eC3a18B2DF7a63c46B33F4C63fC5689',
    },
  },
  hmy: {
    minter: {
      contract_address: '0x8BD0D4AB71260A8B83c795a7bfd130FB52c137D7',
    },
    LUNA: {
      contract_address: '0x82Fd227cC2329f77290435B4af86b2aDB5a9402b',
    },
    UST: {
      contract_address: '0xaF86497E1E53644c66b0cDd6a185Fe4559dbF00c',
    },
    KRT: {
      contract_address: '0xC2f2d6A1e103230f18bC6d2249b89BF804f99026',
    },
    SDT: {
      contract_address: '0xFaF1daaB8d433c1F68F1bE343788ECD8AAd08E50',
    },
    MNT: {
      contract_address: '0xDef72a120CB54298177580CbdEF11EF49c8967dc',
    },
    MIR: {
      contract_address: '0x5C9CDdc40cc4329d055238Cd4B9048e00e065279',
    },
    mAAPL: {
      contract_address: '0x1016691eE62beF56f206c6911e5303F100D5d5f5',
    },
    mGOOGL: {
      contract_address: '0x3289652bce58C209410C444dcf62BA90299bb2b9',
    },
    mTSLA: {
      contract_address: '0x5Eaa64c1048d35b94A2D8fb15597Ae4F2C053046',
    },
    mNFLX: {
      contract_address: '0x2534EB5229934F6046708477b73B79593d58BB8D',
    },
    mQQQ: {
      contract_address: '0xD7f91694969E48B48b13f0D7c2f444dB78A0235B',
    },
    mTWTR: {
      contract_address: '0x61f4C88585cBAd4597EC5412C47992ff40Ce03Ab',
    },
    mMSFT: {
      contract_address: '0xB46690039637b203Df75BBcCEF62924872A2Db2C',
    },
    mAMZN: {
      contract_address: '0xFd15393A2a6Cc93fB53DDF60f5213a78Db02EC23',
    },
    mBABA: {
      contract_address: '0x3fFa0BB82f05e26a8d5C5fB7996Cab4683953Ca6',
    },
    mIAU: {
      contract_address: '0x61DAB85648889EbC5e720FB5D908e044B3714325',
    },
    mSLV: {
      contract_address: '0x4C28A9cD3e3AE78fA133036Fc1aF49b47e393fE0',
    },
    mUSO: {
      contract_address: '0x5C3F794e90cA87e0DD7f45D2C454D1D6C53Ced9f',
    },
    mVIXY: {
      contract_address: '0xF0555e1263Ca544ca7b6903B5f1E98e8D6D1A3dc',
    },
    mFB: {
      contract_address: '0x7472D77d228001Fa0B1E8D39e61794E86da2e2BC',
    },
    mCOIN: {
      contract_address: '0xaec2cCF12dE2fa262279f404519fCa63aC9e9A4E',
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
    mFB: {
      contract_address: '0x0Add4875eBcbD2306921e12133feB562E1cc82b4',
    },
    aUST: {
      contract_address: '0x006479f75D6622AE6a21BE17C7F555B94c672342',
    },
    ANC: {
      contract_address: '0x93e9012b0a9DA6d5EeA352c56e22B4Ad7225fC33',
    },
    mCOIN: {
      contract_address: '0x807eD0f8149E66Cb74E340bbB298a28E9233181c',
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
  },
};

export = contractInfos;
