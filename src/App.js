import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/stores';
import Login from './screens/Auth/Login';
import SaludoScreen from './screens/Home';
import DetalleScreen from './screens/DetailsScreen';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/saludo" element={<SaludoScreen />} />
          <Route path="/detalle/:key" element={<DetalleScreen />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
