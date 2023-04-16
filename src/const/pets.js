const pets = [
  {
    pet: "cats",
    pets: [
      {
        id: "1",
        name: "Tzaka",
        image: require("../assets/cat1.png"),
        type: "Chausie",
        age: "5 years old",
        location: "8700 E. Squaw Creek Rd. Barberton, OH 44203",
      },
      {
        id: "2",
        name: "Marinela",
        image: require("../assets/cat2.png"),
        type: "Bobtail",
        age: "2 years old",
        location: "810 W. Magnolia Street Mountain View, CA 94043",
      },
      {
        id: "3",
        name: "Ghita",
        image: require("../assets/cat3.png"),
        type: "Ragamuffin",
        age: "2 years old",
        location: "414 Bridge Road Honolulu, HI 96815",
      },
    ],
  },
  {
    pet: "dogs",
    pets: [
      {
        id: "1",
        name: "Bally",
        image: require("../assets/dog1.png"),
        type: "German Shepherd",
        age: "2 years old",
        location: "8106 Lexington Ave. Drexel Hill, PA 19026",
      },
      {
        id: "2",
        name: "Max",
        image: require("../assets/dog2.png"),
        type: "Foxhound",
        age: "2 years old",
        location: "11 Kingston Lane Falls Church, VA 22041",
      },
    ],
  },
  {
    pet: "birds",
    pets: [
      {
        id: "1",
        name: "Coco",
        image: require("../assets/bird1.png"),
        type: "Parrot",
        age: "2 years old",
        location: "9462 Court St. Greenwood, SC 29646",
      },
      {
        id: "2",
        name: "Alfie",
        image: require("../assets/bird2.png"),
        type: "Parrot",
        age: "4 years old",
        location: "11 Kingston Lane Falls Church, VA 22041",
      },
    ],
  },
  {
    pet: "bunnies",
    pets: [
      {
        id: "1",
        name: "Boots",
        image: require("../assets/bunny1.png"),
        type: "Angora",
        age: "1 years old",
        location: "8455 Bellevue Dr. Bethpage, NY 11714",
      },
      {
        id: "2",
        name: "Pookie",
        image: require("../assets/bunny2.png"),
        type: "Angora",
        age: "1 years old",
        location: "531 North Clark Street Leominster, MA 01453",
      },
    ],
  },
];

export default pets;
