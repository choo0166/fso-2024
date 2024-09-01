import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
/* Provider component makes redux store available to any 
nested component to be accessed by useSelector hook */
const renderApp = () => {
  root.render(
  <Provider store={store}>
    <App />
  </Provider>
  )
}

renderApp();


