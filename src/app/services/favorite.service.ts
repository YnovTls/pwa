import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import {
  collection,
  CollectionReference,
  DocumentData,
} from '@firebase/firestore';
import { Observable } from 'rxjs';
import { GenericFirestoreService } from './generic-firestore.service';
import { v4 as uuidv4 } from 'uuid';

export interface Favorite {
  id: string;
  search: string;
  photoId: number;
}

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoritesCollection: CollectionReference<DocumentData>;

  constructor(
    private readonly firestore: Firestore,
    private readonly genericeFirestore: GenericFirestoreService
  ) {
    this.favoritesCollection = collection(this.firestore, 'favorites');
  }

  public fetchFavorites(
    direction: 'asc' | 'desc' = 'asc'
  ): Observable<Favorite[]> {
    return this.genericeFirestore.fetchAll<Favorite>(
      this.favoritesCollection,
      'search',
      direction
    );
  }

  public addNewFavorite(favorite: Favorite): Promise<void> {
    favorite.id = uuidv4();
    return this.genericeFirestore.createWithCustomID(
      this.favoritesCollection,
      favorite,
      favorite.id
    );
  }

  public updateFavorite(favorite: Favorite): Promise<void> {
    return this.genericeFirestore.update('favorites', favorite);
  }
}
