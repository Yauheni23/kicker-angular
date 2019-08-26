import {Injectable} from '@angular/core';
import {EditorService} from './editor';
import {HttpClient} from '@angular/common/http';
import {UrlAddress} from '../constants';
import {ITournament} from '../types';

@Injectable({
    providedIn: 'root'
})
export class TournamentService extends EditorService<ITournament> {
    constructor(protected httpClient: HttpClient) {
        super(httpClient, UrlAddress.tournament);
    }
}
