import { Suspense, useState,lazy } from 'react'
import Layout from './component/layout/Layout'
import './App.css'

import { BrowserRouter as Router ,Route,Routes} from 'react-router-dom'
import Fallback from './component/Fallback/Fallback'
const UserRoute = lazy(() => new Promise(resolve => {
  setTimeout(() => resolve(import('./routes/UserRoute')), 1000);
}));
const AdminRoute = lazy(() => import('./routes/AdminRoute'));


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Layout>
      <Suspense fallback={<Fallback/>}>
      <Routes>
        {/* <Route path='/admin*' element={<AdminRoute></AdminRoute>}/> */}
        <Route  path='/*' element={<UserRoute></UserRoute>}/>
      </Routes>
      </Suspense>
    </Layout>

    </Router>

  )
}

export default App
