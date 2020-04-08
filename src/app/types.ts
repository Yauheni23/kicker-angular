export interface ITournament extends IEntity {
    teams: ITeamTournament[];
    games: IGameTournament[];
}

export interface ITeam extends IEntity {
    users: IUser[];
    goals: number;
    games: IGame[];
    place?: number;
    winRate?: number;
}

export interface IUser extends IEntity {
    mail?: string;
    games: any;
    goals: number;
    countGame: number;
    place?: number;
    teams?: IEntity[];
}

export interface ITeamUser {
    user: IUser;
    team: ITeam;
}

export interface IGame {
    id: string;
    date: Date;
    team1: IGameTeam;
    team2: IGameTeam;
}

interface IGameTournament {
    id: string;
    date: Date;
    teams: ITeamTournament[];
}

interface ITeamTournament extends IEntity {
    players: IEntity[];
    goals?: number;
}

interface IGameTeam extends IEntity {
    goals: number;
}

interface IEntity {
    id: string;
    name: string;
    image: string;
}
