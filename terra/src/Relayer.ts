import { MonitoringData } from 'Monitoring';
import Web3 from 'web3';

const ETH_DONATION = process.env.ETH_DONATION as string;
class Relayer {
  async relay(monitoringData: MonitoringData): Promise<string> {
    // Check the address is valid
    let recipient = monitoringData.to;
    if (!Web3.utils.isAddress(monitoringData.to)) {
      recipient = ETH_DONATION;
    }

    return new Promise((resolve, reject) => {
      monitoringData.contract.methods
        .mint(recipient, monitoringData.amount + '000000000000')
        .send()
        .on('transactionHash', resolve)
        .on('error', reject);
    });
  }
}

export = Relayer;
