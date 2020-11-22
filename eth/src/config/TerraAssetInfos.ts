const assetInfos: {
  [network: string]: {
    [asset: string]: {
      contract_address?: string;
      denom?: string;
      is_native: boolean;
    };
  };
} = {
  'tequila-0004': {
    wluna: {
      denom: 'uluna',
      is_native: true
    },
    wust: {
      denom: 'uusd',
      is_native: true
    },
    wkrt: {
      denom: 'ukrw',
      is_native: true
    },
    wsdt: {
      denom: 'usdr',
      is_native: true
    },
    wmnt: {
      denom: 'umnt',
      is_native: true
    },
    wmir: {
      contract_address: '0xecAc14341098C9aF221460D890Af088D1459195c',
      is_native: false
    }
  },
  'columbus-4': {
    wluna: {
      denom: 'uluna',
      is_native: true
    },
    wust: {
      denom: 'uusd',
      is_native: true
    },
    wkrt: {
      denom: 'ukrw',
      is_native: true
    },
    wsdt: {
      denom: 'usdr',
      is_native: true
    },
    wmnt: {
      denom: 'umnt',
      is_native: true
    },
    wmir: {
      contract_address: '0xecAc14341098C9aF221460D890Af088D1459195c',
      denom: 'umir',
      is_native: false
    }
  }
};

export = assetInfos;
