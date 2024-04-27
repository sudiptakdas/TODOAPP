import React from 'react';

interface TaskItem {
  text: string;
  description: string;
  completed: boolean;
  _id: string;
}

interface ListType {
  taskArray: TaskItem[];
  onUpdate: (_id: string) => void;
  onChecked: (_id: string, completed: boolean) => void;
  onDelete: (_id: string) => void;
}

const List: React.FC<ListType> = ({
  taskArray,
  onUpdate,
  onChecked,
  onDelete,
}) => {
  return taskArray.map((item, index) => (
    <div
      className=' bg-yellow-50 w-full rounded-lg border border-black text-lg flex  text-start gap-2 p-3 justify-between items-center'
      key={index}
    >
      <div className=' flex items-center gap-1 '>
        <input
          type='checkbox'
          checked={item.completed}
          onChange={() => onChecked(item._id, !item.completed)}
          className='mr-2 w-6 h-6 cursor-pointer'
        />
        <div>
          <li className=' text-xl font-semibold'>{item.text}</li>
          <li>{item.description}</li>
        </div>
      </div>
      <div className=' min-w-fit flex gap-2'>
        <button
          className={`text-white text-xl px-4 py-2 border border-blue bg-blue-400 rounded-xl  ${
            !item?.completed
              ? 'hover:bg-blue-600 hover:scale-105 transition duration-300 ease-in-out'
              : ''
          }`}
          onClick={() => onUpdate(item._id)}
          disabled={item.completed}
        >
          Update
        </button>
        <button
          className=' text-white text-xl px-4 py-2 border border-blue bg-red-400 rounded-xl hover:bg-red-600 hover:scale-105 transition duration-300 ease-in-out '
          onClick={() => onDelete(item._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default List;
