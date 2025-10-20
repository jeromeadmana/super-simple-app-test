import { LinearGradient } from "expo-linear-gradient";
import { VideoView, useVideoPlayer } from "expo-video";
import React, { useState } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [showMessage, setShowMessage] = useState(false);
  const fadeAnim = new Animated.Value(0);

  const player = useVideoPlayer(require("../assets/demo.mp4"), (player) => {
    player.play();
  });

  const handlePress = () => {
    setShowMessage(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  return (
    <LinearGradient colors={["#FDFBFB", "#EBEDEE"]} style={styles.gradient}>
      <View style={styles.container}>
        {!showMessage ? (
          <>
            <Text style={styles.title}>Kindness Moments</Text>
            <View style={styles.videoContainer}>
              <VideoView
                player={player}
                style={styles.video}
                contentFit="contain"
                allowsFullscreen
                allowsPictureInPicture
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
              <Text style={styles.buttonText}>Well Done!</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.thanks}>🌟 Great Job! Keep being kind! 🌟</Text>
          </Animated.View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#555",
    marginBottom: 20,
  },
  videoContainer: {
    borderRadius: 25,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: "#FFF",
    marginBottom: 30,
  },
  video: {
    width: 320,
    height: 220,
  },
  button: {
    backgroundColor: "#FFD54F",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 40,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#333",
    fontWeight: "700",
  },
  thanks: {
    fontSize: 24,
    color: "#4F46E5",
    fontWeight: "700",
    textAlign: "center",
    paddingHorizontal: 30,
  },
});
