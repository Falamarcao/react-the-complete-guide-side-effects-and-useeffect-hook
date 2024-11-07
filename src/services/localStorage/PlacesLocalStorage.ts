import { AVAILABLE_PLACES } from '../../data/available_places';

import { Place } from '../../models/Place';

import { localStoreItems } from './models';

class PlacesLocalStorage {
  private static instance: PlacesLocalStorage;
  storedPlaces: Place[];

  private get storedIds(): string[] {
    let storedIds: string[];

    try {
      storedIds = JSON.parse(
        localStorage.getItem(localStoreItems.SELECTED_PLACES) || '[]'
      );
    } catch {
      storedIds = [];
    }

    return storedIds;
  }

  private constructor() {
    const storedPlaces: Place[] = this.storedIds.map(
      (id: string) => AVAILABLE_PLACES.find((place: Place) => place.id === id)!
    );

    this.storedPlaces = storedPlaces;
  }

  static getInstance(): PlacesLocalStorage {
    // Create a new instance if it doesn't exist yet
    if (!PlacesLocalStorage.instance) {
      PlacesLocalStorage.instance = new PlacesLocalStorage();
    }
    // Return the existing instance
    return PlacesLocalStorage.instance;
  }

  addPlace = (id: string): void => {
    const storedIds: string[] = this.storedIds;

    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        localStoreItems.SELECTED_PLACES,
        JSON.stringify([id, ...storedIds])
      );
    }
  };

  removePlace = (id: string): void => {
    localStorage.setItem(
      localStoreItems.SELECTED_PLACES,
      JSON.stringify(this.storedIds.filter((_id: string) => _id !== id))
    );
  };
}

export default PlacesLocalStorage;
