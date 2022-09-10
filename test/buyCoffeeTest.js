const { expect, assert } = require("chai");
const { ethers } = require("hardhat");

describe("Buy Me A Coffee Smart Contract", ()=>{

    let CoffeeContract;
    const coffeePriceTest = BigInt(2000000000000000000)
    const oneCoffee = BigInt(2000000000000000000)
    const twoCoffees = BigInt(4000000000000000000)
    const fourCoffees = BigInt(8000000000000000000)
    const coffeePurchase1 = BigInt(5000000000000000000)

    beforeEach(async () => {
    
        const BuyContractFactory = await ethers.getContractFactory("BuyMeACoffee");
        CoffeeContract = await BuyContractFactory.deploy();
        await CoffeeContract.deployed();
        
        // console.log("Contract deployed to:", CoffeeContract.address);
        
      }) 
    it("Checks the price of a coffee", async()=>{
        expect(await CoffeeContract.coffeePrice()).to.be.equal(coffeePriceTest)
    })
    it("Checks the buy coffee function transfer funds to contract", async () => {
        const [deployer, user1] = await ethers.getSigners()


        let txn = await CoffeeContract.connect(user1).buyCoffee("testing1", {value: twoCoffees})
        await txn.wait()


        expect(await CoffeeContract.totalCoffees()).to.equal(2)
        expect(await CoffeeContract.balanceOfContract()).to.equal(twoCoffees)

    })
    it("Checks for an event and new coffee buys added to struct", async () =>{

        const [deployer, user1] = await ethers.getSigners()

        let txn = await CoffeeContract.connect(user1).buyCoffee("testing1", {value: twoCoffees})
        await txn.wait()

        assert(await CoffeeContract.coffeeBuys(0))
        
            
    })
    it("Checks get all coffee buys fuction", async () => {
        const [user1, user2, user3] = await ethers.getSigners()

        let txn = await CoffeeContract.connect(user1).buyCoffee("testing1", {value: twoCoffees})
        await txn.wait()

        await CoffeeContract.connect(user1).buyCoffee("testing1", {value: twoCoffees})
        await CoffeeContract.connect(user1).buyCoffee("testing1", {value: twoCoffees})
        await CoffeeContract.connect(user1).buyCoffee("testing1", {value: twoCoffees})

        assert(await CoffeeContract.getAllCoffeeBuys())
    })
    it("Check total coffees function", async () => {
        const [user1] = await ethers.getSigners()

        let txn = await CoffeeContract.connect(user1).buyCoffee("testing1", {value: twoCoffees})
        await txn.wait()

        await CoffeeContract.connect(user1).buyCoffee("testing1", {value: twoCoffees})
        await CoffeeContract.connect(user1).buyCoffee("testing1", {value: twoCoffees})
        await CoffeeContract.connect(user1).buyCoffee("testing1", {value: twoCoffees})

        expect(await CoffeeContract.getTotalCoffee()).to.equal(8)
    })
    it("test the withdraw function", async () => {
        const [deployer, user1] = await ethers.getSigners()

        let txn = await CoffeeContract.connect(user1).buyCoffee("testing1", {value: twoCoffees})
        await txn.wait()

        const initialBalance = BigInt(await deployer.getBalance())
        console.log(initialBalance)

        expect(await CoffeeContract.balanceOfContract()).to.equal(twoCoffees)
        await CoffeeContract.connect(user1).buyCoffee("testing1", {value: twoCoffees})

        await CoffeeContract.connect(deployer).withdraw()

        // const endingBalance = BigInt(await deployer.getBalance())
        console.log(await deployer.getBalance())
        

    })


})
