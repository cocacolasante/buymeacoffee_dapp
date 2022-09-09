// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract BuyMeACoffee{
    // storage variables
    address payable public owner;
    uint256 public coffeePrice = 2 ether;
    
    //mapping of address to tip amount
    mapping(address=>uint) public coffeeBuyers;

    // event of coffee bought

    event CoffeeBought(
        uint _timestampe,
        address _coffeeBuyer,
        uint _coffeesBought
    );

    constructor(){
        owner = payable(msg.sender);
        console.log("I am constructed");
    }

    


}