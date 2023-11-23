import React, { useState, useEffect } from 'react';
import { ChakraProvider, VStack, IconButton } from '@chakra-ui/react';
import { FaSun } from 'react-icons/fa';
import TaskList from './Components/TaskList';

// Función principal del componente App
function App() {
  // Definición de las tareas iniciales utilizando el estado inicial
  const initialTodos = [
    {
      id: 1,
      title: 'Realización de la tarea 1',
      completed: false,
    },
    {
      id: 2,
      title: 'Realización de la tarea 2',
      completed: false,
    },
    {
      id: 3,
      title: 'Realización de la tarea 3',
      completed: false,
    },
    {
      id: 4,
      title: 'Realización de la tarea 4',
      completed: false,
    },
    {
      id: 5,
      title: 'Realización de la tarea 5',
      completed: false,
    },
  ];

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
      <VStack p={4} alignItems="center">
        {/* Botón de sol con icono */}
        <IconButton icon={<FaSun />} isRound size='lg' alignSelf='flex-end' color="yellow.500" />
        {/* Componente TaskList para mostrar la lista de tareas */}
        <TaskList todos={todos} handleTaskAction={handleTaskAction} agregarTarea={agregarTarea} />
      </VStack>
    </ChakraProvider>
  );
}

export default App;
