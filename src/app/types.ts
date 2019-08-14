export interface ITeam extends IEntity {
    users: IUser[];
    goals: number;
    games: IGame[];
    place?: number;
    winRate?: number;
}

export interface IUser extends IEntity {
    scope: number;
    countGame: number;
    place?: number;
    teams?: IEntity[];
}

export interface ITeamUser {
    user: IUser;
    team: ITeam;
}

export interface IGame {
    id: number;
    date: Date;
    team1: IGameTeam;
    team2: IGameTeam;
}

interface IGameTeam extends IEntity {
    goals: number;
}

interface IEntity {
    id: number;
    name: string;
    image: string;
}
