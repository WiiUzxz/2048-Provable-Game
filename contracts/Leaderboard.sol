// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Leaderboard {
struct Entry { address player; uint score; string proofRef; }
Entry[] public entries;
function submitScore(uint score, string memory proofRef) public {
entries.push(Entry(msg.sender, score, proofRef));
}
}
