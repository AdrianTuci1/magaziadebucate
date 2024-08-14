import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeLoginState } from './redux/authSlice';

import { Routes, Route } from 'react-router-dom';
import NavBar from "./components/NavBar"
import HomePage from "./routes/HomePage"
import './styles/app.scss'
import RetetaPage from './routes/RetetaPage';
import Layout from './routes/Layout';
import ReteteleMele from './components/ReteteleMele';
import AdaugaReteta from './routes/AdaugaReteta';
import SetariPage from './routes/SetariPage';
import EditeazaReteta from './routes/EditeazaReteta';
import RegisterPage from './routes/RegisterPage';
import ProtectedRoute from './functional/ProtectedRoute';
import { RootState } from './redux/store';
import NotAuthorized from './routes/NotAuthorized';
import PaginaAdmin from './routes/PaginaAdmin';
import AdminLayout from './routes/AdminLayout';
import AdminUsers from './components/AdminUsers';
import MainContent from './routes/MainContent';
import NonAuthenticatedPage from './routes/NotAuthenticated';
import FavoriteRecipes from './components/FavoriteRecipes';
import MealPlansTable from './routes/MealPlanTable';
import { Toaster } from 'react-hot-toast';
import EditMealPlanPage from './routes/EditMealPlan';
import ViewMealPlanPage from './routes/ViewMealPlan';
import InCurand from './routes/InCurand';
import VerifyEmail from './routes/VerifyEmail';


function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);
  
  useEffect(() => {
    dispatch(initializeLoginState() as any);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  return (
    <div className="homepage">
      <Toaster
        position="top-center"
      />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/retete" element={<MainContent />} />
        <Route path="/retete/:recipeId" element={<RetetaPage />} />
        <Route path="/retete/edit/:recipeId" element={<EditeazaReteta />} />
        <Route 
          path="/retetele-mele" 
          element={
            <ProtectedRoute requiredRoles={['ROLE_USER', 'ROLE_ADMIN']}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path='retete' element={<ReteteleMele />} />
          <Route path='favorite' element={<FavoriteRecipes />} />
          <Route path='plan' element={<MealPlansTable />} />
        </Route>
        <Route path='/adauga' element={<AdaugaReteta />} />
        <Route 
          path='/setari' 
          element={
            <ProtectedRoute requiredRoles={['ROLE_USER', 'ROLE_ADMIN']}>
              <SetariPage />
            </ProtectedRoute>
          } 
        />
        <Route path='/inregistrare' element={<RegisterPage />} />
        <Route path='/not-authorized' element={<NotAuthorized />} />
        <Route path='/not-authenticated' element={<NonAuthenticatedPage />} />
        <Route 
          path='/admin' 
          element={
            <ProtectedRoute requiredRoles={['ROLE_ADMIN']}>
              <AdminLayout />
            </ProtectedRoute>
          } 
        >
        <Route path='' element={<PaginaAdmin/>}/>
        <Route path='users' element={<AdminUsers/>}/>
        </Route>
        <Route path='/plan-alimentar/:id/edit' element={<EditMealPlanPage />} />
        <Route path='/plan-alimentar/:id' element={<ViewMealPlanPage />} />
        <Route path='/incurand' element={<InCurand />}/>
        <Route path='/email/verifica/:token' element={<VerifyEmail />} />
      </Routes>
    </div>
  );
}

export default App