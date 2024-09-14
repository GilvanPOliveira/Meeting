import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Fornecedor({ onAdicionar, onVoltar, fornecedor }) {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contato, setContato] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    if (fornecedor) {
      setNome(fornecedor.nome);
      setEndereco(fornecedor.endereco);
      setContato(fornecedor.contato);
      setCategoria(fornecedor.categoria);
      setImagem(fornecedor.imagem);
    }
  }, [fornecedor]);

  const escolherImagem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImagem(result.assets[0].uri);
    }
  };

  const adicionarFornecedor = () => {
    if (nome && endereco && contato && categoria && imagem) {
      const novoFornecedor = {
        id: fornecedor ? fornecedor.id : Math.random().toString(),
        nome,
        endereco,
        contato,
        categoria,
        imagem,
      };
      onAdicionar(novoFornecedor);
      setNome("");
      setEndereco("");
      setContato("");
      setCategoria("");
      setImagem(null);
    } else {
      Alert.alert("Preencha todos os campos e selecione uma imagem.");
    }
  };

  const handleContatoChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, "");
    setContato(numericText);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>
          {fornecedor ? "Editar Fornecedor" : "Cadastrar Fornecedor"}
        </Text>

        <Text style={styles.texto}>Nome</Text>
        <TextInput
          placeholder="Nome do Fornecedor"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />
        <Text style={styles.texto}>Endereço</Text>
        <TextInput
          placeholder="Av. Exemplo, 123"
          value={endereco}
          onChangeText={setEndereco}
          style={styles.input}
        />
        <Text style={styles.texto}>Contato</Text>
        <TextInput
          placeholder="(XX) X XXXX - XXXX"
          value={contato}
          onChangeText={handleContatoChange}
          keyboardType="numeric"
          style={styles.input}
        />
        <Text style={styles.texto}>Categoria</Text>
        <TextInput
          placeholder="Ex: Carro, Moto, Bicicleta...."
          value={categoria}
          onChangeText={setCategoria}
          style={styles.input}
        />

        <TouchableOpacity onPress={escolherImagem} style={styles.button}>
          <Text style={styles.buttonText}>Escolher Imagem</Text>
        </TouchableOpacity>

        {imagem && <Image source={{ uri: imagem }} style={styles.image} />}

        <TouchableOpacity
          onPress={adicionarFornecedor}
          style={styles.buttonAdd}
        >
          <Text style={styles.buttonText}>
            {fornecedor ? "Atualizar Fornecedor" : "Adicionar Fornecedor"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onVoltar} style={styles.button}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#E9EFEC",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#16423C",
  },
  texto: {
    fontSize: 14,
    color: "#6A9C89",
  },
  input: {
    borderWidth: 1,
    borderColor: "#16423C",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#16423C",
    padding: 10,
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonAdd: {
    backgroundColor: "#6A9C89",
    padding: 10,
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginVertical: 10,
    alignSelf: "center",
  },
});
