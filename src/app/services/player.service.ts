import {Injectable} from '@angular/core';
import {IUser} from '../types';
import {UrlAddress} from '../constants';
import {HttpClient} from '@angular/common/http';
import {EditorService} from './editor';

@Injectable({providedIn: 'root'})
export class PlayerService extends EditorService<IUser> {
    constructor(protected httpClient: HttpClient) {
        super(httpClient, UrlAddress.user);
    }

    updateTeams(id: number, team): void {
        this.data.value.find(player => player.id === id).teams.push({
            id: team.id,
            name: team.name,
            image: team.image
        });
    }
}
