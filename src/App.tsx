// import "./App.css";

import { Link, Outlet } from "react-router-dom";


function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<h1>Home</h1>} />
          <Route path="/users" element={<h1>Users</h1>} />
          <Route path="/message" element={<CreateMessage />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes> */}
      <Layout />
      <Outlet/>
    </>
  );
}

function Layout() {
  return (
    <nav className="flex gap-12 text-lg capitalize justify-center my-8">
      <Link to="/" className="nav-btn ">
        Home
      </Link>
      <Link to="/users" className="nav-btn">
        Users
      </Link>
      <Link to="/message" className="nav-btn">
        message
      </Link>
      <Link to="/about" className="nav-btn">
        About
      </Link>
     
    </nav>
  );
}

export default App;
