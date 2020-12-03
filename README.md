# Shuttle Bridge

![Shuttle Banner](/resources/banner.png)

Shuttle is a Terra to Ethereum bridge. Currently unidirectional (Terra assets to Ethereum only), and only supports the transfer of [whitelisted](#erc20-contracts) assets.   

## Table of Contents
- [Shuttle Bridge](#shuttle-bridge)
  - [Table of Contents](#table-of-contents)
  - [Components](#components)
  - [ERC20 Contracts](#erc20-contracts)
  - [Terra Denoms and Contracts](#terra-denoms-and-contracts)
  - [How it works](#how-it-works)
    - [Terra => Ethereum](#terra--ethereum)
    - [Ethereum => Terra](#ethereum--terra)

## Components
* [Ethereum Contracts](./contracts)
* [Ethereum side Shuttle](./eth)
* [Terra side Shuttle](./terra)
  
## ERC20 Contracts

| asset  | mainnet                                    | ropsten                                    |
| ------ | ------------------------------------------ | ------------------------------------------ |
| LUNA   | 0xd2877702675e6cEb975b4A1dFf9fb7BAF4C91ea9 | 0xbf51453468771D14cEbdF8856cC5D5145364Cd6F |
| UST    | 0xa47c8bf37f92aBed4A126BDA807A7b7498661acD | 0x6cA13a4ab78dd7D657226b155873A04DB929A3A4 |
| KRT    | 0xcAAfF72A8CbBfc5Cf343BA4e26f65a257065bFF1 | 0xF0b0fB87017b644eC76644Ea0FA704BFA5f20F0E |
| SDT    | 0x676Ad1b33ae6423c6618C1AEcf53BAa29cf39EE5 | 0x1d805d8660Ae73E3624AECAa34ca5FcF8E26E0a5 |
| MNT    | 0x156B36ec68FdBF84a925230BA96cb1Ca4c4bdE45 | 0x51e7f3ED326719a1469EbD7E68B8AB963d64eBA6 |
| MIR    | 0x09a3EcAFa817268f77BE1283176B946C4ff2E608 | 0xDAdC10D2dAC9E111835d4423670573Ae45714e7C |
| mAAPL  | 0xd36932143F6eBDEDD872D5Fb0651f4B72Fd15a84 | 0xDAE57D13b42325562963C1E47E615eE25924635C |
| mGOOGL | 0x59A921Db27Dd6d4d974745B7FfC5c33932653442 | 0x58E3ba48E036341EF8Bbe0bF49caA9731Cc5C42B |
| mTSLA  | 0x21cA39943E91d704678F5D00b6616650F066fD63 | 0x2a445f4dA6Ea8845c594446b250ad535373bb7e4 |
| mNFLX  | 0xC8d674114bac90148d11D3C1d33C61835a0F9DCD | 0x1EA12ca0Ac017EfFE87ddF4c648a1a5359E850FA |
| mQQQ   | 0x13B02c8dE71680e71F0820c996E4bE43c2F57d15 | 0xE1d4509C539D9C3f1E01CeE22e7a79BF77348Ef3 |
| mTWTR  | 0xEdb0414627E6f1e3F082DE65cD4F9C693D78CCA9 | 0x0c9149d38AD1eBE71c50Bd04E0Ba4F999884C961 |
| mMSFT  | 0x41BbEDd7286dAab5910a1f15d12CBda839852BD7 | 0x0736644C0257048861bAa72b6b234514c6b52655 |
| mAMZN  | 0x0cae9e4d663793c2a2A0b211c1Cf4bBca2B9cAa7 | 0x3210BC26eB5427D0FC19dE7AB272b3BB3e4bC4b0 |
| mBABA  | 0x56aA298a19C93c6801FDde870fA63EF75Cc0aF72 | 0xF44c4C095E586B5a7Ba8AA0B2A8Dfad693d396b6 |
| mIAU   | 0x1d350417d9787E000cc1b95d70E9536DcD91F373 | 0x51eD1489e3D311496592056608dD6cf025C03525 |
| mSLV   | 0x9d1555d8cB3C846Bb4f7D5B1B1080872c3166676 | 0xECBe84E79bb26a7FF2474AA1b58d2696A9b5F58F |
| mUSO   | 0x31c63146a635EB7465e5853020b39713AC356991 | 0xDF00833C87bEfA3aF5634d81BE18E9DEf2F9C7c0 |
| mVIXY  | 0xf72FCd9DCF0190923Fadd44811E240Ef4533fc86 | 0xC1629641Cdb2D636Ae220fb759264306902c4AC0 |

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

## How it works

### Terra => Ethereum
Transfer KRT to the TerraShuttle address with memo(=`0xEthereumAddress`)

TerraShuttle addresses:
   * [mainnet] `terra13yxhrk08qvdf5zdc9ss5mwsg5sf7zva9xrgwgc`
   * [tequila-0004] `terra10a29fyas9768pw8mewdrar3kzr07jz8f3n73t3`

Ex)

* Terra Tx: 

   https://finder.terra.money/tequila-0004/tx/F265D79EB847ED76A7BEB467990EDCAB07D2A4F706767E36CFF5AEFB3427AAAC

   https://tequila-lcd.terra.dev/txs/F265D79EB847ED76A7BEB467990EDCAB07D2A4F706767E36CFF5AEFB3427AAAC

* Ethereum Tx: 

   https://ropsten.etherscan.io/tx/0xe396fcf652429d6909d87057494b7836c5bbd7a7fed998d5e1b43f82eff0c80b
 

### Ethereum => Terra

> Shuttle waits 7 block confirmations before relaying a tx.

Execute `burn(uint256 amount, bytes32 to)` with bech32 decoded terra address 
 `burn('1000000000000000000', '0x890d71d9e7031a9a09b82c214dba08a413e133a5000000000000000000000000')`.

Terra address has 20bytes constant length, so it implies `burn('amount', 'unbech32(TerraAddress)' + '0' * 24)`. 

Ex) 

* Ethereum Tx: 

   https://ropsten.etherscan.io/tx/0xfb81d0b8dbd7742a516a7b8c2ac3b146c1c43b2992a64cb33b006b7c66eafa85

* Terra Tx:

   https://finder.terra.money/tequila-0004/tx/AE2325AC4B5193ABD0CEB8A6708070A0D5C481264755313E23B854FF8005EFAC
