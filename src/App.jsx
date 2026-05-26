import { useRoutes } from 'react-router-dom'
import './App.css'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import EditCreator from './pages/EditCreator'
import AddCreator from './pages/AddCreator'

const routes = [
  {path: '/', element: <ShowCreators/>},
  {path: '/creator/:id', element: <ViewCreator/>},
  {path: '/creator/:id/edit', element: <EditCreator/>},
  {path: '/add', element: <AddCreator/>},
]

export default function App() {
  return (
    useRoutes(routes)
  )
}

