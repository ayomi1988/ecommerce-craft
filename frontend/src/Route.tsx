import { Route, Routes, Navigate } from 'react-router-dom';
import DashboardLogin from './pages/DashboardLogin';
import CustomerLogin from './pages/CustomerLogin';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/templates/default';
import PageNotfound from './pages/PageNotfound';
import EditCraftPage from './pages/edit/EditCraftPage';
import EditOrderPage from './pages/edit/EditOrderPage';
import EditCustomerPage from './pages/edit/EditCustomerPage';
import EditAdminPage from './pages/edit/EditAdminPage';
import CraftAction from './pages/add/CreateCraftPage';
import AdminAction from './pages/add/CreateAdminPage';
import OrderAction from './pages/add/CreateOrder'; // Buy
import OrderDetails from "./components/organisms/details/OrderDetails";
import CustomerAction from './pages/add/CreateCustomerPage';
import CustomerDetails from "./components/organisms/details/CustomerDetails";
import ClientView from './pages/ClientView';
import FrontendCraftD from './pages/detail/FrontendCraftDetail';


const RouteList = () => {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<Navigate replace to="/crafts" />}></Route>
                <Route path="/admin" element={<Navigate replace to="/dashboard/login" />}></Route>
                <Route path="/dashboard/admin/create" element={<AdminAction/>}></Route>
                <Route path="/dashboard/login" element={<DashboardLogin/>}></Route>
                <Route path="/dashboard" element={<Dashboard/>}></Route>                
                <Route path="/dashboard/craft/create" element={<CraftAction/>}></Route>
                <Route path="/dashboard/craft/edit/:id" element={<EditCraftPage/>}></Route>
                <Route path="/dashboard/admin/edit/:id" element={<EditAdminPage/>}></Route>
                <Route path="/dashboard/customer/edit/:id" element={<EditCustomerPage/>}></Route>
                <Route path="/dashboard/order/edit/:id" element={<EditOrderPage/>}></Route>
                
                <Route path="/crafts/signup" element={<CustomerAction/>}></Route>
                <Route path="/crafts/signin" element={<CustomerLogin/>}></Route>
                <Route path="/crafts" element={<ClientView />}></Route>
                <Route path="/crafts/account/:id" element={<CustomerDetails />}></Route>
                <Route path="/crafts/account/edit/:id" element={<EditCustomerPage />}></Route>
                <Route path="/craft/account/orders" element={<OrderDetails/>}></Route>                
                <Route path="/craft/account/order/edit/:id" element={<EditOrderPage/>}></Route>
                <Route path="/craft/detail/:id" element={<FrontendCraftD/>}></Route>
                
                
                <Route path='*' element={<PageNotfound/>}></Route>                
            </Route>
        </Routes>
    );
};

export default RouteList;