import React from "react";
<View style={styles.container}>
    <Text style={styles.title}>Escolha o tipo de conta</Text>


    <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Login", { tipo: "pessoa" })}
    >
        <Text style={styles.txt}>Pessoa</Text>
    </TouchableOpacity>


    <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate("Login", { tipo: "empresa" })}
    >
        <Text style={styles.txt}>Empresa</Text>
    </TouchableOpacity>
</View>




const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
    title: { fontSize: 22, marginBottom: 40 },
    btn: {
        backgroundColor: "#333",
        padding: 16,
        width: "70%",
        marginBottom: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    txt: { color: "#fff", fontSize: 18 },
});