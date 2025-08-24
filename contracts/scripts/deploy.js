async function main() {
const Leaderboard = await ethers.getContractFactory('Leaderboard');
const leaderboard = await Leaderboard.deploy();
await leaderboard.deployed();
console.log('Leaderboard deployed to:', leaderboard.address);
}


main().catch(console.error);
