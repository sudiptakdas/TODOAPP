import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  const renderData = () => {
    return taskArray.map((item, index) => (
      <div
        className=' bg-yellow-50 w-full border border-black text-lg flex  text-start gap-2 p-2 justify-between items-center'
        key={index}
      >
        <div>
          <li>{item.text}</li>
          <li>{item.description}</li>
        </div>
        <div className=' min-w-fit flex gap-2'>
          <button
            className=' text-white text-xl px-4 py-2 border border-blue bg-blue-400 rounded-xl  '
            onClick={() => onUpdate(index)}
          >
            Update
          </button>
          <button
            className=' text-white text-xl px-4 py-2 border border-blue bg-red-400 rounded-xl  '
            onClick={() => onDelete(item._id)}
          >
            Delete
          </button>
        </div>
      </div>
    ));
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
      <h1 className=' text-6xl text-white  bg-gray-800 font-semibold p-4'>
        Todo List
      </h1>
      <form onSubmit={handleFormSubmit}>
        <div className=' flex justify-center mx-10 w-full gap-6 items-center'>
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
            className=' text-white text-xl w-2/12 mt-6 py-3 border border-blue bg-blue-700 rounded-xl  '
          >
            {isEdit === -1 ? 'Add Task' : 'Update Task'}
          </button>
        </div>
      </form>
      <div>
        <ul className=' grid grid-cols-2 gap-4 mx-4 p-2'>
          {renderData().length > 0 && renderData()}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
