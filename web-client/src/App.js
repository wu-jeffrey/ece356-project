import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Layout, Menu } from 'antd';

import { AuthProvider, AuthConsumer } from "./routing/authContext";
import { ProtectedRoute } from "./routing/ProtectedRoute";
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
            {({ isAuth, logout }) => (
              <Layout className="layout" style={{ height: '100vh' }}>
                <Header>
                  {isAuth && (
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
                      <Menu.Item style={{ marginLeft: 'auto' }} key="logout">
                        <div type="text" onClick={() => { logout(); }}>Logout</div>
                      </Menu.Item>
                    </Menu>
                  )}
                </Header>
                <Content style={{ padding: 64 }}>
                  <Routes>
                    <Route path="/login" element={<LoginOrSignup />} />
                    <Route path="/" element={<ProtectedRoute children={<Home />} />} />
                    <Route path="/companies" element={<ProtectedRoute children={<Companies />} />} />
                    <Route path="/history" element={<ProtectedRoute children={<History />} />} />
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
