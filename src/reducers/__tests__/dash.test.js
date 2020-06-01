import * as types from "../../utils/types";
import dash from "../dash";

const bookings = [
  {
    title:
      "T3 à 5 min du métro Villejuif Louis Aragon, rénové par un architecte",
    description:
      "- le T3 se situe au 2, allée de la capitainerie des chasses Villejuif\n- à 5 min à pied du métro Villejuif Louis Aragon\n- à 7 min à pied du métro Villejuif Paul Vaillant Couturier\n- de nombreux commerces autour (supermarchés, pharmacie, boulangerie...)\n- Loyer de 1600€ charges comprises\n- Appartement tout équipé (lave linge, lave vaisselle, literie de qualité, micro onde, four, plaques, frigo...)\n- 2 chambres meublées avec placard\n- 1 box parking au sous-sol\n- Double-vitrage à toutes les fenêtres\nMerci de préciser votre lieu de travail /d'études pour évaluer les distances\nA bientôt",
    category: "Locations",
    link: "https://www.leboncoin.fr/locations/1789224326.htm",
    images: [
      "https://img0.leboncoin.fr/ad-image/da7a6a48baa2b968d5193875873fe11119ced43a.jpg",
      "https://img2.leboncoin.fr/ad-image/0416859afbfb78d4b81afbc62b696a8d79d5e586.jpg",
      "https://img2.leboncoin.fr/ad-image/e65ff0b241c9a70ffab9055951b8c6bee1e3917a.jpg",
      "https://img0.leboncoin.fr/ad-image/da7a6a48baa2b968d5193875873fe11119ced43a.jpg",
      "https://img2.leboncoin.fr/ad-image/0416859afbfb78d4b81afbc62b696a8d79d5e586.jpg",
      "https://img2.leboncoin.fr/ad-image/e65ff0b241c9a70ffab9055951b8c6bee1e3917a.jpg",
    ],
    location: {
      country_id: "FR",
      region_id: "12",
      region_name: "Ile-de-France",
      department_id: "94",
      department_name: "Val-de-Marne",
      city_label: "Villejuif 94800",
      city: "Villejuif",
      zipcode: "94800",
      lat: 48.79283,
      lng: 2.36935,
      source: "city",
      provider: "here",
      is_shape: true,
      feature: {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [2.36935, 48.79283],
        },
        properties: null,
      },
    },
    urgent: false,
    price: 1600,
    date: "2020-05-29T13:02:18.000Z",
    date_index: "2020-05-29T13:02:18.000Z",
    owner: {
      store_id: "14883677",
      user_id: "13e413ce-17c8-49f0-8d7b-d61b5d6dd17a",
      type: "private",
      name: "Sarah",
      no_salesmen: false,
    },
    attributes: {
      real_estate_type: "2",
      furnished: "1",
      square: "59",
      rooms: "3",
      energy_rate: "d",
      ges: "Non renseigné",
      charges_included: "1",
      is_import: "false",
      lease_type: "rent",
    },
    id: 1789224326,
  },
];
describe("Reducers", () => {
  const initialState = {
    bookings: [],
  };

  it("should return the initial state", () => {
    expect(dash(undefined, {})).toEqual(initialState);
  });

  it("should update bookings array", () => {
    const expectedState = {
      ...initialState,
      bookings,
    };
    expect(
      dash(undefined, { type: types.SET_BOOKINGS, bookings: bookings })
    ).toEqual(expectedState);
  });
});
