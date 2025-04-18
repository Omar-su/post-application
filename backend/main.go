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


func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}


// Load users from the file
func loadUsers() ([]User, error) {
	data, err := ioutil.ReadFile(userDataFile)
	if err != nil {
		if os.IsNotExist(err) {
			return []User{}, nil // File doesn't exist yet
		}
		return nil, err
	}

	var users []User
	err = json.Unmarshal(data, &users)
	return users, err
}

// Save users to the file
func saveUsers(users []User) error {
	data, err := json.MarshalIndent(users, "", "  ")
	if err != nil {
		return err
	}
	return ioutil.WriteFile(userDataFile, data, 0644)
}

// Handler for registration
func registerHandler(w http.ResponseWriter, r *http.Request) {

	enableCORS(w)
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != "POST" {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

	var newUser User
	err := json.NewDecoder(r.Body).Decode(&newUser)
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

	// Check if username already exists
	for _, u := range users {
		if u.Username == newUser.Username {
			http.Error(w, "User already exists", http.StatusBadRequest)
			return
		}
	}

	users = append(users, newUser)
	if err := saveUsers(users); err != nil {
		http.Error(w, "Error saving user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Registered successfully"})
}

// Handler for login
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
		if u.Username == credentials.Username && u.Password == credentials.Password {
			json.NewEncoder(w).Encode(map[string]string{
				"message": "Login successful",
				"user":    u.Username,
			})
			return
		}
	}

	http.Error(w, "Invalid username or password", http.StatusUnauthorized)
}

func main() {
	http.HandleFunc("/register", registerHandler)
	http.HandleFunc("/login", loginHandler)

	println("Server running at http://localhost:5000")
	http.ListenAndServe(":5000", nil)
}
