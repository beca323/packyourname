import './App.css';
import { Routes, Route } from 'react-router-dom'
import About from './Pages/About/About';
import MainApp from './Pages/MainApp/MainApp';
import NotFound from './Pages/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <Content />
    </div>
  );
}

function Content() {
  return (
    <Routes>
      <Route path="/" element={<About />} />
      <Route path="/main/*" element={<MainApp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;