import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTabsModule} from '@angular/material/tabs';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatCardModule} from '@angular/material/card';

import {NavigationComponent} from './components/navigation/navigation.component';
import {EditorUserComponent} from './components/editors/editor-user/editor-user.component';
import {EditorPageComponent} from './screens/editor-page/team-page.component';
import {EditorGameComponent} from './components/editors/editor-game/editor-game.component';
import {MatchTeamDescriptionComponent} from './components/editors/editor-game/match-team-description/match-team-description.component';
import {EditorTeamComponent} from './components/editors/editor-team/editor-team.component';
import {EditorLayoutComponent} from './components/editors/editor-layout/editor-layout.component';
import {RatingTeamsComponent} from './components/rating/rating-teams/rating-teams.component';
import {RatingUsersComponent} from './components/rating/rating-users/rating-users.component';
import {HistoryGamesComponent} from './components/history-games/history-games.component';
import {DescriptionGameLayoutComponent} from './components/history-games/description-game-layout/description-game-layout.component';
import {RatingComponent} from './screens/rating/rating.component';
import {UploadImageComponent} from './components/upload-image/upload-image.component';
import {EditorTeamUserComponent} from './components/editors/editor-team-user/editor-team-user.component';
import {SelectTeamComponent} from './components/editors/editor-game/select-team/select-team.component';
import {ListTeamPlayersComponent} from './components/editors/editor-game/list-team-players/list-team-players.component';
import {PlayerStatisticsComponent} from './components/editors/editor-game/player-statistics/player-statistics.component';

const appRoutes: Routes = [
    {path: 'create/game', component: EditorGameComponent},
    {path: 'create/team', component: EditorPageComponent},
    {path: 'rating', component: RatingComponent},
    {path: 'history/games', component: HistoryGamesComponent},
    {
        path: '',
        redirectTo: 'create/game',
        pathMatch: 'full'
    },
];

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        EditorUserComponent,
        EditorPageComponent,
        EditorGameComponent,
        MatchTeamDescriptionComponent,
        EditorTeamComponent,
        EditorLayoutComponent,
        RatingTeamsComponent,
        RatingUsersComponent,
        HistoryGamesComponent,
        DescriptionGameLayoutComponent,
        RatingComponent,
        UploadImageComponent,
        EditorTeamUserComponent,
        SelectTeamComponent,
        ListTeamPlayersComponent,
        PlayerStatisticsComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatTabsModule,
        MatCardModule,
        DragDropModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
