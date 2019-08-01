import {IGame, IPlayer, ITeam} from './types';

export const goalsVariant: number[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
];

export const gameDefault: IGame[] = [
    {
        id: '1',
        team1: '1',
        team2: '2',
        winTeam: '1',
        goalTeam1: 11,
        goalTeam2: 6
    }, {
        id: '2',
        team1: '1',
        team2: '2',
        winTeam: '1',
        goalTeam1: 11,
        goalTeam2: 9
    }, {
        id: '3',
        team1: '1',
        team2: '2',
        winTeam: '2',
        goalTeam1: 8,
        goalTeam2: 11
    },
];

export const playerDefault: IPlayer[] = [
    {
        id: '1',
        username: '4iter',
        countGoal: 243,
        countGame: 100,
        teamId: '1'
    }, {
        id: '2',
        username: 'Mag',
        countGoal: 243,
        countGame: 100,
        teamId: '1'
    }, {
        id: '3',
        username: 'Bond',
        countGoal: 243,
        countGame: 100,
        teamId: '2'
    }, {
        id: '4',
        username: 'Felix',
        countGoal: 243,
        countGame: 100,
        teamId: '2'
    }, {
        id: '5',
        username: 'Stan',
        countGoal: 0,
        countGame: 0,
        teamId: '3'
    }, {
        id: '6',
        username: 'Leha',
        countGoal: 0,
        countGame: 0,
        teamId: '3'
    }, {
        id: '7',
        username: 'Belka',
        countGoal: 0,
        countGame: 0,
    }, {
        id: '8',
        username: 'Solo',
        countGoal: 0,
        countGame: 0,
    }, {
        id: '9',
        username: 'Ram',
        countGoal: 0,
        countGame: 0,
    },
];

export const teamDefault: ITeam[] = [
    {
        id: '1',
        name: 'Дикари',
        players: ['1', '2'],
        countGame: 3,
        winGame: 2
    },
    {
        id: '2',
        name: 'Мстители',
        players: ['3', '4'],
        countGame: 3,
        winGame: 1
    },
    {
        id: '3',
        name: 'Драконы',
        players: ['5', '6'],
        countGame: 0,
        winGame: 0
    }
];

