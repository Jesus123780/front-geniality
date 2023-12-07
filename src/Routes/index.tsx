import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { ContainerHome, Quiz } from '../Container'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path='/' element={<ContainerHome />} />
          <Route path='/quiz' element={<Quiz />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
