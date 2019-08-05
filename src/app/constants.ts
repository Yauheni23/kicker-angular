import {IGame, IPlayer, ITeam} from './types';

export const goalsVariant: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
];

export enum PlaceColor {
    First = 'gold',
    Second = 'silver',
    Third = '#cd7f32',
    Default = '#ffffff'
}

export const gameDefault: IGame[] = [
    {
        id: '1',
        team1: '1',
        team2: '2',
        goalsTeam1: 10,
        goalsTeam2: 6,
        goalsStatistics: {
            team1Player1: 1,
            team1Player2: 9,
            team2Player1: 5,
            team2Player2: 1
        },
        date: new Date(2019, 5, 10)
    }, {
        id: '2',
        team1: '1',
        team2: '2',
        goalsTeam1: 10,
        goalsTeam2: 9,
        goalsStatistics: {
            team1Player1: 5,
            team1Player2: 5,
            team2Player1: 5,
            team2Player2: 4
        },
        date: new Date(2019, 5, 8)
    }, {
        id: '3',
        team1: '1',
        team2: '2',
        goalsTeam1: 8,
        goalsTeam2: 10,
        goalsStatistics: {
            team1Player1: 6,
            team1Player2: 2,
            team2Player1: 5,
            team2Player2: 5
        },
        date: new Date(2019, 5, 7)
    },
];

export const playerDefault: IPlayer[] = [
    {
        id: '1',
        username: '4iter',
        countGoal: 110,
        countGame: 100,
    }, {
        id: '2',
        username: 'Mag',
        countGoal: 200,
        countGame: 100,
    }, {
        id: '3',
        username: 'Bond',
        countGoal: 95,
        countGame: 100,
    }, {
        id: '4',
        username: 'Felix',
        countGoal: 243,
        countGame: 100,
    }, {
        id: '5',
        username: 'Stan',
        countGoal: 0,
        countGame: 0,
    }, {
        id: '6',
        username: 'Leha',
        countGoal: 0,
        countGame: 0,
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
        countGoal: 300,
        countGame: 40,
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
        countGame: 6,
        winGame: 5
    }
];

