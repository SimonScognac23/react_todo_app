// Importiamo React e gli hook necessari
// - React: la libreria principale
// - useReducer: hook per gestire stati complessi con logica centralizzata
// - useState: hook per gestire stati semplici (come il valore dell'input)
import React, { useReducer, useState } from "react";

import "../App.css";

/* ---------------------------------------------------------
   REDUCER: Gestisce come cambia lo stato della lista "todos"
   
   Un reducer è una FUNZIONE PURA che riceve:
   - state: lo stato attuale (l'array dei todos)
   - action: un oggetto che descrive COSA fare (es: { type: "add", text: "..." })
   
   Il reducer restituisce il NUOVO stato senza modificare quello vecchio
------------------------------------------------------------ */
function todoReducer(state, action) {
  // Lo switch controlla il "tipo" di azione da eseguire
  switch (action.type) {
    case "add":
      // ✅ Aggiunge un nuovo todo all'elenco corrente
      // - ...state: copia tutti i todo esistenti (spread operator)
      // - Aggiungiamo un nuovo oggetto con: id univoco, testo, stato non completato
      return [
        ...state,
        {
          id: Date.now(), // Usa il timestamp come ID univoco
          text: action.text, // Il testo arriva dall'action
          completed: false, // Inizialmente non è completato
        },
      ];

    case "REMOVE":
      // 🗑️ Rimuove un todo dall'elenco in base all'ID fornito
      // - filter: crea un nuovo array escludendo il todo con l'ID specificato
      // - Mantiene solo i todo il cui ID è DIVERSO da quello da rimuovere
      return state.filter((todo) => todo.id !== action.id);

    case "TOGGLE":
      // 🔄 Inverte lo stato "completed" del todo con l'ID corrispondente
      // - map: scorre tutti i todo e restituisce un nuovo array
      // - Se l'ID corrisponde: crea una COPIA del todo invertendo "completed"
      // - Altrimenti: restituisce il todo invariato
      return state.map((todo) =>
        todo.id === action.id
          ? { ...todo, completed: !todo.completed } // Inverte true↔false
          : todo
      );

    default:
      // Se l'action.type non corrisponde a nessun caso, restituisce lo stato invariato
      return state;
  }
}

/* ---------------------------------------------------------
   COMPONENTE PRINCIPALE: Todo
   - Mostra la lista dei todo
   - Gestisce l'input e le azioni dell'utente
------------------------------------------------------------ */
function Todo() {
  // useReducer: connette il componente al reducer
  // - todos: lo stato corrente (l'array dei todo)
  // - dispatch: funzione per inviare azioni al reducer
  // - todoReducer: la funzione che abbiamo definito sopra
  // - [...]: lo stato iniziale (un array con un todo predefinito)
  const [todos, dispatch] = useReducer(todoReducer, [
    { id: 1, text: "Learn React", completed: false },
  ]);

  // useState: gestisce il valore del campo di input
  // - inputValue: il valore corrente dell'input
  // - setInputValue: funzione per aggiornarlo
  const [inputValue, setInputValue] = useState("");

  /* ---------------------------------------------------------
     FUNZIONE: handleAddTodo
     Viene chiamata quando l'utente clicca il bottone "Add"
  ------------------------------------------------------------ */
  const handleAddTodo = () => {
    // Se l'input è vuoto (o contiene solo spazi), non fa nulla
    if (inputValue.trim() === "") return;
    
    // Invia un'azione "add" al reducer con il testo dell'input
    dispatch({ type: "add", text: inputValue });
    
    // Svuota l'input dopo aver aggiunto il todo
    setInputValue("");
  };

  /* ---------------------------------------------------------
     RENDER DEL COMPONENTE
     Tutto ciò che viene restituito qui viene visualizzato nel browser
  ------------------------------------------------------------ */
  return (
    <div
      className="container mt-5 p-4 shadow rounded"
      style={{
        maxWidth: "500px",
        backgroundColor: "#f8f9fa",
        border: "1px solid #dee2e6",
      }}
    >
      {/* Titolo dell'app */}
      <h2 className="text-center mb-4 text-primary">📝 Todo App</h2>

      {/* Campo input + bottone per aggiungere todo */}
      <div className="input-group mb-3">
        {/* Input controllato: il valore è legato allo stato "inputValue" */}
        <input
          type="text"
          className="form-control"
          placeholder="Add a todo..."
          value={inputValue} // Il valore corrente
          onChange={(e) => setInputValue(e.target.value)} // Aggiorna lo stato quando l'utente scrive
        />
        {/* Bottone che chiama handleAddTodo quando cliccato */}
        <button className="btn btn-primary" onClick={handleAddTodo}>
          Add
        </button>
      </div>

      {/* Lista dei todo */}
      <ul className="list-group">
        {/* Controllo: se non ci sono todo, mostra un messaggio */}
        {todos.length === 0 ? (
          <li className="list-group-item text-center text-muted">
            Nessun todo ancora ✨
          </li>
        ) : (
          // Altrimenti: itera su ogni todo e crea un elemento <li> per ciascuno
          todos.map((todo) => (
            <li
              key={todo.id} // Key univoca richiesta da React per le liste
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{
                // Se completato: testo barrato e sfondo grigio
                textDecoration: todo.completed ? "line-through" : "none",
                backgroundColor: todo.completed ? "#e2e3e5" : "white",
              }}
            >
              {/* Testo del todo */}
              <span>{todo.text}</span>

              <div>
                {/* Bottone toggle: cambia lo stato completato/non completato */}
                <button
                  className={`btn btn-sm ${
                    todo.completed ? "btn-warning" : "btn-success"
                  } me-2`}
                  // Quando cliccato, invia un'azione "TOGGLE" con l'ID del todo
                  onClick={() =>
                    dispatch({ type: "TOGGLE", id: todo.id })
                  }
                >
                  {/* Il testo cambia in base allo stato */}
                  {todo.completed ? "Undo" : "Complete"}
                </button>

                {/* Bottone remove: rimuove il todo */}
                <button
                  className="btn btn-sm btn-danger"
                  // Quando cliccato, invia un'azione "REMOVE" con l'ID del todo
                  onClick={() =>
                    dispatch({ type: "REMOVE", id: todo.id })
                  }
                >
                  Remove
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      {/* Footer */}
      <p className="text-center mt-3 text-secondary" style={{ fontSize: "0.9rem" }}>
        Made with ❤️ using React & Bootstrap
      </p>
    </div>
  );
}

// 📦 Esportiamo il componente per usarlo in App.jsx o altrove
// Questo permette ad altri file di importare e utilizzare questo componente
export default Todo;
