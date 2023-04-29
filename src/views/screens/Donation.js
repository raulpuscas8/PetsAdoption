import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TextInput,
  Button,
  Alert,
} from "react-native";
import COLORS from "../../const/colors";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../Input/CustomInput";
import { firebase } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import { async } from "@firebase/util";

const Donation = () => {
  const stripe = useStripe();
  const [name, setName] = useState("");
  const [sum, setSum] = useState("");
  const navigation = useNavigation();
  const doneaza = async () => {
    try {
      // aici fac request
      const response = await fetch("http://localhost:3000/pay", {
        method: "POST",
        body: JSON.stringify({ sum }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        appearance: {
          font: {
            family: "AvenirNext-Regular",
            scale: 1.15,
          },
          shapes: {
            borderRadius: 12,
            borderWidth: 0.5,
          },
          primaryButton: {
            shapes: {
              borderRadius: 10,
            },
            colors: {
              text: "#FFFFFF",
            },
          },
          colors: {
            icon: COLORS.dark,
            primary: COLORS.primary,
            background: COLORS.white,
            componentBackground: COLORS.white,
            componentBorder: COLORS.nude,
            componentDivider: COLORS.nude,
            primaryText: COLORS.black,
            secondaryText: COLORS.dark,
            componentText: COLORS.black,
            placeholderText: COLORS.dark,
          },
        },
        applePay: {
          merchantCountryCode: "US",
        },
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
      Alert.alert("Plata finalizata!");
    } catch (err) {
      console.error(err);
      Alert.alert("Ceva nu a functionat, incercati mai tarziu");
    }
  };

  return (
    <StripeProvider
      publishableKey="pk_test_51N1w2fEN9Rbh6iDj8lkt3x0pKNEYuSrTDOutuUAOGMnzMBoMQQQotS4rEf7IOjB0u9B1HquPTIAVMhJpar2CWtiL00na8yA1Pj"
      merchantIdentifier="merchant.com.stripe.react.native"
    >
      <ScrollView>
        <View
          style={{
            padding: 20,
            backgroundColor: COLORS.white,
          }}
        >
          <View
            style={{
              paddingTop: 50,
            }}
          >
            <Text
              style={{
                paddingTop: 40,
                fontSize: 25,
                color: COLORS.black,
                fontWeight: "bold",
                marginVertical: 10,
                textAlign: "center",
              }}
            >
              Vă mulțumim că ați luat în considerare o donație către
              PetsAdoption.
            </Text>
            <Text
              style={{
                paddingTop: 50,
                fontWeight: "bold",
                fontSize: 20,
                textAlign: "center",
                color: COLORS.primary,
              }}
            >
              Generozitatea ta ne va ajuta să ne continuăm misiunea de a gasi un
              stăpân pentru fiecare suflet.
            </Text>
            <Text
              style={{
                padding: 30,
                fontWeight: "bold",
                fontSize: 18,
                textAlign: "center",
                color: COLORS.dark,
              }}
            >
              Vă rugăm să introduceți suma pe care trebuie să o donați în caseta
              de mai jos. Toate donațiile sunt deductibile fiscale în cea mai
              mare măsură permisă de lege. Apreciem foarte mult sprijinul
              dumneavoastră și vă mulțumim pentru contribuție.
            </Text>
          </View>
          <View>
            <View>
              <CustomInput
                value={sum}
                onChangeText={(text) => setSum(text)}
                placeholder="Sumă"
                placeholderTextColor={COLORS.dark}
                style={{
                  width: 300,
                  fontSize: 14,
                  padding: 10,
                  borderWidth: 1,
                  alignSelf: "center",
                  borderRadius: 10,
                  backgroundColor: COLORS.nude,
                }}
              />
            </View>
            <TouchableOpacity
              onPress={doneaza}
              style={{
                padding: 20,
                backgroundColor: COLORS.primary,
                marginVertical: 50,
                borderRadius: 10,
                shadowColor: COLORS.primary,
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                shadowOpacity: 0.3,
                shadowRadius: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: COLORS.white,
                  textAlign: "center",
                  fontSize: 20,
                }}
              >
                Donează
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 44,
              }}
            >
              <Text
                onPress={navigation.goBack}
                style={{
                  fontWeight: "bold",
                  color: COLORS.dark,
                  textAlign: "center",
                  fontSize: 14,
                }}
              >
                Renunță
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </StripeProvider>
  );
};

export default Donation;

const styles = StyleSheet.create({});
