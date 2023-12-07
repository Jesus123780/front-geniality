import { Provider } from 'react-redux'
import store from './store'
import '../src/stories/assets/public/global.css'
import '../src/stories/assets/public/styles.css'
import { AppRouter } from './Routes'

const App = () => {

  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default App
