import { StyleSheet, Text, View, Modal } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../../const/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const ModalAbout = ({ isVisible, onClose, navigation }) => {
  return (
    <Modal animationType="slide" visible={isVisible} onRequestClose={onClose}>
      <ScrollView>
        <SafeAreaView
          style={{
            marginTop: 70,
          }}
        >
          <MaterialCommunityIcons
            name="arrow-left"
            size={25}
            color={COLORS.dark}
            onPress={onClose}
          />
        </SafeAreaView>
        <Text
          style={{
            marginTop: 10,
            color: COLORS.primary,
            fontWeight: "bold",
            fontSize: 17,
            marginLeft: 10,
          }}
        >
          Bun venit la Pawsitive Adoption, o aplicație mobilă dedicată pentru a
          vă ajuta să găsiți prietenul blănos perfect pentru adopție. Misiunea
          noastră este să vă punem în legătură cu animalele de companie
          adoptabile în zona dumneavoastră și să vă oferim instrumentele de care
          aveți nevoie pentru a lua cea mai bună decizie pentru stilul
          dumneavoastră de viață.
        </Text>
        <Text
          style={{
            marginTop: 10,
            color: COLORS.black,
            fontWeight: "bold",
            fontSize: 17,
            marginLeft: 10,
          }}
        >
          La Pawsitive Adoption, credem că fiecare animal de companie merită o
          casă iubitoare și ne angajăm să facem asta o realitate pentru cât mai
          multe animale. Colaboram cu adăposturi de animale locale și
          organizații de salvare pentru a ajuta la facilitarea adopțiilor și la
          reducerea numărului de animale de companie care au nevoie.
        </Text>
        <Text
          style={{
            marginTop: 10,
            color: COLORS.primary,
            fontWeight: "bold",
            fontSize: 17,
            marginLeft: 10,
          }}
        >
          Echipa noastră este formată din iubitori de animale care sunt dedicați
          să aibă un impact pozitiv în lume. Ne străduim în mod constant să
          îmbunătățim aplicația noastră și să îmbunătățim experiența
          utilizatorului atât pentru animalele de companie, cât și pentru
          potențialii lor adoptatori.
        </Text>
        <Text
          style={{
            marginTop: 10,
            color: COLORS.black,
            fontWeight: "bold",
            fontSize: 17,
            marginLeft: 10,
          }}
        >
          Povestea noastră a început când fondatorul nostru, Raul Pușcaș, căuta
          să adopte un animal de companie al său. El a găsit procesul confuz și
          copleșitor, cu atât de multe animale care au nevoie de case și atât de
          multe organizații diferite de adopție din care să aleagă. Atunci și-a
          dat seama că este nevoie de o aplicație mobilă ușor de utilizat pentru
          a ajuta la eficientizarea procesului și pentru a conecta potențialii
          adoptatori cu animalele de companie care au nevoie. Având în vedere
          asta, s-a născut Pawsitive Adoption. Echipa noastră este pasionată de
          bunăstarea animalelor și suntem dedicați să folosim experiența noastră
          pentru a face procesul de adopție cât mai ușor și fără stres posibil.
        </Text>
        <Text
          style={{
            marginTop: 10,
            color: COLORS.primary,
            fontWeight: "bold",
            fontSize: 17,
            marginLeft: 10,
          }}
        >
          Vă mulțumim pentru că ați ales Adopția Pawsitive și pentru că ne
          ajutați să facem o diferență în viața animalelor de companie aflate în
          nevoie.
        </Text>
      </ScrollView>
    </Modal>
  );
};

export default ModalAbout;

const styles = StyleSheet.create({});
