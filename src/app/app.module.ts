import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCheckboxModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';



import {HeaderComponent} from './components/header/header.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {FooterComponent} from './components/footer/footer.component';
import {EditorUserComponent} from './components/editor-user/editor-user.component';
import { UserPageComponent } from './screens/user-page/user-page.component';
import { TeamPageComponent } from './screens/team-page/team-page.component';
import { GamePageComponent } from './screens/game-page/game-page.component';
import { EditorGameComponent } from './components/editor-game/editor-game.component';
import { MatchTeamDescriptionComponent } from './components/match-team-description/match-team-description.component';
import { PlayerMatchGameComponent } from './components/player-match-game/player-match-game.component';

const appRoutes: Routes = [
    {path: 'game', component: GamePageComponent},
    {path: 'user', component: UserPageComponent},
    {path: 'team', component: TeamPageComponent},
    {
        path: '',
        redirectTo: '/user',
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
        UserPageComponent,
        TeamPageComponent,
        GamePageComponent,
        EditorGameComponent,
        MatchTeamDescriptionComponent,
        PlayerMatchGameComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
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
        MatSelectModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
