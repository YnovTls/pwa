import { Component } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ApiService } from './api.service';
import { Photo } from './pexels.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public photos: Photo[] = [];
  public searchValue: string = 'rocket';
  public hasError: boolean = false;

  constructor(private apiService: ApiService) {
    this.search();
  }

  public search(): void {
    if (this.searchValue !== '') {
      this.apiService
        .fetchImages(this.searchValue)
        .pipe(
          map((response) => {
            this.photos = response.photos;
            this.hasError = false;
          }),
          catchError((err) => of(this.onError(err)))
        )
        .subscribe();
    }
  }

  private onError(error: any): void {
    console.log(error);
    this.hasError = true;
  }
}
