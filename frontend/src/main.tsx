import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import TodoList from './pages/TodoList.tsx';
import './index.css';
import store from './redux/store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/todo',
    element: <TodoList />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
