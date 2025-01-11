import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Admin, AdminLayout, Dashboard, Features, Orders, Products, Sales } from './pages/admin';
import { Auth, AuthLayout, Login, Register } from './pages/auth';
import { ShoppingLayout } from './pages/shopping-view';
import { About, Home, NotFound, UnauthPage } from './pages';
import { CheckAuth } from './components/common';

import { authSelector, refreshUser } from './api/slices/authSlice';
import { useToast } from './hooks/use-toast';
import { Skeleton } from './components/ui/skeleton';

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {toast} = useToast();

  const {isAuthenticated,user, isLoading, error} = useSelector(authSelector)

  // console.log(location.pathname, isAuthenticated, user)

  const from = location.state?.from || location.pathname;

  useEffect(()=> {
    dispatch(refreshUser())
      .then(() => navigate(from, { replace: true }))
      .catch(({payload}) => {
        toast({
          title: "Authentication Failed",
          description: payload.message,
          variant: "destructive",
        })
        navigate('/auth/login')
      });
    },[dispatch]);

  if (isLoading) 
    return (
      // <section className='w-screen h-screen'> 
      //   <h1 className='text-5xl text-red-400 tracking-widest'>Loading</h1>
      // </section>
      <Skeleton className="w-screen h-screen" />

    )

  return (
    <section className='w-screen h-screen'>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='home' element={<Home />} />
          <Route path='about' element={<About/>} />
          <Route path='unauth-page' element={<UnauthPage/>} />
        </Route>

        <Route path='/auth' element={<CheckAuth children={<AuthLayout />} />}>
          <Route index element={<Auth />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        <Route path='/admin' element={<CheckAuth children={ <AdminLayout />}/> }>
          <Route index element={<Admin />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='features' element={<Features />} />
          <Route path='orders' element={<Orders />} />
          <Route path='products' element={<Products />} />
          <Route path='sales' element={<Sales />} />
        </Route>

        <Route path='/shop' element={<CheckAuth children={<ShoppingLayout />}/> }>
          <Route index element={<Admin />} />
          <Route path='home' element={<Dashboard />} />
          <Route path='features' element={<Features />} />
          <Route path='orders' element={<Orders />} />
          <Route path='products' element={<Products />} />
          <Route path='sales' element={<Sales />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </section>
  )
}

export default App
