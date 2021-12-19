import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Layout, Menu } from 'antd';

import { Home } from "./components/Home";
import { Companies } from "./components/Companies"
import { History } from "./components/History"

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout className="layout" style={{ height: '100vh' }}>
          <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal">
              <Menu.Item>
                <NavLink to="/">Home</NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink to="/companies">Companies</NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink to="/history">History</NavLink>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: 64 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: 'center' }}>ECE 356 - Stocks Database ©2021 Created by Group 59</Footer>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
