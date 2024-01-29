import { Container } from "./components/Container";
import { Header } from "./components/Header";
import { Table } from "./components/table/Table";
import { GeneralProvider } from "./context/globalProvider";
function App() {
  return (
    <Container>
      <GeneralProvider>
        <Header />
        <Table />
      </GeneralProvider>
    </Container>
  );
}

export default App;
