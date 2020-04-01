export const VARIANT_GOALS: number[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
];

export const MAX_GOALS = VARIANT_GOALS[VARIANT_GOALS.length - 1];
export const [ MIN_GOALS ] = VARIANT_GOALS;
export const MIN_LENGTH_NAME = 2;
export const COUNT_PLAYERS_IN_TEAM = 2;
export const SNACK_BAR_DURATION = 2000;

export const DEFAULT_BUTTON_TEXT_EDITOR = 'Create';

export const MainColor = 'blue';
export const DefaultColor = '#ffffff';

export enum ColorTop {
    'gold' = 1, 'silver', '#cd7f32'
}

export enum ClassName {
    isWin = 'isWin', isLose = 'isLose'
}

export enum GameFormGroup {
    id = 'id', firstTeam = 'team1', secondTeam = 'team2', firstPlayer = 'player1', secondPlayer = 'player2', goals = 'goals'
}

export enum TeamFromGroup {
    id = 'id', name = 'name', image = 'image', teamId = 'teamId', userId = 'userId'
}

export enum UserFormGroup {
    id = 'id', name = 'name', image = 'image'
}

export const DisplayedColumns = {
    historyGames: [ 'id', 'teams', 'bill', 'date' ],
    ratingTeams: [ 'place', 'name', 'games', 'goals', 'winRate' ],
    ratingUsers: [ 'place', 'name', 'countGame', 'goals' ]
};

const serverAddress = 'http://172.18.144.38:8080';

export const UrlAddress = {
    image: serverAddress,
    game: `${serverAddress}/game`,
    team: `${serverAddress}/team`,
    tournament: `${serverAddress}/tournament`,
    addUser: `${serverAddress}/team/user`,
    user: `${serverAddress}/user`,
    uploadImage: `${serverAddress}/image`
};

export enum Message {
    success = 'Success', failed = 'Failed', close = 'Close'
}
