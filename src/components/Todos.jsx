import React, { useState, useEffect } from 'react';
import deleteIcon from '../images/deleteIcon.jpg'
function Todos() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const storedMode = JSON.parse(localStorage.getItem('isDarkMode')) || false;
    setTodos(storedTodos);
    setIsDarkMode(storedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim().length > 0) {
      setTodos((prevTodos) => [...prevTodos, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  };

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  

  return (
    <div className={`container ${isDarkMode ? 'dark' : 'light'}`}>
      <header>
        <div className="header-top">
          <div className="header-title">
            <h1>TODO</h1>
            <button className="dark-mode" onClick={toggleMode}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M11.3807 2.01886C9.91573 3.38768 9 5.3369 9 7.49999C9 11.6421 12.3579 15 16.5 15C18.6631 15 20.6123 14.0843 21.9811 12.6193C21.6613 17.8537 17.3149 22 12 22C6.47715 22 2 17.5228 2 12C2 6.68514 6.14629 2.33869 11.3807 2.01886Z"
                  fill="#ffffff"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <form>
          <div className="input-wrapper">
            <span className="oval-icon"></span>
            <input
              autoFocus
              autoComplete="on"
              minLength="3"
              maxLength="40"
              className="textInput"
              type="text"
              placeholder="Create a new todo…"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
            <button className='add-btn' onClick={handleAddTodo}>Add</button>
          </div>
          <ul className="list-items">
            {todos.map((todo, index) => (
              <li className='list-item' key={index}>
                <h3 className='title'>{todo}</h3>
             
                    <img onClick={() => handleDeleteTodo(index)} className='delete' src={deleteIcon} alt="" />
             
              </li>
            ))}
          </ul>
          <div className="form-bottom">
        
            <button className="clear" type="button" onClick={() => setTodos([])}>
              Clear Completed
            </button>
          </div>
        </form>
      </header>
     
    </div>
  );
}

export default Todos;
