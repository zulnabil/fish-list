import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "pages/dashboard/dashboard.page"

import "./common/styles/index.scss"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/analytic" element={<Dashboard />}></Route>
        <Route path="/setting" element={<Dashboard />}></Route>
        <Route path="/" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  )
}

export default App
