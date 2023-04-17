import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import COLORS from "../../const/colors";

export const CustomInput = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  //...props adica luam si restul de proprietati, pe langa cele pe care le-am scris deja(label, iconName etc), care mai apar cand folosim Input
  const [isFocused, setIsFocued] = useState(false);
  const [hidePassword, setHidePassword] = useState(password); // by default, primi o parola ca si props deci useState(password)=useState(true)

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? "red"
              : isFocused
              ? "black"
              : COLORS.lightorange,
          },
        ]}
      >
        <Icon
          name={iconName}
          style={{ fontSize: 22, color: COLORS.gray, marginRight: 10 }}
        />
        {/* ...props aici inseamna ca ia restul de props pe care ne-a fost lene sa le scriem mai sus */}
        <TextInput
          {...props}
          style={{ color: COLORS.gray, flex: 1 }}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocued(true);
          }}
          onBlur={() => {
            setIsFocued(false);
          }}
          secureTextEntry={hidePassword} //asta imi da tastatura de la iphone
        />
        {password && (
          <Icon
            style={{ fontSize: 22, color: COLORS.gray }}
            onPress={
              () => setHidePassword(!hidePassword) // pentru Input-ul parolei, intiial hidePassword e pe true, iar daca apasam pe iconita cu ochiul, hidePassword trb sa fie false ca sa putem vedea parola
            }
            name={hidePassword ? "eye-outline" : "eye-off-outline"} //daca hidePassword e pe true, ne afiseaza o iconita, daca e pe false cealalta cu ochiul taiat
          />
        )}
      </View>
      {/* if props-ul cu "error" este dat unde folosim Input, sa ne afiseze un text sub casuta cu eroarea */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  label: {
    marginVertical: 4,
    fontSize: 14,
    color: COLORS.gray,
  },
  inputContainer: {
    height: 53,
    backgroundColor: COLORS.nude,
    color: COLORS.gray,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderColor: COLORS.black,
    borderRadius: 10,
    alignItems: "center",
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginTop: 7,
  },
});
