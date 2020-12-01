# Shuttle Bridge
Need Description Here

## Table
- [Shuttle Bridge](#shuttle-bridge)
  - [Table](#table)
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

|        | mainnet                                    | ropsten                                    |
| ------ | ------------------------------------------ | ------------------------------------------ |
| LUNA   | 0xd2877702675e6cEb975b4A1dFf9fb7BAF4C91ea9 | 0xc52fe3575F96A3cA9d4b032b4CED4683DD4Eb386 |
| UST    | 0xa47c8bf37f92aBed4A126BDA807A7b7498661acD | 0x449c38576BaA2802F13a17E20B19004526F24903 |
| KRT    | 0xcAAfF72A8CbBfc5Cf343BA4e26f65a257065bFF1 | 0xb335c9cCC284951d7087A9F07884F02af09B17dB |
| SDT    | 0x676Ad1b33ae6423c6618C1AEcf53BAa29cf39EE5 | 0x72F56282d9d682879849C8b3a5C03C00997a5911 |
| MNT    | 0x156B36ec68FdBF84a925230BA96cb1Ca4c4bdE45 | 0x346fE5b2f24cc4945A183C64915B091b67c04FF8 |
| MIR    | 0x09a3EcAFa817268f77BE1283176B946C4ff2E608 | 0x6705bEc064ea895102Be0D6Df3547535bb258f59 |
| mAAPL  | 0xd36932143F6eBDEDD872D5Fb0651f4B72Fd15a84 | 0x1eA5fA2Ff1f7d88275a7bD890470bBE0A79F51d1 |
| mGOOGL | 0x59A921Db27Dd6d4d974745B7FfC5c33932653442 | 0x448F0B49d486C365B7DCAD78D27336DfD7dAc16E |
| mTSLA  | 0x21cA39943E91d704678F5D00b6616650F066fD63 | 0xFa93675dd5814060f0DE5297bD895847D43F257C |
| mNFLX  | 0xC8d674114bac90148d11D3C1d33C61835a0F9DCD | 0x41C28A57C3e32a56e80Ceec8910eA8B5316D9543 |
| mQQQ   | 0x13B02c8dE71680e71F0820c996E4bE43c2F57d15 | 0xf81D30D44aE6FfC2a1E02fa08783aBBCd224147f |
| mTWTR  | 0xEdb0414627E6f1e3F082DE65cD4F9C693D78CCA9 | 0x2bECEB69354c8bBA28c8D8cFa1FC601861dE3821 |
| mMSFT  | 0x41BbEDd7286dAab5910a1f15d12CBda839852BD7 | 0x741aDbdfFE13FDb97bfBF2353aA67Af696a1fE32 |
| mAMZN  | 0x0cae9e4d663793c2a2A0b211c1Cf4bBca2B9cAa7 | 0x630bdA81E7b76CAA6EF0ecC49bc48dC3F5E46E65 |
| mBABA  | 0x56aA298a19C93c6801FDde870fA63EF75Cc0aF72 | 0xf20A4Bfdd525258389C3106B45A8bDE0cdef1396 |
| mIAU   | 0x1d350417d9787E000cc1b95d70E9536DcD91F373 | 0x88f3aD3411031A3e5a342BCc9f353F6bb93D2824 |
| mSLV   | 0x9d1555d8cB3C846Bb4f7D5B1B1080872c3166676 | 0x3eAFA8fbC7ebb7EDa384E3972bC0f53a5C0845De |
| mUSO   | 0x31c63146a635EB7465e5853020b39713AC356991 | 0x35a2A7a4e73e493E76368551A464Bb92ae409aFf |
| mVIXY  | 0xf72FCd9DCF0190923Fadd44811E240Ef4533fc86 | 0xf4923A601EFfb26c133837cEa9a3D6F0954630EE |

## Terra Denoms and Contracts

|        | mainnet                                      | ropsten      |
| ------ | -------------------------------------------- | ------------ |
| LUNA   | uluna                                        | uluna        |
| UST    | uusd                                         | uusd         |
| KRT    | ukrw                                         | ukrw         |
| SDT    | usdr                                         | usdr         |
| MNT    | umnt                                         | umnt         |
| MIR    | terra135uup8xwt6fec2jc664mcy0xnqjjh4y3efsqrh | not deployed |
| mAAPL  | terra1y05wu4hsdzshsq9vtug2ttavtql6dcfrl0yv7s | not deployed |
| mGOOGL | terra1v0kd60lksznk482yh6yr8gu4ehfx298sq58w7y | not deployed |
| mTSLA  | terra17qm6jss8nq36cazclyvhz5j5kuc8nk8ygwcnps | not deployed |
| mNFLX  | terra1qdp36cxzkddw8s88wyw2sdpmxgvhld5ar4m5mr | not deployed |
| mQQQ   | terra19re2s49qgs3uc0fegfaxx8yqzlyl0f8r725qrs | not deployed |
| mTWTR  | terra1wjvwjuhkq99vh0wvxpx6ux0qj036mfsanlm34v | not deployed |
| mMSFT  | terra15e990g3huu0ayfneja43lpvec6hlygmpjrqs2u | not deployed |
| mAMZN  | terra1tgmnj654p4nlcvfny7cm65v3kn5pgu8tx6lnpe | not deployed |
| mBABA  | terra1nff6yrcf3dnq57fn0c56ue8l86fs5eaf0l7uyh | not deployed |
| mIAU   | terra10q9sksr0qy6ztz85yuyz65mndegwzlh3h706py | not deployed |
| mSLV   | terra1rk4kstfxvpwd3vh6ygy3r3uf72cllrvnsuj9qh | not deployed |
| mUSO   | terra1ntzes35xr0gtexgkg3v2tt599w7eda4nrtxe4v | not deployed |
| mVIXY  | terra150ec7cwlsne4xh6h2z88hkrkgf37s8un577xmx | not deployed |

## How it works

### Terra => Ethereum
Transfer KRT to TerraShuttle with memo(=`0xEthereumAddress`)

TerraShuttle:
   * [mainnet] `terra13yxhrk08qvdf5zdc9ss5mwsg5sf7zva9xrgwgc`
   * [tequila-0004] `terra10a29fyas9768pw8mewdrar3kzr07jz8f3n73t3`

Ex)

* Terra Tx: 

   https://finder.terra.money/tequila-0004/tx/83A916AE2A6BF70EACD9E137624AA774ED0A5179C92564C31CA037F789DD2413

   https://tequila-lcd.terra.dev/txs/83A916AE2A6BF70EACD9E137624AA774ED0A5179C92564C31CA037F789DD2413

* Ether Tx: 

   https://ropsten.etherscan.io/tx/0xcc3dc1e703cfe8fa9181f2f62673654b65e0b679d686d41b41424cfdb1da2c09
 

### Ethereum => Terra

> Shuttle Brige wait `7 blocks` confirmation before relaying a tx.

Execute `burn(uint256 amount, bytes32 to)` with bech32 decoded terra address like
 `burn('1000000000000000000', '0x890d71d9e7031a9a09b82c214dba08a413e133a5000000000000000000000000')`.

Terra address has 20bytes constant length, so it implies `burn('amount', 'unbech32(TerraAddress)' + '0' * 24)`. 

Ex) 

* Ether Tx: 

   https://ropsten.etherscan.io/tx/0x5df4a44d778982e2d5a3531efb1df54aec7cc4b6c576100ab86e5614f39de67f

* Terra Tx:

   https://finder.terra.money/tequila-0004/tx/87FD6E97C035B5A7A7BA4071D10D9B591418C4B9DCAE585B7F05D2050CB42DF3