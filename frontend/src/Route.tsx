import { Route, Routes, Navigate } from 'react-router-dom';
import CustomerAction from './pages/add/CreateCustomerPage';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/templates/default';
import PageNotfound from './pages/PageNotfound';
import EditAction from './pages/edit/EditCustomerPage';
import ClientView from './pages/ClientView';

const RouteList = () => {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<Navigate replace to="/dashboard" />}></Route>
                <Route path="/dashboard" element={<Dashboard/>}></Route>
                <Route path="/dashboard/create" element={<CustomerAction/>}></Route>
                <Route path="/dashboard/edit/:id" element={<EditAction/>}></Route>
                <Route path="/crafts" element={<ClientView/>}></Route>
                <Route path='*' element={<PageNotfound/>}></Route>                
            </Route>
        </Routes>
    );
};

export default RouteList;