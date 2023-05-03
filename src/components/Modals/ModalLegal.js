import { StyleSheet, Text, View, Modal } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../../const/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const ModalLegal = ({ isVisible, onClose, navigation }) => {
  return (
    <Modal animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <ScrollView>
        <SafeAreaView
          style={{
            marginTop: 70,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={25}
            color={COLORS.dark}
            onPress={onClose}
          />

          <Text
            style={{
              marginTop: 10,
              color: COLORS.black,
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Dragă utilizatorule,
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: COLORS.black,
              fontSize: 14,
              maxWidth: "98%",
            }}
          >
            Bun venit la Pawsitive Adoption, o aplicație mobilă iOS care vă
            ajută să vă găsiți prietenul blănos perfect pentru adopție. Înainte
            de a utiliza aplicația noastră, vă rugăm să citiți cu atenție și să
            fiți de acord cu următorul acord de licență.
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: COLORS.black,
              fontSize: 15,
              fontWeight: "bold",
              maxWidth: "98%",
            }}
          >
            Proprietate
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: COLORS.black,
              fontSize: 14,
            }}
          >
            Pawsitive Adoption este deținută și operată de Raul Pușcaș. Toate
            drepturile de proprietate, drepturile de autor, mărcile comerciale,
            brevetele și secretele comerciale, în aplicație și conținutul
            acesteia, sunt deținute de Raul Pușcaș. Acordarea licenței Raul
            Pușcaș vă acordă o licență limitată, neexclusivă, netransferabilă și
            revocabilă pentru a utiliza aplicația mobilă Pawsitive Adoption
            exclusiv pentru uz personal, necomercial. Nu puteți utiliza
            aplicația în niciun alt scop fără acordul prealabil scris al lui
            Raul Pușcaș.
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: COLORS.black,
              fontSize: 15,
              fontWeight: "bold",
              maxWidth: "98%",
            }}
          >
            Conținutul utilizatorului
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: COLORS.black,
              fontSize: 14,
            }}
          >
            Înțelegeți și sunteți de acord că orice conținut, inclusiv, dar fără
            a se limita la, fotografii, videoclipuri și text, pe care îl
            încărcați în aplicația Pawsitive Adoption devine proprietatea lui
            Raul Pușcaș.
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: COLORS.black,
              fontSize: 15,
              fontWeight: "bold",
              maxWidth: "98%",
            }}
          >
            Utilizare interzisă
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: COLORS.black,
              fontSize: 14,
            }}
          >
            Nu puteți utiliza aplicația Pawsitive Adoption în niciun fel care
            încalcă legile sau reglementările aplicabile sau încalcă drepturile
            altora. Nu puteți utiliza aplicația pentru a transmite orice
            conținut ilegal, dăunător, amenințător, abuziv, hărțuitor,
            defăimător, vulgar, obscen, calomnios, invaziv la intimitatea altuia
            sau inacceptabil în alt mod. Nu puteți utiliza aplicația pentru a
            transmite viruși sau alt cod dăunător. Încetarea Raul Pușcaș își
            rezervă dreptul de a vă rezilia licența de utilizare a aplicației
            Pawsitive Adoption în orice moment, din orice motiv, fără
            notificare.
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: COLORS.black,
              fontSize: 15,
              fontWeight: "bold",
              maxWidth: "98%",
            }}
          >
            Declinarea garanțiilor
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: COLORS.black,
              fontSize: 14,
            }}
          >
            Aplicația Pawsitive Adoption este furnizată „ca atare”, fără
            garanții de niciun fel, fie exprese, fie implicite, inclusiv, dar
            fără a se limita la, garanțiile implicite de vandabilitate și
            potrivire pentru un anumit scop.
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: COLORS.black,
              fontSize: 15,
              fontWeight: "bold",
              maxWidth: "98%",
            }}
          >
            Limitare a răspunderii
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: COLORS.black,
              fontSize: 14,
            }}
          >
            Raul Pușcaș nu va fi răspunzător pentru nicio daună indirectă,
            incidentă, special sau consecventă care decurge din, sau în legătură
            cu utilizarea de către dvs. a aplicației Pawsitive Adoption, chiar
            dacă Raul Pușcaș a fost informat despre posibilitatea unor astfel de
            daune.
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: COLORS.black,
              fontSize: 15,
              fontWeight: "bold",
              maxWidth: "98%",
            }}
          >
            Despăgubiri
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: COLORS.black,
              fontSize: 14,
            }}
          >
            Sunteți de acord să despăgubiți, să apărați și să lăsați inofensivi
            Raul Pușcaș, directorii, angajații, agenții și afiliații săi de
            orice și toate revendicările, daunele, răspunderile, costurile și
            cheltuielile (inclusiv onorariile rezonabile ale avocaților) care
            decurg din sau în legătură cu utilizarea de către dumneavoastră a
            aplicației Pawsitive Adoption sau cu orice încălcare a acestui acord
            de licență.
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: COLORS.black,
              fontSize: 15,
              fontWeight: "bold",
              maxWidth: "98%",
            }}
          >
            Legea aplicabilă
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: COLORS.black,
              fontSize: 14,
            }}
          >
            Acest acord de licență va fi guvernat și interpretat în conformitate
            cu legile din România, fără a ține cont de conflictele de principii
            ale legilor.
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: COLORS.black,
              fontSize: 15,
              fontWeight: "bold",
              maxWidth: "98%",
            }}
          >
            Întregul acord
          </Text>
          <Text
            style={{
              marginTop: 10,
              color: COLORS.black,
              fontSize: 14,
            }}
          >
            Acest acord de licență constituie întregul acord dintre
            dumneavoastră și Raul Pușcaș cu privire la utilizarea de către
            dumneavoastră a aplicației mobile Pawsitive Adoption. Acest acord
            înlocuiește toate acordurile și înțelegerile anterioare, scrise sau
            orale, cu privire la obiectul acestui acord. Prin utilizarea
            aplicației Pawsitive Adoption, confirmați că ați citit, înțeles și
            sunteți de acord să fiți legat de acest acord de licență. Dacă nu
            sunteți de acord cu termenii acestui acord, nu utilizați aplicația
            Pawsitive Adoption.
          </Text>
        </SafeAreaView>
      </ScrollView>
    </Modal>
  );
};

export default ModalLegal;

const styles = StyleSheet.create({});
