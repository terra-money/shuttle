import { Monitoring } from './Monitoring';
import {
  TxInfo,
  Msg,
  MsgSend,
  StdFee,
  Coin,
  StdTx,
  MsgExecuteContract
} from '@terra-money/terra.js';

function createMockTx(msgs: Msg[], errCode?: number): TxInfo {
  return new TxInfo(
    0,
    'txHash',
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
  it('parse MsgSend with a coin', () => {
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

  it('parse MsgSend with multiple coins', () => {
    const monitoring = new Monitoring();
    const monitoringDatas = monitoring.parseTx(
      createMockTx([
        new MsgSend(
          'terra10a29fyas9768pw8mewdrar3kzr07jz8f3n73t3',
          'terra10a29fyas9768pw8mewdrar3kzr07jz8f3n73t3',
          [new Coin('uusd', 1000000), new Coin('uluna', 1000000)]
        )
      ])
    );

    expect(monitoringDatas.length).toEqual(2);
  });

  it('parse MsgExecuteContract', () => {
    const monitoring = new Monitoring();
    const monitoringDatas = monitoring.parseTx(
      createMockTx([
        new MsgExecuteContract(
          'terra10a29fyas9768pw8mewdrar3kzr07jz8f3n73t3',
          'terra10llyp6v3j3her8u3ce66ragytu45kcmd9asj3u',
          {
            transfer: {
              recipient: 'terra10a29fyas9768pw8mewdrar3kzr07jz8f3n73t3',
              amount: '1000000'
            }
          }
        )
      ])
    );

    expect(monitoringDatas.length).toEqual(1);
  });
});
