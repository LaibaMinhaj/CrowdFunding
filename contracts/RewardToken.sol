// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract RewardToken is ERC20 {

    address public owner;

    constructor() ERC20("RewardToken", "RWT") {
        owner = msg.sender;

        // Initial supply (1 million tokens)
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // Optional: owner can mint more tokens later
    function mint(address to, uint256 amount) public {
        require(msg.sender == owner, "Only owner can mint");
        _mint(to, amount);
    }
}