export interface ITeam {
    id: string;
    name: string;
    player1: IPlayer;
    player2: IPlayer;
    countGame: number;
    winGame: number;
}

export interface IPlayer {
    id: string;
    username: string;
    countGoal: number;
    countGame: number;
    teamId?: string;
}

export interface IGame {
    id: string;
    team1: ITeam | string;
    team2: ITeam | string;
    winTeam: ITeam | string;
    goalTeam1: number;
    goalTeam2: number;
    goalsStatistics?: IGoalsStatistics;
    time?: Date;
}

export interface IGoalsStatistics {
    team1Player1?: number;
    team1Player2?: number;
    team2Player1?: number;
    team2Player2?: number;
}

