import {describe, expect, test, beforeEach} from 'vitest'
import Connect4 from "../engine/Connect4";
import Player from "../engine/Player";

describe('connectFourEngine', () => {

    let connect4: Connect4;
    let player1: Player;
    let player2: Player;

    beforeEach(() => {
        player1 = new Player("1", "Player 1", "red", 0, 0, true, true, true);
        player2 = new Player("2", "Player 2", "yellow", 0, 0, true, false, false);

        connect4 = new Connect4([player1, player2], 6, 7, 4, 300);
    });

    test('Should create a connect4 game', () => {
        expect(connect4).toBeDefined();
    });

    test('Should create a connect4 game with 2 players', () => {
        expect(connect4.getPlayers().length).toBe(2);
    });

    test('Should create a connect4 game with 6 rows', () => {
        expect(connect4.getRows()).toBe(6);
    });

    test('Should create a connect4 game with 7 columns', () => {
        expect(connect4.getColumns()).toBe(7);
    });

    test('Should create a connect4 game with 4 in a row to win', () => {
        expect(connect4.getWinningLength()).toBe(4);
    });

    test('Should create a connect4 game that is not over', () => {
        expect(connect4.getIsGameOver()).toBe(false);
    });

    test('Should be able to place a piece in the first column', () => {
        connect4.playToken(0);
        expect(connect4.getLowestEmptyRow(0).getColumn()).toBe(0);
    });

    test('Should be able to place a piece in the second column', () => {
        connect4.playToken(1);
        expect(connect4.getLowestEmptyRow(1).getColumn()).toBe(1);
    });

    test('Should be able to place a piece in the third column', () => {
        connect4.playToken(2);
        expect(connect4.getLowestEmptyRow(2).getColumn()).toBe(2);
    });

    test('Test if players are alternating turns', () => {
        const currentPlayer: Player = connect4.getCurrentPlayer();
        const nextPlayer: Player = connect4.getNextPlayer();

        connect4.playToken(0);

        expect(connect4.getCurrentPlayer()).toBe(nextPlayer);
        expect(connect4.getNextPlayer()).toBe(currentPlayer);
    });

    test('Test if player 1 wins', () => {

        connect4.setCurrentPlayer(player1);

        connect4.playToken(0); // player 1
        connect4.playToken(0); // player 2
        connect4.playToken(1); // player 1
        connect4.playToken(1); // player 2
        connect4.playToken(2); // player 1
        connect4.playToken(2); // player 2
        connect4.playToken(3); // player 1

        expect(connect4.getIsGameOver()).toBe(true);
        expect(connect4.getWinner()).toBe(player1);

    });


    test('Test if player 2 wins', () => {

            connect4.setCurrentPlayer(player2);

            connect4.playToken(0); // player 1
            connect4.playToken(0); // player 2
            connect4.playToken(1); // player 1
            connect4.playToken(1); // player 2
            connect4.playToken(2); // player 1
            connect4.playToken(2); // player 2
            connect4.playToken(3); // player 1
            connect4.playToken(3); // player 2

            expect(connect4.getIsGameOver()).toBe(true);
            expect(connect4.getWinner()).toBe(player2);
    });

})