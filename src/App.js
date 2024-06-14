import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import publicRoutes from "./routes/Routes";
import { Fragment } from "react";
import DefaultLayout from "./components/Layouts/DefaultLayout/DefaultLayout";
import React from "react";
function App() {
  return (
    <Router>
      <div className="App" style={{ width: "100%", position: "relative" }}>
        <Routes>
          {publicRoutes.map((item, index) => {
            let Layout = DefaultLayout;
            if (item.layout) {
              Layout = item.layout;
            } else {
              if (item.layout === null) {
                Layout = Fragment;
              }
            }
            const Page = item.component;

            return (
              <Route
                key={index}
                path={item.path}
                element={
                  <Layout>
                    <Page data={item.path}></Page>
                  </Layout>
                }
              ></Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
