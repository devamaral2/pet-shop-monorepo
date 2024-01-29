import { Container } from "./components/Container";
import { Header } from "./components/header";
import { Table } from "./components/table/Table";
import { GeneralProvider } from "./context/generalProvider";
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
