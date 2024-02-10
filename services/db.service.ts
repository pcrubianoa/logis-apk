import { Platform } from "react-native";
import * as SQLite from "expo-sqlite";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("bares.db");
  return db;
}

export const db = openDatabase();

async function createTables() {
  await db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS configuracion (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        );`
    );
  });
}