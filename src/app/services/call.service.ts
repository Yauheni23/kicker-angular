import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UrlAddress} from '../constants';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CallService {
    readonly urlAddress = UrlAddress.call;
    data: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    options  = {};

    constructor(private httpClient: HttpClient) {
    }

    getAll(params) {
        this.options = {params};
        this.httpClient.get<any[]>(this.urlAddress, this.options)
            .subscribe(data => this.data.next(data));

        return this.data.asObservable();
    }

    getById(id: string) {
        return this.httpClient.get(`${this.urlAddress}/${id}`, {});
    }

    create(data) {
        return this.httpClient.post(this.urlAddress, data);
    }

    update(data, id) {
        return this.httpClient.put(this.urlAddress, data, {
            params: {
                id
            }
        });
    }

    updateAll() {
        this.httpClient.get<any[]>(this.urlAddress, this.options)
            .subscribe(data => this.data.next(data));
    }
}
