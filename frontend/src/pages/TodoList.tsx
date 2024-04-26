import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '../components/List';

interface taskArrayType {
  _id: string;
  text: string;
  description: string;
}

const TodoList: React.FC = () => {
  const [formData, setFormData] = useState({
    text: '',
    description: '',
  });
  const [taskArray, setTaskArray] = useState<Array<taskArrayType>>([]);
  const [isEdit, setIsEdit] = useState(-1);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/todos');
      setTaskArray(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit > -1) {
        await axios.patch(
          `http://localhost:3000/api/todo/${taskArray[isEdit]._id}`,
          formData
        );
        setIsEdit(-1);
      } else {
        await axios.post('http://localhost:3000/api/todo', formData);
      }
      setFormData({ text: '', description: '' });
      fetchData();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const onUpdate = (index: number) => {
    setIsEdit(index);
    setFormData(taskArray[index]);
  };

  const onDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/todo/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className='flex flex-col gap-6 '>
      <h1 className=' text-6xl text-white  bg-gray-800 font-semibold p-4 rounded-xl'>
        Todo List
      </h1>
      <form onSubmit={handleFormSubmit}>
        <div className=' flex flex-col md:flex-row justify-center mx-10 w-full gap-6 items-center'>
          <div className=' '>
            <h1 className=' font-semibold text-lg items-start flex'>
              Add Task
            </h1>
            <input
              title='Task'
              className=' w-full text-2xl p-2 rounded-lg border border-black'
              placeholder='Add Task'
              value={formData.text}
              onChange={(e) => {
                setFormData((prev) => {
                  return {
                    ...prev,
                    text: e.target.value,
                  };
                });
              }}
            />
          </div>
          <div className=''>
            <h1 className=' font-semibold text-lg items-start flex'>
              Add Description
            </h1>
            <input
              title='Description'
              className=' w-full text-2xl p-2 rounded-lg border border-black'
              placeholder='Add Description'
              value={formData.description}
              onChange={(e) => {
                setFormData((prev) => {
                  return {
                    ...prev,
                    description: e.target.value,
                  };
                });
              }}
            />
          </div>
          <button
            type='submit'
            className=' text-white text-xl w-6/12 md:w-2/12 mt-6 py-3 border border-blue bg-blue-700 rounded-xl hover:scale-105 transition duration-300 ease-in-out'
          >
            {isEdit === -1 ? 'Add Task' : 'Update Task'}
          </button>
        </div>
      </form>
      <div>
        <ul className=' grid grid-cols-1 md:grid-cols-2 gap-4 mx-4 p-2'>
          {
            <List
              taskArray={taskArray}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          }
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
