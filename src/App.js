import Navbar from "./components/molecules/Navbar";
import Feed from "./components/templates/Feed";
import "./reset.css";
import "./App.css";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Feed />
		</div>
	);
}

export default App;
