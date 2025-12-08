import React, { useState, useContext } from "react";
return (
<View style={styles.container}>
<Text style={styles.title}>Criar conta ({tipo})</Text>


<TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
<TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} />
<TextInput
style={styles.input}
placeholder="Senha"
value={senha}
secureTextEntry
onChangeText={setSenha}
/>


{tipo === "empresa" && (
<>
<TextInput style={styles.input} placeholder="CNPJ" value={cnpj} onChangeText={setCnpj} />
<TextInput
style={styles.input}
placeholder="Endereço"
value={endereco}
onChangeText={setEndereco}
/>
</>
)}


<TouchableOpacity style={styles.btn} onPress={handleRegister}>
<Text style={styles.btnTxt}>Criar conta</Text>
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