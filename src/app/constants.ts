export const serverAddress = 'http://172.18.144.5:8080';

export const VARIANT_GOALS: number[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
];

export const MAX_GOALS = VARIANT_GOALS[VARIANT_GOALS.length - 1];

export const ColorTop = ['gold', 'silver', '#cd7f32'];
export const DefaultColor = '#ffffff';

export const GameFormGroup = {
    id: 'id',
    firstTeam: 'team1',
    secondTeam: 'team2',
    firstPlayer: 'player1',
    secondPlayer: 'player2',
    goals: 'goals'
};

export const TeamFromGroup = {
    id: 'id',
    name: 'name',
    image: 'image',
    team: 'team',
    user: 'user'
};

export const UserFormGroup = {
    id: 'id',
    name: 'name',
    image: 'image',
};

export const DisplayedColumns = {
    historyGames: ['id', 'teams', 'bill', 'date'],
    ratingTeams: ['place', 'name', 'games', 'goals', 'winRate'],
    ratingUsers: ['place', 'name', 'countGame', 'scope'],
};

export const MainColor = 'blue';

export const UrlAddress = {
    game: `${serverAddress}/game`,
    team: `${serverAddress}/team`,
    addUser: `${serverAddress}/team/user`,
    user: `${serverAddress}/user`,
    uploadImage: `${serverAddress}/image`,
};
