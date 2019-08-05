export interface ITeam {
    id: string;
    name: string;
    players: string[];
    countGame: number;
    winGame: number;
}

export interface IPlayer {
    id: string;
    username: string;
    countGoal: number;
    countGame: number;
    role?: string;
}

export interface IGame {
    id: string;
    team1: string;
    team2: string;
    goalsTeam1: number;
    goalsTeam2: number;
    date: Date;
    goalsStatistics?: IGoalsStatistics;
}

export interface IGoalsStatistics {
    team1Player1: number;
    team1Player2: number;
    team2Player1: number;
    team2Player2: number;
}

