import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export class EditorService<T> {
    protected data: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

    protected constructor(protected httpClient: HttpClient, private urlAddress: string) {
    }

    getAll(): Observable<T[]> {
        this.httpClient.get<T[]>(this.urlAddress).subscribe(data => {
            this.data.next(data);
        });
        return this.data.asObservable();
    }

    getById(id: number): Observable<T> {
        return this.httpClient.get<T>(`${this.urlAddress}/${id}`);
    }

    create(data): Observable<T> {
        return this.httpClient.post<T>(this.urlAddress, data);
    }

    update(data: T): void {
        this.data.next(this.data.value.concat(data));
    }
}
