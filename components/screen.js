import { View } from "react-native";
import { Styles } from "../Styles";
import { StatusBar } from "expo-status-bar";

export const Screen = (props) => {
  return (
    <View style={Styles.screen}>
      <StatusBar style="auto" />
      {props.children}
    </View>
  );
};
