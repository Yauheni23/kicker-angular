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
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {NavigationComponent} from './components/navigation/navigation.component';
import {EditorUserComponent} from './components/editors/editor-user/editor-user.component';
import {EditorPageComponent} from './screens/editor-page/team-page.component';
import {EditorGameComponent} from './components/editors/editor-game/editor-game.component';
import {EditorTeamComponent} from './components/editors/editor-team/editor-team.component';
import {EditorLayoutComponent} from './components/editors/editor-layout/editor-layout.component';
import {RatingTeamsComponent} from './components/rating/rating-teams/rating-teams.component';
import {RatingUsersComponent} from './components/rating/rating-users/rating-users.component';
import {HistoryGamesComponent} from './components/history-games/history-games.component';
import {DescriptionGameLayoutComponent} from './components/history-games/description-game-layout/description-game-layout.component';
import {RatingComponent} from './screens/rating/rating.component';
import {UploadImageComponent} from './components/upload-image/upload-image.component';
import {SelectTeamComponent} from './components/editors/editor-game/select-team/select-team.component';
import {ListTeamPlayersComponent} from './components/editors/editor-game/list-team-players/list-team-players.component';
import {TeamPlayerDragAndDropComponent} from './components/team-player-drag-and-drop/team-player-drag-and-drop.component';
import {DialogComponent} from './components/dialog/dialog.component';
import {TournamentComponent} from './components/tournament/tournament.component';

const appRoutes: Routes = [
    {path: 'tournament', component: TournamentComponent},
    {path: 'editor', component: EditorPageComponent},
    {path: 'rating', component: RatingComponent},
    {path: 'history', component: HistoryGamesComponent},
    {
        path: '',
        redirectTo: 'rating',
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
        EditorTeamComponent,
        EditorLayoutComponent,
        RatingTeamsComponent,
        RatingUsersComponent,
        HistoryGamesComponent,
        DescriptionGameLayoutComponent,
        RatingComponent,
        UploadImageComponent,
        SelectTeamComponent,
        ListTeamPlayersComponent,
        TeamPlayerDragAndDropComponent,
        DialogComponent,
        TournamentComponent,
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
        DragDropModule,
        MatDialogModule,
        MatSnackBarModule,
    ],
    providers: [],
    entryComponents: [DialogComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
