// SPDX-License-Identifier: UNLICENSED

// * Do not use decimals for the price of smart contract... WE USE "WEI" ... LIKE PAISE for ETHEREUM

pragma solidity ^0.8.9;

contract Dappazon {
    //creating owner as a state variable
    address public owner;

    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    struct Order{
        uint256 time;
        Item item;
    }

    //key => value(Item)
    mapping(uint256 => Item) public items;

    event List(string name, uint256 cost, uint256 capacity);

    //Only to allow the vendor to use this function
    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }
    
    constructor() {
        // name = "Dappazon";
        owner = msg.sender;
    }

    //list products
    function list(
        uint256 _id, 
        string memory _name, 
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
        ) public onlyOwner {
            //Create item struct
            Item memory item = Item(_id, _name, _category, _image, _cost, _rating, _stock);

            //Save item struct to blockchain
            items[_id] = item;

            //Emit an event....subscribing to the event leads to notifications
            //also lets you identify the number of times the fuction was called
            emit List(_name, _cost, _stock);
    }

    //buy products
    function buy(uint256 _id) public payable{
        //Receive
        //checked in Dappazon.js

        //Fetch Item
        Item memory item = items[_id];

        //Create an Order
        Order memory order = Order(block.timestamp, item);

        //Subtract Stock

        //Emit Event
    }



    //withdraw funds
}
