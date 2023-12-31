import React, { useState, useEffect } from 'react';
import { ChakraProvider, VStack, IconButton, HStack } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { Header } from './Components/Header/Header.jsx'
import TaskList from './Components/TaskList/TaskList';
import { Footer } from './Components/Footer/Footer.jsx';

// Función principal del componente App
function App() {
  // Definición de las tareas iniciales utilizando el estado inicial
  const initialTodos = [
    {
    id: 1,
    title: 'Entregar Trabajo Final antes de las 19hs el dia 27/11/23 ',
    completed: true,
  },
  {
    id: 2,
    title: 'Corroborar componentes y funcionalidades',
    completed: false,
  },
{
    id: 3,
    title: 'Pensar futuras funcionalidades',
    completed: false,
},
{
    id: 4,
    title: 'Descafeinizar el café',
    completed: false,
}

]
  
   // Declaración del estado para almacenar la lista de tareas
   const [todos, setTodos] = useState(initialTodos);


  // Efecto secundario para imprimir en la consola cuando la lista de tareas cambia
  useEffect(() => {
    console.log('La lista de tareas ha cambiado:', todos);
  }, [todos]);

  // Función para manejar las acciones de las tareas
  function handleTaskAction(id, action, editedTitle) {
    const actions = {
      'delete': () => setTodos(todos.filter((todo) => todo.id !== id)),
      'toggle': () => setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))),
      'edit': (newTitle) => setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo))),
    };

    actions[action] && actions[action](editedTitle);
  }

  // Función para agregar una nueva tarea con la fecha actual
  function agregarTarea(todo) {
    const fechaActual = new Date();
    const fechaFormateada = new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      weekday: 'long',
    }).format(fechaActual);

    const tareaConFecha = {
      ...todo,
      fecha: fechaFormateada,
    };

    setTodos([...todos, tareaConFecha]);
  }

  return (
    // Proveedor de diseño Chakra para estilos y componentes
    <ChakraProvider>
      {/* Contenedor principal con alineación y padding */}
      
      <VStack maxW={{ base: '82vw', sm: '60vw', md:'46vw', lg: '34vw', xl: '32vw' }} 
              minW={{ base: '75vw', sm: '46vw', md:'34vw', lg: '28vw', xl: '24vw' }}
      p={1} justifyContent={'center'}>
      
        
        {/* Componente TaskList para mostrar la lista de tareas */}
        <TaskList todos={todos} handleTaskAction={handleTaskAction} agregarTarea={agregarTarea} />
      </VStack>
    </ChakraProvider>
  );
}

export default App;
