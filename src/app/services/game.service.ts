import {Injectable} from '@angular/core';
import {IGame} from '../types';
import {UrlAddress} from '../constants';
import {HttpClient} from '@angular/common/http';
import {EditorService} from './editor';

@Injectable({providedIn: 'root'})
export class GameService extends EditorService<IGame> {
    constructor(protected httpClient: HttpClient) {
        super(httpClient, UrlAddress.game);
    }

    getByUser(id: string) {
        return this.httpClient.get<IGame[]>(this.urlAddress,{
            params: {
                userId: id,
            }
        })
    }

    getByTeam(id: string) {
        return this.httpClient.get<IGame[]>(this.urlAddress,{
            params: {
                teamId: id,
            }
        })
    }
}
