// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./RewardToken.sol";

contract DAO {

    RewardToken public token;

    address public owner;
    uint public constant PROPOSAL_DURATION = 1 hours;

    struct Proposal {
        string description;
        uint voteCount;
        uint deadline;
        bool executed;
    }

    Proposal[] public proposals;

    mapping(uint => mapping(address => bool)) public hasVoted;

    constructor(address _tokenAddress) {
        token = RewardToken(_tokenAddress);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    // Create proposal with a fixed one-hour voting deadline
    function createProposal(string memory _description) public {
        proposals.push(Proposal({
            description: _description,
            voteCount: 0,
            deadline: block.timestamp + PROPOSAL_DURATION,
            executed: false
        }));
    }

    function extendAllDeadlines() external onlyOwner {
        for (uint i = 0; i < proposals.length; i++) {
            proposals[i].deadline = block.timestamp + PROPOSAL_DURATION;
        }
    }

    // Vote on proposal
    function vote(uint _proposalId) public {
        Proposal storage proposal = proposals[_proposalId];

        require(block.timestamp < proposal.deadline, "Voting ended");
        require(!hasVoted[_proposalId][msg.sender], "Already voted");

        uint voterPower = token.balanceOf(msg.sender);

        require(voterPower > 0, "No voting power");

        proposal.voteCount += voterPower;
        hasVoted[_proposalId][msg.sender] = true;
    }

    // Get proposal count
    function getProposalsCount() public view returns (uint) {
        return proposals.length;
    }
}