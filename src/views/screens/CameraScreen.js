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
      quality: 1,
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
  //
  //    const [hasCameraPermission, setHasCameraPermission] = useState(null);
  //    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  //    let cameraRef = useRef();

  //    useEffect(() => {
  //      (async () => {
  //        MediaLibrary.requestMediaLibraryPermissionsAsync();
  //        const cameraPermission = await Camera.requestCameraPermissionsAsync();
  //        setHasCameraPermission(cameraPermission.status === "granted");
  //      })();
  //    }, []);

  // de aici e safe
  //   const [hasPermission, setHasPermission] = useState(null);
  //   const [camera, setCamera] = useState(null);

  //   const takePicture = async () => {
  //     if (camera) {
  //       const data = await camera.takePictureAsync(null);
  //     }
  //   };

  //   useEffect(() => {
  //     (async () => {
  //       const { status } = await Camera.requestCameraPermissionsAsync();
  //       setHasPermission(status === "granted");
  //     })();
  //   }, []);

  //   if (hasPermission === null) {
  //     return <View />;
  //   }
  //   if (hasPermission === false) {
  //     return <Text>No access to camera</Text>;
  //   }

  //   let takePic = async () => {
  //     let options = {
  //       quality: 1,
  //       base64: true,
  //       exif: false,
  //     };

  //     let newPhoto = await cameraRef.current.takePictureAsync(options);
  //   };

  //   return (
  //     <View style={styles.container}>
  //       <Camera style={styles.camera} ref={(ref) => setCamera(ref)}>
  //         <View style={{ flexDirection: "row" }}>
  //           <TouchableOpacity style={styles.button} onPress={takePicture}>
  //             <View style={styles.iconText}>
  //               <MaterialIcons name="camera-alt" size={22} color="#6b0000" />
  //               <Text style={styles.buttonText}> Fă poză </Text>
  //             </View>
  //           </TouchableOpacity>
  //         </View>
  //       </Camera>
  //     </View>
  //   );
};

export default CameraScreen;

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //   },
  //   camera: {
  //     flex: 1,
  //     alignItems: "center",
  //   },
  //   iconText: {
  //     flexDirection: "row",
  //     justifyContent: "flex-start",
  //     alignItems: "center",
  //   },
  //   button: {
  //     backgroundColor: "white",
  //     width: "35%",
  //     padding: 10,
  //     borderRadius: 20,
  //     alignItems: "center",
  //     borderWidth: 1,
  //     marginTop: 750,
  //     marginRight: 30,
  //     marginLeft: 30,
  //   },
  //   buttonText: {
  //     color: "#6b0000",
  //     fontWeight: "500",
  //     textTransform: "uppercase",
  //     marginLeft: 5,
  //   },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    backgroundColor: COLORS.primary,
    alignSelf: "stretch",
    borderRadius: 10,
    marginHorizontal: 150, // Add some horizontal margin to the button container
    marginVertical: 10, // Add some vertical margin to the button container
    marginBottom: 80,
    borderRadius: 10, // or any other value y
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  cameraIcon: {
    alignSelf: "center", // center the camera icon within the button
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
