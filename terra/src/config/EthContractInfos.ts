const contractInfos: {
  [network: string]: {
    [asset: string]: {
      contract_address: string;
    };
  };
} = {
  ropsten: {
    LUNA: {
      contract_address: '0xf44b2579deB34C972A3EE7A6C2a2e23AB56071b1'
    },
    UST: {
      contract_address: '0xC140FC19296176862aac4e043A572675584c1e84'
    },
    KRT: {
      contract_address: '0xad01D44ec74C79DC982fB0AbEfc8304fD2e18153'
    },
    SDT: {
      contract_address: '0xd8C303FBbC7ED408f1098b6bFc57A6BA9751d7fc'
    },
    MNT: {
      contract_address: '0xfe1c710FeC6b62643EcBAf82B2C3b52c8CbDC86b'
    },
    MIR: {
      contract_address: '0xFaf4ECc55677c6c7a72Efb3607B3b0dCA6BfAf8e'
    },
    AAPL: {
      contract_address: '0x963677002B9Acf184E8538C90dBFB33C31F8B97E'
    },
    GOOGL: {
      contract_address: '0x5849769Ea6938f36dA05AfA5B9Fa8924a2E22d6E'
    },
    TSLA: {
      contract_address: '0x4B3AEc1abd9d299428017C476aBB71E82718FFDD'
    },
    NFLX: {
      contract_address: '0x31553F051c57c89bf7E41AB4a25660F4186787E0'
    },
    QQQ: {
      contract_address: '0xC3A1c8646571FFf413A6E90e5bCE43E51112368D'
    },
    TWTR: {
      contract_address: '0xc92452267a1586667D6E24449b06cEA263bfd579'
    },
    MSFT: {
      contract_address: '0x208aDc16BB82F4D80d450061d7daF71775aA6b58'
    },
    AMZN: {
      contract_address: '0x3ADCB1C4406A01fa99B6C2ed5BefC58ad3628465'
    },
    BABA: {
      contract_address: '0x31317352a2bf1F499D5Ba12190c1e2f851fD815B'
    },
    IAU: {
      contract_address: '0x12be454B8aB3f2259159515f3080C50bb9f4E8Fd'
    },
    SLV: {
      contract_address: '0x97b2bf37Af911c946ADE94eC29bb2fe9505929b4'
    },
    USO: {
      contract_address: '0xe31C5031F4e88425c2c644ba3740cb7Eb0C3E07A'
    },
    VIXY: {
      contract_address: '0x4F258915Db3B7995626dc3b696037D629a0A5d36'
    }
  },
  mainnet: {
    LUNA: {
      contract_address: '0xf44b2579deB34C972A3EE7A6C2a2e23AB56071b1'
    },
    UST: {
      contract_address: '0xC140FC19296176862aac4e043A572675584c1e84'
    },
    KRT: {
      contract_address: '0xad01D44ec74C79DC982fB0AbEfc8304fD2e18153'
    },
    SDT: {
      contract_address: '0xd8C303FBbC7ED408f1098b6bFc57A6BA9751d7fc'
    },
    MNT: {
      contract_address: '0xfe1c710FeC6b62643EcBAf82B2C3b52c8CbDC86b'
    },
    MIR: {
      contract_address: '0xFaf4ECc55677c6c7a72Efb3607B3b0dCA6BfAf8e'
    },
    AAPL: {
      contract_address: '0x963677002B9Acf184E8538C90dBFB33C31F8B97E'
    },
    GOOGL: {
      contract_address: '0x5849769Ea6938f36dA05AfA5B9Fa8924a2E22d6E'
    },
    TSLA: {
      contract_address: '0x4B3AEc1abd9d299428017C476aBB71E82718FFDD'
    },
    NFLX: {
      contract_address: '0x31553F051c57c89bf7E41AB4a25660F4186787E0'
    },
    QQQ: {
      contract_address: '0xC3A1c8646571FFf413A6E90e5bCE43E51112368D'
    },
    TWTR: {
      contract_address: '0xc92452267a1586667D6E24449b06cEA263bfd579'
    },
    MSFT: {
      contract_address: '0x208aDc16BB82F4D80d450061d7daF71775aA6b58'
    },
    AMZN: {
      contract_address: '0x3ADCB1C4406A01fa99B6C2ed5BefC58ad3628465'
    },
    BABA: {
      contract_address: '0x31317352a2bf1F499D5Ba12190c1e2f851fD815B'
    },
    IAU: {
      contract_address: '0x12be454B8aB3f2259159515f3080C50bb9f4E8Fd'
    },
    SLV: {
      contract_address: '0x97b2bf37Af911c946ADE94eC29bb2fe9505929b4'
    },
    USO: {
      contract_address: '0xe31C5031F4e88425c2c644ba3740cb7Eb0C3E07A'
    },
    VIXY: {
      contract_address: '0x4F258915Db3B7995626dc3b696037D629a0A5d36'
    }
  }
};

export = contractInfos;
