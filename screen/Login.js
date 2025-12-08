import React, { useState, useContext } from "react";
return (
<View style={styles.container}>
<Text style={styles.title}>Login ({tipo})</Text>


<TextInput
style={styles.input}
placeholder="E-mail"
value={email}
onChangeText={setEmail}
/>


<TextInput
style={styles.input}
placeholder="Senha"
secureTextEntry
value={senha}
onChangeText={setSenha}
/>


<TouchableOpacity style={styles.btn} onPress={handleLogin}>
<Text style={styles.btnTxt}>Entrar</Text>
</TouchableOpacity>


<TouchableOpacity onPress={() => navigation.navigate("Register", { tipo })}>
<Text style={{ marginTop: 20 }}>Criar conta</Text>
</TouchableOpacity>
</View>
);



const styles = StyleSheet.create({
container: { flex: 1, justifyContent: "center", padding: 20 },
title: { fontSize: 24, marginBottom: 30, textAlign: "center" },
input: {
borderWidth: 1,
borderColor: "#ccc",
padding: 12,
marginBottom: 15,
borderRadius: 8,
},
btn: {
backgroundColor: "#222",
padding: 16,
borderRadius: 8,
alignItems: "center",
},
btnTxt: { color: "#fff", fontSize: 18 },
});