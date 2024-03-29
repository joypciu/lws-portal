import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './app/store';
import NewApp from './NewApp';
import './assets/style/output.css';
import './assets/style/modal.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <Provider store={store}>
      <NewApp />
    </Provider>
  </Router>
);
