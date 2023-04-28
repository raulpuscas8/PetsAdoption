import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  style,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { StripeProvider } from "@stripe/stripe-react-native";
import CustomInput from "../Input/CustomInput";
import COLORS from "../../const/colors";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { async } from "@firebase/util";

//400000250003155 - test payment cu complete/fail
//https://stripe.com/docs/testing
//trebuie sa fiu intr-un terminal in folderul /src/server si sa folosesc comanda: nodemon index.js
//al doilea

const API_URL = "http://localhost:3000";

const PaymentScreen = () => {
  const handleOnChange = (text, data) => {
    setEmail((prevState) => ({ ...prevState, [data]: text }));
  };
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    if (!cardDetails?.complete || !email) {
      Alert.alert("Va rog sa scrieti datele cardului si Email-ul");
      return;
    }
    const billingDetails = {
      email: email,
    };
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      if (error) {
        console.log("Nu s-a putut procesa plata");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          paymentMethodType: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Eroare la confirmarea platii ${error.message}`);
        } else if ([paymentIntent]) {
          alert("Plata a functionat");
          console.log("Plata a funcionat", paymentIntent);
        }
      }
    } catch (e) {}
  };
  return (
    <StripeProvider publishableKey="pk_test_51N1w2fEN9Rbh6iDj8lkt3x0pKNEYuSrTDOutuUAOGMnzMBoMQQQotS4rEf7IOjB0u9B1HquPTIAVMhJpar2CWtiL00na8yA1Pj">
      <SafeAreaView style={styles.container}>
        <TextInput
          value={email}
          placeholder="Email"
          placeholderTextColor={COLORS.dark}
          style={{
            fontWeight: "bold",
            fontSize: 14,
            padding: 20,
            backgroundColor: COLORS.nude,
            borderRadius: 10,
            marginVertical: 10,
            width: 350,
          }}
          onChangeText={(text) => handleOnChange(text, "email")}
        />
        <CardField
          postalCodeEnabled={true}
          placeholders={{ number: "4242 4242 4242 4242" }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={(cardDetails) => {
            setCardDetails(cardDetails);
          }}
        />
        <Button onPress={handlePayPress} title="Pay" disabled={loading} />
      </SafeAreaView>
    </StripeProvider>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#efefefef",
  },
  card: {
    backgroundColor: COLORS.nude,
  },
  cardContainer: {
    height: 55,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.nude,
    width: 350,
  },
});
