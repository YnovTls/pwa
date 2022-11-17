import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PexelResponse } from './pexels.model';
import { Observable } from 'rxjs';

const API_BASE_URL = 'https://api.pexels.com/v1';
const API_KEY = '563492ad6f91700001000001e623b607bfe04296b0c8c8a28ce6ed58';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public fetchImages(query: string): Observable<PexelResponse> {
    return this.http.get<PexelResponse>(
      `${API_BASE_URL}/search?query=${query}`,
      {
        headers: new HttpHeaders({
          Authorization: API_KEY,
          'Content-Type': 'application/json',
        }),
      }
    );
  }
}
