import { useEffect, useRef, useState } from 'react';

import logoImg from './assets/logo.png';

import DeleteConfirmation from './components/DeleteConfirmation';
import Modal, { ModalRef } from './components/Modal';
import Places from './components/Places';

import { AVAILABLE_PLACES } from './data/available_places.ts';

import { Place } from './models/Place.ts';


import PlacesLocalStorage from './services/localStorage/PlacesLocalStorage.ts';

import { sortPlacesByDistance } from './utils/loc.ts';

// Browser localStorage
const placesLocalStorage = PlacesLocalStorage.getInstance();

function App() {
  const modal = useRef<ModalRef>(null);
  const selectedPlace = useRef<string>('');
  const [availablePlaces, setAvailablePlaces] = useState<Place[]>([]);
  const [pickedPlaces, setPickedPlaces] = useState<Place[]>(
    placesLocalStorage.storedPlaces
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      setAvailablePlaces(sortedPlaces);
    });
  }, []); // With dependencies array empty the block will only be executed on the first render.

  function handleStartRemovePlace(id: string) {
    modal?.current?.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal?.current?.close();
  }

  function handleSelectPlace(id: string) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place: Place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id)!;
      return [place, ...prevPickedPlaces];
    });

    // Browser localStorage
    placesLocalStorage.addPlace(id);
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace?.current)
    );
    modal?.current?.close();

    // Browser localStorage
    placesLocalStorage.removePlace(selectedPlace.current);
  }

  return (
    <>
      <Modal ref={modal}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
