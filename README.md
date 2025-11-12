In Italiano
Ho creato una Todo App in React per esercitarmi con useReducer, un hook che mi permette di gestire stati complessi in modo organizzato. L'app permette di aggiungere nuovi compiti, segnarli come completati (con testo barrato e sfondo grigio) e rimuoverli dalla lista. Ho implementato un reducer con tre azioni: add per creare nuovi todo, TOGGLE per invertire lo stato di completamento, e REMOVE per eliminare i compiti. Per l'interfaccia ho usato Bootstrap, rendendo l'app responsive e pulita visivamente. Ogni todo ha un ID univoco generato con Date.now(), e ho gestito l'input dell'utente con useState. Ho chiesto commenti dettagliati nel codice perché sto imparando React e volevo capire ogni passaggio, specialmente come funzionano map, filter e lo spread operator all'interno del reducer.

In English
I built a Todo App in React to practice using useReducer, a hook that helps me manage complex state in an organized way. The app allows adding new tasks, marking them as completed (with strikethrough text and gray background), and removing them from the list. I implemented a reducer with three actions: add to create new todos, TOGGLE to flip the completion status, and REMOVE to delete tasks. For the interface, I used Bootstrap to make the app responsive and visually clean. Each todo has a unique ID generated with Date.now(), and I managed user input with useState. I requested detailed comments in the code because I'm learning React and wanted to understand every step, especially how map, filter, and the spread operator work inside the reducer.







# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
