package main

import (
	"encoding/json"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)

func loginHandler(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	if r.Method != "POST" {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

	var credentials User
	err := json.NewDecoder(r.Body).Decode(&credentials)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	mutex.Lock()
	defer mutex.Unlock()

	users, err := loadUsers()
	if err != nil {
		http.Error(w, "Error reading users", http.StatusInternalServerError)
		return
	}

	for _, u := range users {
		if u.Username == credentials.Username {
			err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(credentials.Password))
			if err == nil {
				json.NewEncoder(w).Encode(map[string]string{
					"message": "Login successful",
					"user":    u.Username,
				})
				return
			}
		}
	}

	http.Error(w, "Invalid username or password", http.StatusUnauthorized)
}
