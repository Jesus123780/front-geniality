import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import {
  ContainerHome,
  TeamRegister,
  SignedContract
} from '../Container'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<ContainerHome />} />
          <Route path="/device" element={<TeamRegister />} />
          <Route path="/firmar-contrato" element={<SignedContract />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
