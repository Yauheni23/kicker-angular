export interface ITeam {
    id: string;
    name: string;
    image: string;
    users: IUser[];
    goals: number;
    games: IGame[];
    place?: number;
    winRate?: number;
}

export interface IUser {
    id: string;
    name: string;
    image: string;
    scope: number;
    countGame: number;
    place?: number;
    teams?: {
        id: string,
        name: string,
        image: string
    }[];
}

export interface IGame {
    id: string;
    date: Date;
    team1: {
        id: string;
        name: string;
        image: string;
        goals: number;
    };
    team2: {
        id: string;
        name: string;
        image: string;
        goals: number;
    };
}
