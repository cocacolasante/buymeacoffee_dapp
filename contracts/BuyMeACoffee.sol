// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract BuyMeACoffee{
    // storage variables
    address payable public owner;
    uint256 public coffeePrice = 2 ether;
    uint public totalCoffees;
    uint public balanceOfContract;
    
    //mapping of address to tip amount
    mapping(address=>uint) public coffeeBuyers;
    mapping(address => string) public coffeeMessages;

    // event of coffee bought

    event CoffeeBought(
        uint _timestamp,
        address _coffeeBuyer,
        uint _coffeesBought,
        string _message
    );

    struct CoffeeBuy{
        uint _timestamp;
        address _coffeeBuyer;
        uint _coffeesBought;
        string _message;
    }

    CoffeeBuy[] public coffeeBuys;

    constructor() payable {
        owner = payable(msg.sender);
    }

    modifier onlyOwner{
        require(msg.sender == owner, "Only owner can call function");
        _;
    }

    receive() external payable {}
    fallback() external payable {}

    function buyCoffee(string memory message) external payable {
        require(msg.value >= coffeePrice, "Coffee costs more than that!");
        uint coffee = (msg.value / coffeePrice);
        
        

        coffeeBuys.push(CoffeeBuy(
            block.timestamp,
            msg.sender,
            coffee,
            message
        ));

        coffeeMessages[msg.sender] = message;
        totalCoffees += coffee;
        balanceOfContract += msg.value;

        emit CoffeeBought(block.timestamp, msg.sender, coffee, message);



    }

    function getAllCoffeeBuys() public view returns(CoffeeBuy[] memory){
        return coffeeBuys;
    }

    function getTotalCoffee() public view returns(uint){
        return(totalCoffees);
    }

    function withdraw() public {
        require(owner.send(address(this).balance));
    }



}