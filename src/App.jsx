import Header from "./components/Header";
import Loading from "./components/Loading";
import Main from "./components/Main";

function App() {
    return (
        <div className="App">
            <Loading />
            <Header />
            <Main />
        </div>
    );
}

export default App;
