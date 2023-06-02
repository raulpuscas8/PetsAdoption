import axios from "axios";
import { initializeApp } from "firebase/app";
import { get } from "firebase/database";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
  deleteObject,
} from "firebase/storage";

const URL =
  "https://petsadoption-e9f83-default-rtdb.europe-west1.firebasedatabase.app";
const firebaseConfig = {
  apiKey: "AIzaSyCKsoIx0tlq6tUs77W6tUW0F8yEJSnKYuI",
  authDomain: "petsadoption-e9f83.firebaseapp.com",
  projectId: "petsadoption-e9f83",
  storageBucket: "petsadoption-e9f83.appspot.com",
  messagingSenderId: "1031852919076",
  appId: "1:1031852919076:web:2483d7a5014152daa8cbb1",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
//console.log(app);

export async function addPet(
  // id,
  name,
  animalType,
  breed,
  age,
  sex,
  // location,
  tara,
  judet,
  localitate,
  description,
  addedOn,
  userName,
  email,
  accepted,
  telefon
) {
  // const unixTime = getUnixTime(new Date());

  //users/${id}/animals.json`
  const response = await axios.post(URL + `/pets.json`, {
    name: name,
    animalType: animalType,
    breed: breed,
    age: age,
    sex: sex,
    // location: location,
    tara: tara,
    judet: judet,
    localitate: localitate,
    description: description,
    addedOn: addedOn, // add the current date and time to the pet data
    userName: userName,
    email: email,
    accepted: accepted, // initial anuntul nu e acceptat de admin si va fi pe 0
    telefon: telefon,
  });
  const animalId = response.data.name;

  return animalId;
}

// export async function deleteFriend(userId, friendId, formattedPath) {
//   await deleteImage(formattedPath);
//   const response = await axios.delete(
//     URL + `/users/${userId}/friends/${friendId}.json`
//   );
//   return response.data;
// }

export async function deletePet(petId, formattedPath) {
  await deleteImage(formattedPath);
  const response = await axios.delete(URL + `/pets/${petId}.json`);
  return response.data;
}

// export async function editFriend(userId, friendId, friendData) {
//   const response = await axios.patch(
//     URL + `/users/${userId}/friends/${friendId}.json`,
//     friendData
//   );
//   return response.data;
// }

export async function editPet(petId, petData) {
  const response = await axios.patch(URL + `/pets/${petId}.json`, petData);
  return response.data;
}

export async function getPet() {
  const pets = [];
  const response = await axios.get(URL + `/pets.json`);
  for (const key in response.data) {
    //console.log(response.data);
    const petsRetrieved = {
      name: response.data[key].name,
      animalType: response.data[key].animalType,
      breed: response.data[key].breed,
      age: response.data[key].age,
      sex: response.data[key].sex,
      telefon: response.data[key].telefon,
      // location: response.data[key].location,
      tara: response.data[key].tara,
      judet: response.data[key].judet,
      localitate: response.data[key].localitate,
      description: response.data[key].description,
      addedOn: response.data[key].addedOn,
      userName: response.data[key].userName,
      email: response.data[key].email,
      accepted: response.data[key].accepted,
      key: key,
      image: await getImageURL(`pets/${key}-principală.jpeg`),
      image1: await getImageURL(`pets/${key}-secundară.jpeg`),
      image2: await getImageURL(`pets/${key}-terțiară.jpeg`),
    };
    // console.log(petsRetrieved);
    pets.push(petsRetrieved);
  }
  return pets;
}

export async function getImageURL(path) {
  const imageRef = ref(storage, path);
  const URL = await getDownloadURL(imageRef).then((responseURL) => {
    return responseURL;
  });

  return URL;
}

export async function addImage(path, formattedPath) {
  const imageRef = ref(storage, formattedPath);
  console.log(imageRef);
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", path, true);
    xhr.send(null);
  });
  const snap = await uploadBytes(imageRef, blob);
  blob.close();
  return snap;
}

export async function deleteImage(formattedPath) {
  const imageRef = ref(storage, formattedPath);
  await deleteObject(imageRef);
}

export async function editImage(path, newPath) {
  const imageRef = ref(storage, path);
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", newPath, true);
    xhr.send(null);
  });
  const snap = await uploadBytes(imageRef, blob);
  console.log(snap);
  blob.close();
  return snap;
}
