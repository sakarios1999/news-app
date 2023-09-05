import AsyncStorage from "@react-native-community/async-storage";
import Reactotron from "reactotron-react-native";
import { reactotronRedux } from "reactotron-redux";

//add this to config so you can you use reactotron on real device
//make sure to add your own ip and reactotron port default 9090
//{ host: '192.168.0.101', port: 9090 }
Reactotron.setAsyncStorageHandler!(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({ host: "192.168.0.100", port: 9090 }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux());

export { Reactotron };
