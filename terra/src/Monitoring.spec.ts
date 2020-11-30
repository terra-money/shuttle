import { Monitoring } from './Monitoring';
import {
  TxInfo,
  Msg,
  MsgSend,
  StdFee,
  Coin,
  StdTx
} from '@terra-money/terra.js';

function createMockTx(msgs: Array<Msg>, errCode?: number): TxInfo {
  return new TxInfo(
    0,
    'txhash',
    '',
    [],
    0,
    0,
    new StdTx(msgs, new StdFee(0, []), [], ''),
    '0',
    errCode
  );
}

describe('Monitoring', () => {
  it('parse MsgSend Tx', () => {

    const monitoring = new Monitoring();
    const monitoringDatas = monitoring.parseTx(
      createMockTx([
        new MsgSend(
          'terra10a29fyas9768pw8mewdrar3kzr07jz8f3n73t3',
          'terra10a29fyas9768pw8mewdrar3kzr07jz8f3n73t3',
          [new Coin('uusd', 1000000)]
        )
      ])
    );

    expect(monitoringDatas.length).toEqual(1);
  });
});
