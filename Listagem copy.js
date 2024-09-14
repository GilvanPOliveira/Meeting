import React, { useState } from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

export default function Listagem({
  fornecedores,
  onAdicionar,
  onExcluir,
  onEditar,
  onLogoff,
}) {
  const [criterio, setCriterio] = useState("categoria");

  const fornecedoresAgrupados = fornecedores.reduce((secoes, fornecedor) => {
    const chave =
      criterio === "categoria" ? fornecedor.categoria : fornecedor.endereco;
    if (!secoes[chave]) {
      secoes[chave] = [];
    }
    secoes[chave].push(fornecedor);
    return secoes;
  }, {});

  const secoesFormatadas = Object.keys(fornecedoresAgrupados)
    .sort()
    .map((chave) => ({
      title: chave,
      data: fornecedoresAgrupados[chave].sort((a, b) =>
        a.nome.localeCompare(b.nome)
      ),
    }));

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image source={{ uri: item.imagem }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.nome}</Text>
          <Text style={styles.itens}>{item.endereco}</Text>
          <Text style={styles.itens}>{item.contato}</Text>
          <Text style={styles.itens}>{item.categoria}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => onExcluir(item.id)}
          style={styles.excluirButton}
        >
          <Text style={styles.excluirText}>Excluir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onEditar(item)}
          style={styles.editarButton}
        >
          <Text style={styles.editarText}>Editar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Fornecedores Cadastrados</Text>

      {fornecedores.length > 0 && (
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              criterio === "categoria" && styles.activeFilterButton,
            ]}
            onPress={() => setCriterio("categoria")}
          >
            <Text style={styles.filterButtonText}>Por Categoria</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              criterio === "endereco" && styles.activeFilterButton,
            ]}
            onPress={() => setCriterio("endereco")}
          >
            <Text style={styles.filterButtonText}>Por Endereço</Text>
          </TouchableOpacity>
        </View>
      )}

      {secoesFormatadas.length > 0 ? (
        <SectionList
          sections={secoesFormatadas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        />
      ) : (
        <Text style={styles.texto}>Nenhum fornecedor cadastrado</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={onAdicionar}>
        <Text style={styles.buttonText}>Adicionar Fornecedor</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoffButton} onPress={onLogoff}>
        <Text style={styles.logoffText}>Logoff</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E9EFEC",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#16423C",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  filterButton: {
    backgroundColor: "#6A9C89",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  activeFilterButton: {
    backgroundColor: "#16423C",
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  texto: {
    fontSize: 18,
    textAlign: "center",
    color: "#6A9C89",
  },
  itens: {
    color: "#16423C",
    fontSize: 10,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: 280,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#C4DAD2",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16423C",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  excluirButton: {
    backgroundColor: "#FF6F6F",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 60,
  },
  excluirText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  editarButton: {
    backgroundColor: "#6A9C89",
    padding: 10,
    width: 60,
    borderRadius: 5,
  },
  editarText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
    backgroundColor: "#6A9C89",
    paddingVertical: 5,
    borderRadius: 5,
    color: "#16423C",
  },
  button: {
    backgroundColor: "#16423C",
    padding: 10,
    alignItems: "center",
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  logoffButton: {
    position: "absolute",
    top: 10,
    right: 8,
    backgroundColor: "#FF6F6F",
    padding: 10,
    borderRadius: 5,
  },
  logoffText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
