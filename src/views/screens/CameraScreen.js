import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Camera } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import COLORS from "../../const/colors";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";

const CameraScreen = () => {
  const navigation = useNavigation();
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permussuins...</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted</Text>;
  }

  let takePic = async () => {
    let options = {
      quality: 0.2,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };
    const CustomButton = ({ title, onPress }) => (
      <TouchableOpacity style={styles.secondbuttonContainer} onPress={onPress}>
        <Text style={styles.secondbuttonText}>{title}</Text>
      </TouchableOpacity>
    );

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.preview}
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <CustomButton title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? (
          <CustomButton title="Save" onPress={savePhoto} />
        ) : undefined}
        <CustomButton title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <Ionicons
          name="camera"
          size={44}
          color="black"
          onPress={takePic}
          style={styles.cameraIcon}
        />
      </View>
      <StatusBar style="auto" />
    </Camera>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    backgroundColor: COLORS.primary,
    alignSelf: "stretch",
    borderRadius: 10,
    marginHorizontal: 150,
    marginVertical: 10,
    marginBottom: 80,
    borderRadius: 10,
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  cameraIcon: {
    alignSelf: "center",
  },
  secondbuttonContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    width: "100%",
    height: "4%",
    alignSelf: "center",
    marginVertical: 1,
  },
  secondbuttonText: {
    alignSelf: "center",
    fontSize: 20,
    color: COLORS.primary,
  },
});
