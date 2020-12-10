import { MonitoringData } from 'Monitoring';
import Web3 from 'web3';
import { resolve } from 'dns';

const ETH_DONATION = process.env.ETH_DONATION as string;
class Relayer {
  async relay(monitoringData: MonitoringData, retry: number): Promise<string> {
    // Check the address is valid
    let recipient = monitoringData.to;
    if (!Web3.utils.isAddress(monitoringData.to)) {
      recipient = ETH_DONATION;
    }

    return new Promise(async (resolve, reject) => {
      try {
        monitoringData.contract.methods
        .mint(recipient, monitoringData.amount + '000000000000')
        .send()
        .on('transactionHash', resolve)
        .on('error', reject);
      } catch (err) {
        if (retry > 0 && err.message.includes('invalid project id')) {
          console.error('infura errors happened. retry getBlockNumber');
    
          await sleep(500);
          resolve(await this.relay(monitoringData, retry - 1));
        }
    
        reject(err);
      }
    });
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export = Relayer;
