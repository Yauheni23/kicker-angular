import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export class EditorService<T> {
    protected data: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

    protected constructor(protected httpClient: HttpClient, protected urlAddress: string) {
    }

    getAll(): Observable<T[]> {
        this.httpClient.get<T[]>(this.urlAddress).subscribe(data => {
            this.data.next(data);
        });
        return this.data.asObservable();
    }

    getById(id: string): Observable<T> {
        return this.httpClient.get<T>(`${this.urlAddress}/${id}`);
    }

    create(data: any): Observable<T> {
        return this.httpClient.post<T>(this.urlAddress, data);
    }

    update(data: T): void {
        this.data.next(this.data.value.concat(data));
    }
}
