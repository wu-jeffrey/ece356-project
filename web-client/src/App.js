import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Layout, Menu } from 'antd';

import { AuthProvider, AuthConsumer } from "./routing/authContext";
import { ProtectedRoute } from "./routing/ProtectedRoute";
import { Home } from "./components/Home";
import { Companies } from "./components/Companies";
import { Company } from "./components/Company";
import { AnnualReport } from "./components/AnnualReport";
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
              <Layout className="layout" style={{ minHeight: '100vh' }}>
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
                      <Menu.Item style={{ marginLeft: 'auto' }} onClick={logout} key="logout">
                        <div>Logout</div>
                      </Menu.Item>
                    </Menu>
                  )}
                </Header>
                <Content style={{ padding: 24 }}>
                  <Routes>
                    <Route path="*" element={<div>404 NOT FOUND</div>}></Route>
                    <Route path="/" element={<ProtectedRoute children={<Home />} />} />
                    <Route path="/login" element={<LoginOrSignup />} />
                    <Route path="/companies" element={<ProtectedRoute children={<Companies />} />} />
                    <Route path="/companies/:companyID" element={<ProtectedRoute children={<Company />} />} />
                    <Route path="/companies/:companyID/history" element={<ProtectedRoute children={<History />} />} />
                    <Route path="/annual-report/:annualReportID" element={<ProtectedRoute children={<AnnualReport />} />} />
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
