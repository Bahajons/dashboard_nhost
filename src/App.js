import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { NhostClient, NhostReactProvider } from '@nhost/react'

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {
  const nhost = new NhostClient({
    subdomain: process.env.REACT_APP_NHOST_SUBDOMAIN,
    region: process.env.REACT_APP_NHOST_REGION
  })
  return (
    <>
      <NhostReactProvider nhost={nhost}>
        <BrowserRouter>
          <Routes>
            <Route path="sign-up" element={<SignUp />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NhostReactProvider>
      <Toaster />
      {console.log(nhost)}
    </>
  );
}

export default App;
