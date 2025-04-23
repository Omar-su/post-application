package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"os"
	"sync"
)

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

var (
	userDataFile = "userdata.json"
	mutex        sync.Mutex
)

func loadUsers() ([]User, error) {
	data, err := ioutil.ReadFile(userDataFile)
	if err != nil {
		if os.IsNotExist(err) {
			_ = ioutil.WriteFile(userDataFile, []byte("[]"), 0644)
			return []User{}, nil
		}
		return nil, err
	}
	if len(data) == 0 {
		_ = ioutil.WriteFile(userDataFile, []byte("[]"), 0644)
		return []User{}, nil
	}
	var users []User
	err = json.Unmarshal(data, &users)
	return users, err
}

func saveUsers(users []User) error {
	data, err := json.MarshalIndent(users, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(userDataFile, data, 0644)
}

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}
