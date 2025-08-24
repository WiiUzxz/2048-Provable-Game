import create from 'zustand';


export const useGameStore = create(set => ({
grid: Array(16).fill(0),
score: 0,
playHistory: [],
// Functions: move, merge, addTile, reset
}));
