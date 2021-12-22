import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Layout, Menu } from 'antd';

import { AuthProvider, AuthConsumer } from "./routing/authContext";
import { Home } from "./components/Home";
import { Companies } from "./components/Companies";
import { History } from "./components/History";
import { LoginOrSignup } from "./components/LoginOrSignup";

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AuthConsumer>
            {({ isAuth }) => (
              <Layout className="layout" style={{ height: '100vh' }}>
                <Header>
                  <div className="logo" />
                  <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="home">
                      <NavLink to="/">Home</NavLink>
                    </Menu.Item>
                    <Menu.Item key="companies">
                      <NavLink to="/companies">Companies</NavLink>
                    </Menu.Item>
                    <Menu.Item key="history">
                      <NavLink to="/history">History</NavLink>
                    </Menu.Item>
                  </Menu>
                </Header>
                <Content style={{ padding: 64 }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/companies" element={<Companies />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/login" element={<LoginOrSignup />} />
                  </Routes>
                </Content>
                <Footer style={{ textAlign: 'center' }}>ECE 356 - Stocks Database ©2021 Created by Group 59</Footer>
              </Layout>
            )}
          </AuthConsumer>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
