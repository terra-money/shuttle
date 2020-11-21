const contractInfos: {
  [network: string]: {
    [asset: string]: {
      contract_address: string;
      meta_data: string;
      is_native: boolean;
    };
  };
} = {
  ropsten: {
    wluna: {
      contract_address: '0xf44b2579deB34C972A3EE7A6C2a2e23AB56071b1',
      meta_data: 'uluna',
      is_native: true
    },
    wust: {
      contract_address: '0xC140FC19296176862aac4e043A572675584c1e84',
      meta_data: 'uusd',
      is_native: true
    },
    wkrt: {
      contract_address: '0xad01D44ec74C79DC982fB0AbEfc8304fD2e18153',
      meta_data: 'ukrw',
      is_native: true
    },
    wsdt: {
      contract_address: '0xd8C303FBbC7ED408f1098b6bFc57A6BA9751d7fc',
      meta_data: 'usdr',
      is_native: true
    },
    wmnt: {
      contract_address: '0xfe1c710FeC6b62643EcBAf82B2C3b52c8CbDC86b',
      meta_data: 'umnt',
      is_native: true
    },
    wmir: {
      contract_address: '0xecAc14341098C9aF221460D890Af088D1459195c',
      meta_data: 'umir',
      is_native: false
    }
  },
  mainnet: {
    wluna: {
      contract_address: '0xf44b2579deB34C972A3EE7A6C2a2e23AB56071b1',
      meta_data: 'uluna',
      is_native: true
    },
    wust: {
      contract_address: '0xC140FC19296176862aac4e043A572675584c1e84',
      meta_data: 'uusd',
      is_native: true
    },
    wkrt: {
      contract_address: '0xad01D44ec74C79DC982fB0AbEfc8304fD2e18153',
      meta_data: 'ukrw',
      is_native: true
    },
    wsdt: {
      contract_address: '0xd8C303FBbC7ED408f1098b6bFc57A6BA9751d7fc',
      meta_data: 'usdr',
      is_native: true
    },
    wmnt: {
      contract_address: '0xfe1c710FeC6b62643EcBAf82B2C3b52c8CbDC86b',
      meta_data: 'umnt',
      is_native: true
    },
    wmir: {
      contract_address: '0xecAc14341098C9aF221460D890Af088D1459195c',
      meta_data: 'umir',
      is_native: false
    }
  }
};

export = contractInfos;
