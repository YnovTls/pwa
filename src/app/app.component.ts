import { Component } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { ApiService } from './services/api.service';
import { Photo } from './pexels.model';
import { Favorite, FavoriteService } from './services/favorite.service';
import { UpdateService } from './services/update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private favoriteList: Favorite[] = [];

  public photos: Photo[] = [];
  public searchValue: string = 'rocket';
  public hasError: boolean = false;
  public favoriteId: number = 0;

  public updateDetected: boolean = false;
  public updateReady: boolean = false;

  constructor(
    private readonly apiService: ApiService,
    private favoriteService: FavoriteService,
    private updateService: UpdateService
  ) {
    this.updateService.updateDetected$
      .pipe(map((state) => (this.updateDetected = state)))
      .subscribe();
    this.updateService.updateReady$
      .pipe(map((state) => (this.updateReady = state)))
      .subscribe();

    this.search();

    this.favoriteService
      .fetchFavorites()
      .pipe(
        map((favorites) => (this.favoriteList = favorites)),
        tap(() => this.setFavorite())
      )
      .subscribe();
  }

  public forceUpdate(): void {
    this.updateService.forceUpdate();
  }

  public search(): void {
    if (this.searchValue !== '') {
      this.apiService
        .fetchImages(this.searchValue)
        .pipe(
          map((response) => {
            this.photos = response.photos;
            this.hasError = false;
            this.setFavorite();
          }),
          catchError((err) => of(this.onError(err)))
        )
        .subscribe();
    }
  }

  public async addFavorite(photoId: number): Promise<void> {
    const favorite: Favorite | undefined = this.favoriteList.find(
      (f) => f.search === this.searchValue
    );

    if (favorite) {
      favorite.photoId = photoId;
      await this.favoriteService.updateFavorite(favorite);
    } else {
      await this.favoriteService.addNewFavorite({
        id: '',
        photoId,
        search: this.searchValue,
      });
    }
  }

  private onError(error: any): void {
    console.log(error);
    this.hasError = true;
  }

  private setFavorite(): void {
    const favorite: Favorite | undefined = this.favoriteList.find((f) =>
      this.photos.find((p) => p.id === f.photoId)
    );
    this.favoriteId = favorite ? favorite.photoId : 0;
  }
}
