import React from 'react';
import ReactDOM from 'react-dom/client';
import TodoList from './pages/TodoList.tsx';
import './index.css';
import store from './redux/store.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: '/',
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
