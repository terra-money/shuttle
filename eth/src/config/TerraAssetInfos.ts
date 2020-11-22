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
      contract_address: 'terra160tzvz7f4gahqjpeekzyuydqxznmmggxhgpg2q'
    },
    AAPL: {
      contract_address: 'terra106kvg2adz4fljfgasu3u3zgh5fksz5w5vxfawd'
    },
    GOOGL: {
      contract_address: 'terra1ccdcw6yw6jvxajazwzcjns4qsxv8auahkyck4n'
    },
    TSLA: {
      contract_address: 'terra1ccdcw6yw6jvxajazwzcjns4qsxv8auahkyck4n'
    },
    NFLX: {
      contract_address: 'terra1z0ngfqf95jpdg59ccdrq7ql8udt3t3m0rwygha'
    },
    QQQ: {
      contract_address: 'terra1qkzyt2xgy54yctmrfgak0xgqukfycexmu62v4a'
    },
    TWTR: {
      contract_address: 'terra15gqpp2nfkcyufzstwhmf47uqsfywtugxk4gpqv'
    },
    MSFT: {
      contract_address: 'terra1lkqp5j4mamh9ys8fn47vqlpxjxc8upqadt8l0k'
    },
    AMZN: {
      contract_address: 'terra1s9sc8wv066t2xeeq78d5l7m8ydse5m79xnmvq2'
    },
    BABA: {
      contract_address: 'terra1cxkjdq9pf0e5u7fqthwxth3qhfy6e9xrhfkgep'
    },
    IAU: {
      contract_address: 'terra1usj4gu0jnlv39esz864j3zvqd3vehfxvf5f3lu'
    },
    SLV: {
      contract_address: 'terra17w8ukm8nrp3avzhjj7kwfqk2g8r2gx8vkp8evd'
    },
    USO: {
      contract_address: 'terra1zel5urcdtfhce06a8tuqrna24hz0s4rnxephet'
    },
    VIXY: {
      contract_address: 'terra12p7fpf6qlxs9nmh9ea8lg2ydaleh5hzeta4qqg'
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
    },
    MIR: {
      contract_address: 'terra160tzvz7f4gahqjpeekzyuydqxznmmggxhgpg2q'
    },
    AAPL: {
      contract_address: 'terra106kvg2adz4fljfgasu3u3zgh5fksz5w5vxfawd'
    },
    GOOGL: {
      contract_address: 'terra1ccdcw6yw6jvxajazwzcjns4qsxv8auahkyck4n'
    },
    TSLA: {
      contract_address: 'terra1ccdcw6yw6jvxajazwzcjns4qsxv8auahkyck4n'
    },
    NFLX: {
      contract_address: 'terra1z0ngfqf95jpdg59ccdrq7ql8udt3t3m0rwygha'
    },
    QQQ: {
      contract_address: 'terra1qkzyt2xgy54yctmrfgak0xgqukfycexmu62v4a'
    },
    TWTR: {
      contract_address: 'terra15gqpp2nfkcyufzstwhmf47uqsfywtugxk4gpqv'
    },
    MSFT: {
      contract_address: 'terra1lkqp5j4mamh9ys8fn47vqlpxjxc8upqadt8l0k'
    },
    AMZN: {
      contract_address: 'terra1s9sc8wv066t2xeeq78d5l7m8ydse5m79xnmvq2'
    },
    BABA: {
      contract_address: 'terra1cxkjdq9pf0e5u7fqthwxth3qhfy6e9xrhfkgep'
    },
    IAU: {
      contract_address: 'terra1usj4gu0jnlv39esz864j3zvqd3vehfxvf5f3lu'
    },
    SLV: {
      contract_address: 'terra17w8ukm8nrp3avzhjj7kwfqk2g8r2gx8vkp8evd'
    },
    USO: {
      contract_address: 'terra1zel5urcdtfhce06a8tuqrna24hz0s4rnxephet'
    },
    VIXY: {
      contract_address: 'terra12p7fpf6qlxs9nmh9ea8lg2ydaleh5hzeta4qqg'
    }
  }
};

export = assetInfos;
