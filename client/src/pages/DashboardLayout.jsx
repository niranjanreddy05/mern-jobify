import { Outlet, useLoaderData, redirect, useNavigate } from 'react-router-dom';

import Wrapper from '../assets/wrappers/Dashboard';
import { Navbar, BigSidebar, SmallSidebar } from '../components';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import { createContext } from 'react';
import { checkDefaultTheme } from '../App';
import customFetch from '../utils/customFetch';

const DashboardContext = createContext();


export const loader = async () => {
  try {
    const { data } = await customFetch.get('/users/current-user')
    return data;
  } catch (error) {
    return redirect('/');
  }
}

const Dashboard = ({ isDarkThemeEnabled }) => {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle('dark-theme', newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  }

  const logoutUser = async () => {
    navigate('/');
    customFetch.get('/auth/logout');
    toast.success('Logged out!')
    return null;
  }

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => { return useContext(DashboardContext) }
export default Dashboard;