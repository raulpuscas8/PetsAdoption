# PetsAdoption

Adresa repository GitHub: https://github.com/raulpuscas8/PetsAdoption

Pawsitive Adoptions reprezintă aplicația mobilă realizată pentru finalizarea studiilor universitare de licență la Universitatea Politehnică Timișoara, Facultatea de Automatică și Calculatoare, specializarea Automatică și Informatică Aplicată, 2022-2023.

Pawsitive Adoptions poate să fie compilată cu următorii pași:

1. Instrumente necesare:

Visual Studio Code - pentru compilarea codului
XCode - pentru a vedea modificările direct din simulator - !!ATENȚIE ACEASTĂ APLICAȚIE ESTE DISPONIBILĂ DOAR PE MacOS
Suplimentar aplicația poate să fie folosită și cu aplicația de telefon numită ExpoGo

2. Verificare în terminal înainte de clonare

Verificare:

react-native --v
npm -v
yarn -version
node -v
!!Dacă lipsește oricare din cele de mai sus trecem la pasul următor. Dacă totul este pentru ultima versiune se trece direct la pasul 3.

Instalare:

instalare Node.js https://nodejs.org/en/download
npm install -g npm
npm install -g react-native-cli

3. Comenzi pentru clonarea aplicației:

git clone https://github.com/raulpuscas8/PetsAdoption
cd PetsAdoption
npm install -g yarn
cd ios && pod install
react-native start

4. Comenzile pentru pornirea aplicației

Avem nevoie de 2 terminale
În primul terminal folosim comenzile:
cd src/server
nodemon index

În al doilea terminal folosim comanda:

yarn start
După ce aplicația s-a pornit se poate alege unde se dorește să fie rulată, pentru XCode se folosește butonul i de la tastatură iar pentru rularea în ExpoGo de pe telefon se scanează codul QR cu camera de la telefon.

!!ATENȚIE: Pentru rularea aplicației pe telefon calculatorul și telefonul trebuie să fie pe acceași rețea.
