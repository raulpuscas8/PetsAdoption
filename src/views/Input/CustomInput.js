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
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, sethidePassword] = useState(password);

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
          style={{
            fontSize: 20,
            color: COLORS.dark,
            marginRight: 12,
          }}
        />
        <TextInput
          {...props}
          style={{
            color: COLORS.black,
            flex: 1,
          }}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          secureTextEntry={hidePassword}
        />
        {password && (
          <Icon
            style={{
              fontSize: 20,
              color: COLORS.black,
            }}
            onPress={() => sethidePassword(!hidePassword)}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
          />
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  label: {
    marginVertical: 4,
    fontSize: 16,
    color: COLORS.black,
  },
  inputContainer: {
    height: 53,
    backgroundColor: COLORS.nude,
    color: COLORS.black,
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
