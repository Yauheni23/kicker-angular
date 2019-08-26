export const VARIANT_GOALS: number[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
];

export const MAX_GOALS = VARIANT_GOALS[VARIANT_GOALS.length - 1];
export const [MIN_GOALS] = VARIANT_GOALS;
export const MIN_LENGTH_NAME = 2;
export const COUNT_PLAYERS_IN_TEAM = 2;
export const SNACK_BAR_DURATION = 2000;

export const DEFAULT_BUTTON_TEXT_EDITOR = 'Create';

export const MainColor = 'blue';
export const DefaultColor = '#ffffff';
export enum ColorTop {
    'gold' = 1,
    'silver',
    '#cd7f32'
}

export enum ClassName {
    isWin = 'isWin',
    isLose = 'isLose'
}

export enum GameFormGroup {
    id = 'id',
    firstTeam = 'team1',
    secondTeam = 'team2',
    firstPlayer = 'player1',
    secondPlayer = 'player2',
    goals = 'goals'
}

export enum TeamFromGroup {
    id = 'id',
    name = 'name',
    image = 'image',
    teamId = 'teamId',
    userId = 'userId'
}

export enum UserFormGroup {
    id = 'id',
    name = 'name',
    image = 'image'
}

export const DisplayedColumns = {
    historyGames: ['id', 'teams', 'bill', 'date'],
    ratingTeams: ['place', 'name', 'games', 'goals', 'winRate'],
    ratingUsers: ['place', 'name', 'countGame', 'goals'],
};

export enum UrlAddress {
    image = 'http://172.18.144.38:8080',
    game = 'http://172.18.144.38:8080/game',
    team = 'http://172.18.144.38:8080/team',
    tournament = 'http://172.18.144.38:8080/tournament',
    addUser = 'http://172.18.144.38:8080/team/user',
    user = 'http://172.18.144.38:8080/user',
    uploadImage = 'http://172.18.144.38:8080/image',
}

export enum Message {
    success = 'Success',
    failed = 'Failed',
    close = 'Close'
}
