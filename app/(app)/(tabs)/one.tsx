import { Pressable, StyleSheet } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { useSession } from "@/context/authentication/authentication.context";
import { getDataAPI } from "@/services/fetch.service";
import { useEffect, useState } from "react";

export default function TabOneScreen() {
  const values = useSession();
  const [configuracionPos, setConfiguracionPos] = useState<any>(null);
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    getDataAPI('configuracion_pos?selectAll', 'bares', { 'apiKey': values?.session })
      .then(response => {
        //console.log('response: ', response);
        const configPos = response.data[0].establecimiento;
        //console.log('configuracion_pos: ', configPos);
        setConfiguracionPos(configPos);
      });
  }, [values?.session]); // Agrega values?.session como dependencia para reejecutar useEffect si cambia

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página principal</Text>
      <Pressable onPress={values?.signOut} style={styles.button}>
        <Text style={styles.text}>Cerrar Sesión</Text>
      </Pressable>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>{configuracionPos}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
