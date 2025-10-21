// Importa o Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAiwy5ScED2U5J2COhlN-AjBgY6mYmhfiM",
  authDomain: "rankinggame-d6292.firebaseapp.com",
  projectId: "rankinggame-d6292",
  storageBucket: "rankinggame-d6292.firebasestorage.app",
  messagingSenderId: "617402964167",
  appId: "1:617402964167:web:fd73fadc53486c581846e2"
};

// Inicializa o app e o banco de dados
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Função para adicionar jogador
export function addPlayer(name, score) {
  const playersRef = ref(db, "players");
  push(playersRef, {
    name: name,
    score: score,
    date: new Date().toISOString()
  });
}

// Função para exibir o ranking em tempo real
export function listenRanking(callback) {
  const playersRef = ref(db, "players");
  onValue(playersRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const players = Object.values(data)
        .sort((a, b) => b.score - a.score); // ordem decrescente
      callback(players);
    } else {
      callback([]);
    }
  });
}
