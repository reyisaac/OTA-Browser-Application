import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from './user-data.model';
import { Subject } from 'rxjs';


@Injectable({ providedIn: 'root'})
export class AuthService {
    private token: string;
    private authStatusListener = new Subject<boolean>();

    constructor(private http: HttpClient) {}

    getToken() {
        return this.token;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    createUser(email: string, password: string, first_name: string, last_name: string) {
        const userData: UserData = {
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name
        };

        this.http.post('http://localhost:3000/api/user/signup', userData)
            .subscribe(response => {
                console.log(response);
            });
    }

    login(email: string, password: string) {
        this.http.post<{token: string}>('http://localhost:3000/api/user/login',  { email: email, password: password })
            .subscribe(response => {
                const token = response.token;
                this.token = token;
                this.authStatusListener.next(true);
            });
    }
}
