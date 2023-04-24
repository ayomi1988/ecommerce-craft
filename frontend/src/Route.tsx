import { Route, Routes, Navigate } from 'react-router-dom';
import CustomerAction from './pages/add/CreateCustomerPage';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/templates/default';
import PageNotfound from './pages/PageNotfound';
import EditAction from './pages/edit/EditCustomerPage';

const RouteList = () => {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<Navigate replace to="/customers/list" />}></Route>
                <Route path="/customers/list" element={<Dashboard/>}></Route>
                <Route path="/customers/create" element={<CustomerAction/>}></Route>
                <Route path="/customers/edit/:id" element={<EditAction/>}></Route>
                <Route path='*' element={<PageNotfound/>}></Route>                
            </Route>
        </Routes>
    );
};

export default RouteList;