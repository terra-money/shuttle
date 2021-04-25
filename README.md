# Shuttle Bridge

![Shuttle Banner](/resources/banner.png)

Shuttle is a Terra-Ethereum bridge. Currently only allows Terra assets to be sent between Terra and Ethereum networks, and only supports the transfer of [whitelisted](#erc20-contracts) assets.

## Table of Contents

- [Shuttle Bridge](#shuttle-bridge)
  - [Table of Contents](#table-of-contents)
  - [Components](#components)
  - [ERC20 Contracts](#erc20-contracts)
  - [BEP20 Contracts on BSC (Binance Smart Chain)](#bep20-contracts-on-bsc-binance-smart-chain)
  - [HRC20 Contracts on Harmony One](#hrc20-contracts-on-harmony-one)
  - [Terra Denoms and Contracts](#terra-denoms-and-contracts)
  - [Usage Instructions](#usage-instructions)
    - [Terra => Ethereum / BSC / Harmony](#terra--ethereum--bsc--harmony)
      - [Native Assets](#native-assets)
      - [CW20 Tokens](#cw20-tokens)
    - [Ethereum / BSC / Harmony => Terra](#ethereum--bsc--harmony--terra)
  - [Relaying Fee](#relaying-fee)

## Components

- [Ethereum Contracts](./contracts)
- [Ethereum side Shuttle](./eth)
- [Terra side Shuttle](./terra)

## ERC20 Contracts

| asset  | mainnet                                    | ropsten                                    | kovan                                      |
| ------ | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| LUNA   | 0xd2877702675e6cEb975b4A1dFf9fb7BAF4C91ea9 | 0xbf51453468771D14cEbdF8856cC5D5145364Cd6F |                                            |
| UST    | 0xa47c8bf37f92aBed4A126BDA807A7b7498661acD | 0x6cA13a4ab78dd7D657226b155873A04DB929A3A4 | 0xc5ee7115d5e05c2e07878095470b54a52b80ce74 |
| KRT    | 0xcAAfF72A8CbBfc5Cf343BA4e26f65a257065bFF1 | 0xF0b0fB87017b644eC76644Ea0FA704BFA5f20F0E |                                            |
| SDT    | 0x676Ad1b33ae6423c6618C1AEcf53BAa29cf39EE5 | 0x1d805d8660Ae73E3624AECAa34ca5FcF8E26E0a5 |                                            |
| MNT    | 0x156B36ec68FdBF84a925230BA96cb1Ca4c4bdE45 | 0x51e7f3ED326719a1469EbD7E68B8AB963d64eBA6 |                                            |
| MIR    | 0x09a3EcAFa817268f77BE1283176B946C4ff2E608 | 0xDAdC10D2dAC9E111835d4423670573Ae45714e7C |                                            |
| mAAPL  | 0xd36932143F6eBDEDD872D5Fb0651f4B72Fd15a84 | 0xDAE57D13b42325562963C1E47E615eE25924635C |                                            |
| mGOOGL | 0x59A921Db27Dd6d4d974745B7FfC5c33932653442 | 0x58E3ba48E036341EF8Bbe0bF49caA9731Cc5C42B |                                            |
| mTSLA  | 0x21cA39943E91d704678F5D00b6616650F066fD63 | 0x2a445f4dA6Ea8845c594446b250ad535373bb7e4 |                                            |
| mNFLX  | 0xC8d674114bac90148d11D3C1d33C61835a0F9DCD | 0x1EA12ca0Ac017EfFE87ddF4c648a1a5359E850FA |                                            |
| mQQQ   | 0x13B02c8dE71680e71F0820c996E4bE43c2F57d15 | 0xE1d4509C539D9C3f1E01CeE22e7a79BF77348Ef3 |                                            |
| mTWTR  | 0xEdb0414627E6f1e3F082DE65cD4F9C693D78CCA9 | 0x0c9149d38AD1eBE71c50Bd04E0Ba4F999884C961 |                                            |
| mMSFT  | 0x41BbEDd7286dAab5910a1f15d12CBda839852BD7 | 0x0736644C0257048861bAa72b6b234514c6b52655 |                                            |
| mAMZN  | 0x0cae9e4d663793c2a2A0b211c1Cf4bBca2B9cAa7 | 0x3210BC26eB5427D0FC19dE7AB272b3BB3e4bC4b0 |                                            |
| mBABA  | 0x56aA298a19C93c6801FDde870fA63EF75Cc0aF72 | 0xF44c4C095E586B5a7Ba8AA0B2A8Dfad693d396b6 |                                            |
| mIAU   | 0x1d350417d9787E000cc1b95d70E9536DcD91F373 | 0x51eD1489e3D311496592056608dD6cf025C03525 |                                            |
| mSLV   | 0x9d1555d8cB3C846Bb4f7D5B1B1080872c3166676 | 0xECBe84E79bb26a7FF2474AA1b58d2696A9b5F58F |                                            |
| mUSO   | 0x31c63146a635EB7465e5853020b39713AC356991 | 0xDF00833C87bEfA3aF5634d81BE18E9DEf2F9C7c0 |                                            |
| mVIXY  | 0xf72FCd9DCF0190923Fadd44811E240Ef4533fc86 | 0xC1629641Cdb2D636Ae220fb759264306902c4AC0 |                                            |
| mFB    | 0x0e99cC0535BB6251F6679Fa6E65d6d3b430e840B | 0x0Add4875eBcbD2306921e12133feB562E1cc82b4 |                                            |
| ANC    | 0x0F3ADC247E91c3c50bC08721355A41037E89Bc20 | 0x93e9012b0a9DA6d5EeA352c56e22B4Ad7225fC33 |                                            |
| aUST   | 0xa8De3e3c934e2A1BB08B010104CcaBBD4D6293ab | 0x006479f75D6622AE6a21BE17C7F555B94c672342 |                                            |
| mCOIN  | 0x1e25857931F75022a8814e0B0c3a371942A88437 | 0x807eD0f8149E66Cb74E340bbB298a28E9233181c |                                            |

## BEP20 Contracts on BSC (Binance Smart Chain)

| asset  | bsc                                        | bsc-testnet                                |
| ------ | ------------------------------------------ | ------------------------------------------ |
| LUNA   | 0xECCF35F941Ab67FfcAA9A1265C2fF88865caA005 | 0xA1B4Aa780713df91e9Fa0FAa415ce49756D81E3b |
| UST    | 0x23396cF899Ca06c4472205fC903bDB4de249D6fC | 0x66BDf3Bd407A63eAB5eAF5eCE69f2D7bb403EfC9 |
| KRT    | 0xfFBDB9BDCae97a962535479BB96cC2778D65F4dd | 0x59a870b16adE2A152815Ba0d4Fa074fc3F71A828 |
| SDT    | 0x7d5f9F8CF59986743f34BC137Fc197E2e22b7B05 | 0x5e2c2088d3fB10aAb25a0D323CdBEc5147232B1a |
| MNT    | 0x41D74991509318517226755E508695c4D1CE43a6 | 0x1449D1Ba8FB922E74F7761F077e77EAe66A0f8DA |
| MIR    | 0x5B6DcF557E2aBE2323c48445E8CC948910d8c2c9 | 0x320106A19C934ab8dbdde8056Ebae5A6f340720e |
| mAAPL  | 0x900AEb8c40b26A8f8DfAF283F884b03EE7Abb3Ec | 0x0dFa0F08136DA5d28618E7E31A7e24b01a95bB69 |
| mGOOGL | 0x62D71B23bF15218C7d2D7E48DBbD9e9c650B173f | 0x56a31ea21862447E3Af9bfe76A45679E44103274 |
| mTSLA  | 0xF215A127A196e3988C09d052e16BcFD365Cd7AA3 | 0xA2a42F0deB45ca7310a3C02A70fb569d5d5248FA |
| mNFLX  | 0xa04F060077D90Fe2647B61e4dA4aD1F97d6649dc | 0xc6F5e6476958cA81eC8FC68A1ea7c68206b0e501 |
| mQQQ   | 0x1Cb4183Ac708e07511Ac57a2E45A835F048D7C56 | 0x1Ad3354B2E7C0F7D5A370a03CAf439DD345437a9 |
| mTWTR  | 0x7426Ab52A0e057691E2544fae9C8222e958b2cfB | 0x5C4273b1B20112321f0951D0bC2d5eD40c800226 |
| mMSFT  | 0x0ab06caa3Ca5d6299925EfaA752A2D2154ECE929 | 0xE4f2C30E938c24ee874dfDFAb20fFFBA81323457 |
| mAMZN  | 0x3947B992DC0147D2D89dF0392213781b04B25075 | 0xfBC94545AD2ff3F7B009258FB43F2EAb46744767 |
| mBABA  | 0xcA2f75930912B85d8B2914Ad06166483c0992945 | 0xFc78bf14Dc997e681dAc4b4D811B45026d04123F |
| mIAU   | 0x1658AeD6C7dbaB2Ddbd8f5D898b0e9eAb0305813 | 0xeff3b95faC30230D30F8c8222670A3812D79857B |
| mSLV   | 0x211e763d0b9311c08EC92D72DdC20AB024b6572A | 0x662DDF725F5BDE9b31BBD16793Fd0c234F67979B |
| mUSO   | 0x9cDDF33466cE007676C827C76E799F5109f1843C | 0x5D428492846bd05D8137e56Fe806D28606453cbf |
| mVIXY  | 0x92E744307694Ece235cd02E82680ec37c657D23E | 0x57986628daaDC418E09A2917D6c8b793B7dC1ACD |
| mFB    | 0x5501F4713020cf299C3C5929da549Aab3592E451 | 0x354CA25cf8eB08537f6047e9daF02Eb02222C1D5 |
| mCOIN  | 0x49022089e78a8D46Ec87A3AF86a1Db6c189aFA6f | 0x24fE38158A7550bEd9A451CBeA67dA4BdC920E95 |

## HRC20 Contracts on Harmony One

| asset  | hmy                                        | hmy-testnet                                |
| ------ | ------------------------------------------ | ------------------------------------------ |
| LUNA   | 0x82Fd227cC2329f77290435B4af86b2aDB5a9402b | 0xdA425a49e34F812728408df3805130A13387A3E7 |
| UST    | 0xaF86497E1E53644c66b0cDd6a185Fe4559dbF00c | 0xD4eA2F4400b9681B793fD156B489046344B853f4 |
| KRT    | 0xC2f2d6A1e103230f18bC6d2249b89BF804f99026 | 0xB32f01Ee4bD8a98B2dC6E0148cDd5Ae3f2a14d41 |
| SDT    | 0xFaF1daaB8d433c1F68F1bE343788ECD8AAd08E50 | 0xF2C0d8edD0888949fc29CF23DB53529422a57611 |
| MNT    | 0xDef72a120CB54298177580CbdEF11EF49c8967dc | 0x1BC486397eeDea3ba888A2badb1AE79e3dBC9c1d |
| MIR    | 0x5C9CDdc40cc4329d055238Cd4B9048e00e065279 | 0x4aa5599a26b08a814100C7a583edF35f31f6Bc50 |
| mAAPL  | 0x1016691eE62beF56f206c6911e5303F100D5d5f5 | 0x48573Fb22BFef9CABAa8aA41391A1D8E5BF29720 |
| mGOOGL | 0x3289652bce58C209410C444dcf62BA90299bb2b9 | 0x16211dC69C89Fa62FEd5Ee42999D7f252129c0Ca |
| mTSLA  | 0x5Eaa64c1048d35b94A2D8fb15597Ae4F2C053046 | 0x040AbAba15E0155085A3febDC70CE5Bd16D5Ef08 |
| mNFLX  | 0x2534EB5229934F6046708477b73B79593d58BB8D | 0x81A93d9Fd0a4fBd02fEFaE7eb493A3db1745Ae02 |
| mQQQ   | 0xD7f91694969E48B48b13f0D7c2f444dB78A0235B | 0x78dDBADb56FC905aFD6f0E4e329d57C980545C55 |
| mTWTR  | 0x61f4C88585cBAd4597EC5412C47992ff40Ce03Ab | 0xB8F89cDa4e00B00D9a45DC13336D8E86BB3542d0 |
| mMSFT  | 0xB46690039637b203Df75BBcCEF62924872A2Db2C | 0xA01b21d2254FBE029af97333430E4C9513f47e34 |
| mAMZN  | 0xFd15393A2a6Cc93fB53DDF60f5213a78Db02EC23 | 0xaf0eF4b792773fc0342249FEF6A478c9F2953FfE |
| mBABA  | 0x3fFa0BB82f05e26a8d5C5fB7996Cab4683953Ca6 | 0x57A5a3bb2DE80928410C6FD78B7526dC8e3ED146 |
| mIAU   | 0x61DAB85648889EbC5e720FB5D908e044B3714325 | 0x81f38fF4BB5A9A7c5C034AE3F6226ae599e40502 |
| mSLV   | 0x4C28A9cD3e3AE78fA133036Fc1aF49b47e393fE0 | 0x09cb48F5a674d5A07f05B88bfe278995C783372F |
| mUSO   | 0x5C3F794e90cA87e0DD7f45D2C454D1D6C53Ced9f | 0xDbBA7598E2Db3fF989622bd76F630fD4AEAbD6F3 |
| mVIXY  | 0xF0555e1263Ca544ca7b6903B5f1E98e8D6D1A3dc | 0x22776D982Bd965fBB67866aF631E5cb06f341F81 |
| mFB    | 0x7472D77d228001Fa0B1E8D39e61794E86da2e2BC | 0x5Fe5CC6111640D9D4cDa686E7D2F786c65eF2C89 |
| mCOIN  | 0xaec2cCF12dE2fa262279f404519fCa63aC9e9A4E | 0xC390537492620A9Fb6efaA009073f0BF15814739 |

## Terra Denoms and Contracts

| asset  | mainnet                                      | tequila-0004                                 |
| ------ | -------------------------------------------- | -------------------------------------------- |
| LUNA   | uluna                                        | uluna                                        |
| UST    | uusd                                         | uusd                                         |
| KRT    | ukrw                                         | ukrw                                         |
| SDT    | usdr                                         | usdr                                         |
| MNT    | umnt                                         | umnt                                         |
| MIR    | terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6 | terra10llyp6v3j3her8u3ce66ragytu45kcmd9asj3u |
| mAAPL  | terra1vxtwu4ehgzz77mnfwrntyrmgl64qjs75mpwqaz | terra16vfxm98rxlc8erj4g0sj5932dvylgmdufnugk0 |
| mGOOGL | terra1h8arz2k547uvmpxctuwush3jzc8fun4s96qgwt | terra1qg9ugndl25567u03jrr79xur2yk9d632fke3h2 |
| mTSLA  | terra14y5affaarufk3uscy2vr6pe6w6zqf2wpjzn5sh | terra1nslem9lgwx53rvgqwd8hgq7pepsry6yr3wsen4 |
| mNFLX  | terra1jsxngqasf2zynj5kyh0tgq9mj3zksa5gk35j4k | terra1djnlav60utj06kk9dl7defsv8xql5qpryzvm3h |
| mQQQ   | terra1csk6tc7pdmpr782w527hwhez6gfv632tyf72cp | terra18yx7ff8knc98p07pdkhm3u36wufaeacv47fuha |
| mTWTR  | terra1cc3enj9qgchlrj34cnzhwuclc4vl2z3jl7tkqg | terra1ax7mhqahj6vcqnnl675nqq2g9wghzuecy923vy |
| mMSFT  | terra1227ppwxxj3jxz8cfgq00jgnxqcny7ryenvkwj6 | terra12s2h8vlztjwu440khpc0063p34vm7nhu25w4p9 |
| mAMZN  | terra165nd2qmrtszehcfrntlplzern7zl4ahtlhd5t2 | terra12saaecsqwxj04fn0jsv4jmdyp6gylptf5tksge |
| mBABA  | terra1w7zgkcyt7y4zpct9dw8mw362ywvdlydnum2awa | terra15dr4ah3kha68kam7a907pje9w6z2lpjpnrkd06 |
| mIAU   | terra15hp9pr8y4qsvqvxf3m4xeptlk7l8h60634gqec | terra19dl29dpykvzej8rg86mjqg8h63s9cqvkknpclr |
| mSLV   | terra1kscs6uhrqwy6rx5kuw5lwpuqvm3t6j2d6uf2lp | terra1fdkfhgk433tar72t4edh6p6y9rmjulzc83ljuw |
| mUSO   | terra1lvmx8fsagy70tv0fhmfzdw9h6s3sy4prz38ugf | terra1fucmfp8x4mpzsydjaxyv26hrkdg4vpdzdvf647 |
| mVIXY  | terra1zp3a6q6q4953cz376906g5qfmxnlg77hx3te45 | terra1z0k7nx0vl85hwpv3e3hu2cyfkwq07fl7nqchvd |
| mFB    | terra1mqsjugsugfprn3cvgxsrr8akkvdxv2pzc74us7 | terra14gq9wj0tt6vu0m4ec2tkkv4ln3qrtl58lgdl2c |
| ANC    | terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76 | terra1747mad58h0w4y589y3sk84r5efqdev9q4r02pc |
| aUST   | terra1hzh9vpxhsk8253se0vv5jj6etdvxu3nv8z07zu | terra1ajt556dpzvjwl0kl5tzku3fc3p3knkg9mkv8jl |
| mCOIN  | terra18wayjpyq28gd970qzgjfmsjj7dmgdk039duhph |                                              |

## Usage Instructions

**NOTE:** Only assets recognized (listed above) can be used with Shuttle. Sending an asset not mentioned in this document will result in permanent loss of funds.

### Terra => Ethereum / BSC / Harmony

To transfer an asset from Terra to Ethereum or BSC using Shuttle, send the asset to the Shuttle address inside a transaction whose memo field is set to the recipient address on the destination chain.

Use the table below to find the corresponding Shuttle address for your source and destination chain pair.

| Source Chain (Terra) | Desination Chain           | Shuttle Address                                                                                                                              |
| -------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `columbus-4`         | Ethereum Mainnet           | [terra13yxhrk08qvdf5zdc9ss5mwsg5sf7zva9xrgwgc](https://finder.terra.money/columbus-4/address/terra13yxhrk08qvdf5zdc9ss5mwsg5sf7zva9xrgwgc)   |
| `columbus-4`         | BSC Mainnet                | [terra1g6llg3zed35nd3mh9zx6n64tfw3z67w2c48tn2](https://finder.terra.money/columbus-4/address/terra1g6llg3zed35nd3mh9zx6n64tfw3z67w2c48tn2)   |
| `tequila-0004`       | Ethereum Testnet (Ropsten) | [terra10a29fyas9768pw8mewdrar3kzr07jz8f3n73t3](https://finder.terra.money/tequila-0004/address/terra10a29fyas9768pw8mewdrar3kzr07jz8f3n73t3) |
| `tequila-0004`       | Ethereum Testnet (Kovan)   | [terra15jndnz2twkku7eaeha4wfwlvya6t0k50ay0m4d](https://finder.terra.money/tequila-0004/address/terra15jndnz2twkku7eaeha4wfwlvya6t0k50ay0m4d) |
| `tequila-0004`       | BSC Testnet                | [terra1paav7jul3dzwzv78j0k59glmevttnkfgmgzv2r](https://finder.terra.money/tequila-0004/address/terra1paav7jul3dzwzv78j0k59glmevttnkfgmgzv2r) |

#### Native Assets

To transfer native Terra assets such as LUNA, UST, KRT, etc. create a `MsgSend` message where the recipient is set to the proper Shuttle address.

**Example Transaction containing `MsgSend`:**

The following `StdTx` sends 100 LUNA from `terra1rk6tvacasnnyssfnn00zl7wz43pjnpn7vayqv6` on `columbus-4` to `0x320BC76961fB4e2A0e2E86D43d4b9D13B4985b8f` on Ethereum mainnet through the mainnet Shuttle.

```json
{
  "type": "core/StdTx",
  "value": {
    "msg": [
      {
        "type": "bank/MsgSend",
        "value": {
          "from_address": "terra1rk6tvacasnnyssfnn00zl7wz43pjnpn7vayqv6",
          "to_address": "terra10a29fyas9768pw8mewdrar3kzr07jz8f3n73t3",
          "amount": [
            {
              "denom": "uluna",
              "amount": "100000000"
            }
          ]
        }
      }
    ],
    "fee": { ... },
    "signatures": [ ... ],
    "memo": "0x320BC76961fB4e2A0e2E86D43d4b9D13B4985b8f"
  }
}
```

#### CW20 Tokens

mAssets and the MIR token must be sent differently by calling the token contract using a `MsgExecuteContract`.

**HandleMsg JSON:**

The recipient must be set to the appropriate Shuttle address for source/destination chain pair:

```json
{
  "transfer": {
    "recipient": "terra13yxhrk08qvdf5zdc9ss5mwsg5sf7zva9xrgwgc",
    "amount": "100000000"
  }
}
```

**Transaction containing MsgExecuteContract**:

The following transaction send 100 MIR tokens from `terra1rk6tvacasnnyssfnn00zl7wz43pjnpn7vayqv6` on `columbus-4` to `0x320BC76961fB4e2A0e2E86D43d4b9D13B4985b8f` on Ethereum mainnet.

```json
{
  "type": "core/StdTx",
  "value": {
    "msg": [
      {
        "type": "wasm/MsgExecuteContract",
        "value": {
          "sender": "terra1rk6tvacasnnyssfnn00zl7wz43pjnpn7vayqv6",
          "contract": "terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6",
          "execute_msg": "ewogICJ0cmFuc2ZlciI6IHsKICAgICJyZWNpcGllbnQiOiAidGVycmExM3l4aHJrMDhxdmRmNXpkYzlzczVtd3NnNXNmN3p2YTl4cmd3Z2MiLAogICAgImFtb3VudCI6ICIxMDAwMDAwMDAiCiAgfQp9",
          "coins": []
        }
      }
    ],
    "fee": { ... },
    "signatures": [ ... ],
    "memo": "0x320BC76961fB4e2A0e2E86D43d4b9D13B4985b8f"
  }
}
```

Example transactions:

- Terra Tx:

  https://finder.terra.money/tequila-0004/tx/F265D79EB847ED76A7BEB467990EDCAB07D2A4F706767E36CFF5AEFB3427AAAC

  https://tequila-lcd.terra.dev/txs/F265D79EB847ED76A7BEB467990EDCAB07D2A4F706767E36CFF5AEFB3427AAAC

- Ethereum Tx:

  https://ropsten.etherscan.io/tx/0xe396fcf652429d6909d87057494b7836c5bbd7a7fed998d5e1b43f82eff0c80b

  https://kovan.etherscan.io/tx/0x4cd79666c63427fda738b7d1741050c48a430ec4e06aa7699a69cd56f32ed2d4

- BSC Tx:

  https://testnet.bscscan.com/tx/0xa05dd296b93cf46697d39fd8c9552b22d353ea4d28a0dbc5f90725166d1b3f16

### Ethereum / BSC / Harmony => Terra

> Shuttle waits 7 block confirmations before relaying a tx.

Execute `burn(uint256 amount, bytes32 to)` with bech32 decoded terra address
`burn('1000000000000000000', '0x890d71d9e7031a9a09b82c214dba08a413e133a5000000000000000000000000')`.

Terra address has 20 bytes constant length, so it implies `burn('amount', 'unbech32(TerraAddress)' + '0' * 24)`.

Ex)

- Ethereum Tx:

  https://ropsten.etherscan.io/tx/0xfb81d0b8dbd7742a516a7b8c2ac3b146c1c43b2992a64cb33b006b7c66eafa85

  https://kovan.etherscan.io/tx/0x352852aa113f22147c4582790639c2b34b8c6f29eb5b0e8d54c360e83a74a148

- BSC Tx:

  https://testnet.bscscan.com/tx/0xae92ac95b5143886df56bfe76cb521ec52f8bbdefe20a01164e2fa8c00944e37

- Terra Tx:

  https://finder.terra.money/tequila-0004/tx/AE2325AC4B5193ABD0CEB8A6708070A0D5C481264755313E23B854FF8005EFAC

## Relaying Fee

Shuttle charges a fee only for transferring assets from Terra to Ethereum/BSC, and the quantity is calculated as `max($1, 0.1% * amount)`. **A transaction with tiny amount smaller than $1 value will be ignored.**
