import React from 'react';
import { VStack, Text, StackDivider, Badge, HStack } from '@chakra-ui/react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

// Icono de basurero representado como un componente SVG
const trashIconSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-trash"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="1"
    stroke="#ff2825"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 7l16 0" />
    <path d="M10 11l0 6" />
    <path d="M14 11l0 6" />
    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
  </svg>
);

function TaskList({ todos, handleTaskAction, agregarTarea }) {
  // Obtener la fecha actual
  const currentDate = new Date();

  // Obtener la fecha formateada
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    weekday: 'long',
  }).format(currentDate);

  return (
    // Contenedor principal de la lista de tareas
    <VStack
      spacing={4}
      divider={<StackDivider />}
      borderColor="gray.100"
      borderWidth="2px"
      p="0"
      borderRadius="20px"
      w="100%"
      maxW={{ base: '90vw', sm: '80vw', lg: '60vw', xl: '50vw' }}
      alignItems="center"
      bg="gray.50"
      maxH="70vh"
      overflowY="auto"
    >
      {/* Encabezado de la lista con la fecha actual */}
      <HStack justify="space-between" w="100%" bg="red.500" p="3" borderRadius="20px 20px 0 0">
        <Text color="white" fontSize="xl">
          {formattedDate}
        </Text>
      </HStack>
      {/* Mensaje si no hay tareas */}
      {todos.length === 0 ? (
        <Badge colorScheme="green" p="4" borderRadius="lg" alignSelf="center">
          No hay tareas pendientes
        </Badge>
      ) : (
        // Mapeo de cada tarea para mostrarla con el componente TaskItem
        todos.map((todo) => (
          <TaskItem key={todo.id} todo={todo} handleTaskAction={handleTaskAction} />
        ))
      )}
      {/* Componente TaskForm para agregar nuevas tareas */}
      <TaskForm agregarTarea={agregarTarea} />
    </VStack>
  );
}

export default TaskList;
