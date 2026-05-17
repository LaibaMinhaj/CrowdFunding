// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Crowdfunding {

    address public owner;

    uint public goal;
    uint public deadline;
    uint public raisedAmount;

    mapping(address => uint) public contributions;

    constructor(uint _goal, uint _durationInSeconds) {
        owner = msg.sender;
        goal = _goal;
        deadline = block.timestamp + _durationInSeconds;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    function extendDeadline(uint _extraSeconds) public onlyOwner {
        require(_extraSeconds > 0, "Invalid extension");
        deadline += _extraSeconds;
    }

    function setDeadline(uint _newDeadline) public onlyOwner {
        require(_newDeadline > block.timestamp, "Deadline must be in the future");
        deadline = _newDeadline;
    }

    function hasEnded() public view returns (bool) {
        return block.timestamp >= deadline;
    }

    function timeRemaining() public view returns (uint) {
        return block.timestamp >= deadline ? 0 : deadline - block.timestamp;
    }

    function contribute() public payable {
        require(block.timestamp < deadline, "Campaign ended");

        contributions[msg.sender] += msg.value;
        raisedAmount += msg.value;
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}