import { FormEventHandler, useRef } from "react";
import "./App.css";
import { useSocket } from "./hooks/useSocket";

function App() {
  const name = useRef<HTMLInputElement>(null);
  const { listItems: list, send } = useSocket();

  const sendForm: FormEventHandler = (e) => {
    e.preventDefault();
    if (!name.current) return;
    send(name.current.value);
  };

  return (
    <>
      <div>
        <form onSubmit={sendForm}>
          <input type="text" id="name" ref={name} />
          <button type="submit">send</button>
        </form>
        <ul>
          {list.map((el) => (
            <li key={el.id}>{el.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
