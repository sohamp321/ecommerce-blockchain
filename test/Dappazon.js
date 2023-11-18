/* eslint-disable no-undef */
const { expect } = require("chai")

//Gives the WEI value of the cost
const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

//Variables for testing the listing
const ID = 1
const NAME = "Shoes"
const CATEGORY = "Accessories"
//! Look at the tutorial to using IPFS
const IMAGE = "Image Link from IPFS"
const COST = tokens(1)
const RATING = 5
const STOCK = 1

describe("Dappazon", () => {
  
  let dappazon
  let deployer
  let buyer


  beforeEach(async () => {
    //Setup Accounts
    //! This is not working pls explain why
    // console.log (await ether.getSigners())

    [deployer, buyer] = await ethers.getSigners()
    // console.log(deployer.address, buyer.address)

  
    //Check if the contract has been deployed
    // eslint-disable-next-line no-undef
    const Dappazon = await ethers.getContractFactory('Dappazon')
    dappazon = await Dappazon.deploy()
  })

  describe("Deployment Functions:", () => {

    it("Sets the owner", async () => {
      expect(await dappazon.owner()).to.equal(deployer.address)
    })

    // it('has a name', async () =>{
    //   expect(await dappazon.name()).to.equal('Dappazon')
    // } )
  })


  describe("Listing", () => {
    let transaction 

    beforeEach(async () => {
      transaction = await dappazon.connect(deployer).list(
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        COST,
        RATING,
        STOCK
      )

      await transaction.wait()

    })

    it("Returns item attributes" , async() => {
      const item = await dappazon.items(ID)

      // console.log(item)

      expect(item.id).to.equal(ID)
      expect(item.name).to.equal(NAME)
      expect(item.category).to.equal(CATEGORY)
      expect(item.image).to.equal(IMAGE)
      expect(item.cost).to.equal(COST)
      expect(item.rating).to.equal(RATING)
      expect(item.stock).to.equal(STOCK)
    })

    it("Emits an event", async () => {
      expect(transaction).to.emit(dappazon, "List")
    })
  })

  describe("Buying", () => {
    let transaction 

    beforeEach(async () => {
      //List the item
      transaction = await dappazon.connect(deployer).list(
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        COST,
        RATING,
        STOCK
      )

      await transaction.wait()

      //{value:COST} because we used the modifier payable
      transaction = await dappazon.connect(buyer).buy(ID, {value : COST})

    })

    it("Updates the Contract Balance" , async() => {
      const result = await ethers.provider.getBalance(dappazon.address)
      // console.log(result)
      expect(result).to.equal(COST)
    })

    // it("Emits an event", async () => {
    //   expect(transaction).to.emit(dappazon, "List")
    // })
  })

})
