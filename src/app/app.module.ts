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

import {HeaderComponent} from './components/header/header.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {FooterComponent} from './components/footer/footer.component';
import {EditorUserComponent} from './components/editor-user/editor-user.component';
import { TeamPageComponent } from './screens/team-page/team-page.component';
import { GamePageComponent } from './screens/game-page/game-page.component';
import { EditorGameComponent } from './components/editor-game/editor-game.component';
import { MatchTeamDescriptionComponent } from './components/match-team-description/match-team-description.component';
import { PlayerMatchGameComponent } from './components/player-match-game/player-match-game.component';
import { EditorTeamComponent } from './components/editor-team/editor-team.component';
import { EditorLayoutComponent } from './components/editor-layout/editor-layout.component';
import { RatingTeamsComponent } from './components/rating-teams/rating-teams.component';
import { RatingUsersComponent } from './components/rating-users/rating-users.component';
import { HistoryGamesComponent } from './components/history-games/history-games.component';
import { DescriptionGameLayoutComponent } from './components/description-game-layout/description-game-layout.component';
import { RatingComponent } from './screens/rating/rating.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';

const appRoutes: Routes = [
    {path: 'create/game', component: GamePageComponent},
    {path: 'create/team', component: TeamPageComponent},
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
        SidenavComponent,
        HeaderComponent,
        NavigationComponent,
        FooterComponent,
        EditorUserComponent,
        TeamPageComponent,
        GamePageComponent,
        EditorGameComponent,
        MatchTeamDescriptionComponent,
        PlayerMatchGameComponent,
        EditorTeamComponent,
        EditorLayoutComponent,
        RatingTeamsComponent,
        RatingUsersComponent,
        HistoryGamesComponent,
        DescriptionGameLayoutComponent,
        RatingComponent,
        UploadImageComponent
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
        MatTabsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
