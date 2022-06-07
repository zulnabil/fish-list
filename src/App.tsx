import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { SWRConfig } from "swr"

import Dashboard from "pages/dashboard/dashboard.page"

import "./common/styles/index.scss"
import fetcher from "common/libs/fetch.lib"

function App() {
  return (
    <Router>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher,
        }}
      >
        <Routes>
          <Route path="/analytic" element={<Dashboard />}></Route>
          <Route path="/setting" element={<Dashboard />}></Route>
          <Route path="/" element={<Dashboard />}></Route>
        </Routes>
      </SWRConfig>
    </Router>
  )
}

export default App
