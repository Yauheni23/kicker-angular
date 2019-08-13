import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UrlAddress} from '../constants';

export class ImageService {
    constructor(private httpClient: HttpClient) {
    }

    uploadImage(image: File): Observable<{ link: string }> {
        const formData = new FormData();
        formData.append('image', image);

        return this.httpClient.post<{ link: string }>(UrlAddress.uploadImage, formData);
    }
}
