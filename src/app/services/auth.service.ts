import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlAddress } from '../constants';
import { Router } from '@angular/router';

interface IUser {
    id: string; name: string; mail: string; token: string; image: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    token: string;
    currentUser: IUser;

    constructor(private httpClient: HttpClient, private router: Router) {
        this.token = JSON.parse(localStorage.getItem('token'));
        this.currentUser = JSON.parse(localStorage.getItem('user'));

        this.auth = this.auth.bind(this);
    }

    login(data) {
        return this.httpClient.post<IUser>(UrlAddress.login, data)
            .subscribe(this.auth);
    }

    register(data) {
        return this.httpClient.post<IUser>(UrlAddress.register, data)
            .subscribe(this.auth);
    }

    removeToken() {
        this.token = undefined;
        this.currentUser = undefined;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    update(user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUser = user;
    }

    private auth(user) {
        localStorage.setItem('token', JSON.stringify(user.token));
        localStorage.setItem('user', JSON.stringify(user));
        this.token = user.token;
        this.currentUser = user;

        this.router.navigate(['user', this.currentUser.id]);
    }
}
