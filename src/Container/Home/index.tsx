import { Home } from '../../stories/pages'

export const ContainerHome = () => {

  const redirect = () => {
    window.location.href = '/quiz';
  }

  return <Home redirect={redirect} />
}
