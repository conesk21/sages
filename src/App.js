import { smallTown } from "./classes.js";
import Card from "./Card.js";

function App() {

  return (
    <div>
      <h1>{smallTown.display().map((item, i) => <Card key ={i} item={item} />)}</h1>
    </div>
  );
}

export default App;
