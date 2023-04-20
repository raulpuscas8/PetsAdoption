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
console.log(app);

export async function addPet(id, name, animalType, breed, age, sex, location) {
  const response = await axios.post(URL + `/users/${id}/animals.json`, {
    name: name,
    animalType: animalType,
    breed: breed,
    age: age,
    sex: sex,
    location: location,
  });
  const animalId = response.data.name;

  return animalId;
}

export async function deleteFriend(userId, friendId, formattedPath) {
  await deleteImage(formattedPath);
  const response = await axios.delete(
    URL + `/users/${userId}/friends/${friendId}.json`
  );
  return response.data;
}

export async function editFriend(userId, friendId, friendData) {
  const response = await axios.patch(
    URL + `/users/${userId}/friends/${friendId}.json`,
    friendData
  );
  return response.data;
}

export async function getUsersFriend(id) {
  const friends = [];
  const response = await axios.get(URL + `/users/${id}/friends.json`);
  for (const key in response.data) {
    // console.log(response.data);
    const friendsRetrieved = {
      gender: response.data[key].gender,
      name: response.data[key].name.name,
      birthday: response.data[key].birthday,
      interests: response.data[key].interests,
      key: key,
      image: await getImageURL(`friends/${id}/${key}.jpeg`),
    };
    // console.log(friendsRetrieved);
    friends.push(friendsRetrieved);
  }
  return friends;
}

export async function getFemaleInterests(idInterest, indexOfInterest) {
  const response = await axios.get(
    URL + `/interests/female/${idInterest}/${indexOfInterest}.json`
  );
  const femaleInterests = {
    informationInterests: response.data,
    imageInterests: await getImageURL(
      `interests/female/${idInterest}/${indexOfInterest}.jpg`
    ),
  };
  console.log(femaleInterests);
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