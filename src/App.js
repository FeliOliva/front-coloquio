import './App.css';
import TablesCuentasCorrientes from './components/TablesCuentasCorrientes';
import Chat from './components/Chat';
import { DataProvider } from './context/DataContext';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './components/LoginButton';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) { return <h1>Loading...</h1> }
  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <DataProvider>
            <TablesCuentasCorrientes />
            <Chat />
          </DataProvider>
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
}

export default App;
