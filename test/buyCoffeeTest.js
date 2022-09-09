const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Buy Me A Coffee Smart Contract", ()=>{

    let CoffeeContract;
    const coffeePriceTest = BigInt(2000000000000000000)
    const coffeePurchase1 = BigInt(5000000000000000000)

    beforeEach(async () => {
    
        const BuyContractFactory = await ethers.getContractFactory("BuyMeACoffee");
        CoffeeContract = await BuyContractFactory.deploy();
        await CoffeeContract.deployed();
        
        console.log("Contract deployed to:", CoffeeContract.address);
      }) 
    it("Checks the price of a coffee", async()=>{
        expect(await CoffeeContract.coffeePrice()).to.be.equal(coffeePriceTest)
    })
    it("Checks the buy coffee function", async () => {
        const [user1] = await ethers.getSigners()

        let txn = await CoffeeContract.connect(user1).buyCoffee(coffeePurchase1)
        await txn.wait()
    })
})