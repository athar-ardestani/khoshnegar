// DbService.js

import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });

// ساخت جدول برای ذخیره accessToken
db.transaction((tx) => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS AccessToken (id INTEGER PRIMARY KEY AUTOINCREMENT, token TEXT)',
    []
  );
});

const saveAccessToken = (token) => {
  db.transaction(
    (tx) => {
      tx.executeSql('INSERT INTO AccessToken (token) VALUES (?)', [token]);
    },
    (error) => {
      console.error('Error in saveAccessToken:', error);
    },
    () => {
      console.log('AccessToken saved successfully!');
    }
  );
};

const retrieveAccessToken = (callback) => {
  db.transaction(
    (tx) => {
      tx.executeSql('SELECT * FROM AccessToken', [], (tx, results) => {
        const len = results.rows.length;
        if (len > 0) {
          const accessToken = results.rows.item(0).token;
          callback(accessToken);
        } else {
          callback(null);
        }
      });
    },
    (error) => {
      console.error('Error in retrieveAccessToken:', error);
      callback(null);
    }
  );
};

export { saveAccessToken, retrieveAccessToken };