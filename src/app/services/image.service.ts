import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {serverAddress} from '../constants';

export class ImageService {

  constructor(private httpClient: HttpClient) {}

  public uploadImage(image: File): Observable<any> {
    const formData = new FormData();

    formData.append('image', image);

    return this.httpClient.post(serverAddress + '/image', formData);
  }
}
