import Login from './views/pages/Login/index';
import Home from './views/pages/Home/index';
import Signup from './views/pages/Signup';
import Layout from './views/components/Layout';
import Missing from './views/pages/Missing';
import RequireAuth from './views/components/RequireAuth';
import RequireNotAuth from './views/components/RequireNotAuth';
import Profile from './views/components/Profile'
import { Route, Routes } from 'react-router-dom';

export default function App() {
    return ( 
        <Routes>
            <Route path={"/"} element={<Layout />}>
                <Route path={'/'} element={<Home />}/>

                {/* if already logged in then can't access these pages */}
                <Route element={<RequireNotAuth />}>
                    <Route path={'/login'} element={<Login />}/>
                    <Route path={'/signup'} element={<Signup />}/>
                </Route>
                
                {/* can only be access if logged in */}
                <Route element={<RequireAuth />}>
                    <Route path={'/profile'} element={<Profile />}/>
                </Route>

                <Route path="*" element={<Missing />}/>
            </Route>
        </Routes>
    )
}