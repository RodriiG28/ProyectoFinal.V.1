import React from 'react';
import { VStack, Text, StackDivider, Badge, HStack, Container, Grid, GridItem } from '@chakra-ui/react';
import TaskItem from '../TaskItem/TaskItem';
import TaskForm from '../TaskForm/TaskForm';
import { FaCloudUploadAlt } from 'react-icons/fa';

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
  console.log(currentDate.getFullYear())
  // no permanente
  const meses = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const dias = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Satuday"]
  
  let mes = meses[currentDate.getMonth()];
  let dia = dias[currentDate.getDay()]
  let horas = currentDate.getHours()
  //no permanente 

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
      spacing={0.5}
      // divider={<StackDivider />}
      
      
      p="0"
      borderRadius="12px"
      w="100%"
      maxW={{ base: '90vw', sm: '80vw', lg: '60vw', xl: '50vw' }}
      minH="60vh"
      alignItems="center"
      bg="gray.50"
      
      overflowY="auto"
    >
      {/* Encabezado de la lista con la fecha actual */}
      <HStack w="100%" bg="rgb(255,31,91)" p="1" mb={'6'}>
        <Container color={'white'} maxH={'40px'} >
      {/* Un Grid para lograr la estructura y comportamiento deseado para el "header" de nuestra TDlist */}
            <Grid templateRows='repeat(1, 1fr)' templateColumns='repeat(5, 1fr)' 
            fontFamily="Red Hat Display" alignItems={'center'}>
              <GridItem columnSpan={1} colStart={1} colEnd={1} rowStart={1} >
                <Text fontSize={'26'}>{currentDate.getDate()}</Text></GridItem>
              <GridItem columnSpan={1} colStart={2} colEnd={2} rowStart={1} textAlign={'initial'}>
                <Text fontSize={'10'}>{mes}<Text mt={'-0.5'} fontSize={'9'}>{currentDate.getFullYear()}</Text></Text></GridItem>
              <GridItem colStart={5} colEnd={5} rowStart={1} rowEnd={1} alignItems={'flex-end'}>
                <Text fontSize={'10'}> {horas>11 ? horas -12 : horas}:{currentDate.getMinutes()}{horas>12?'pm':'am'}</Text>
                <Text mt={'-0.5'}  fontSize={'8'}> {dia} </Text></GridItem>
            </Grid>
        </Container>
        
      </HStack>
      <VStack minH={{base:'30vh'}}>
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
      </VStack>
      {/* Componente TaskForm para agregar nuevas tareas */}
      <TaskForm alignSelf={''} agregarTarea={agregarTarea} />
    </VStack>
  );
}

export default TaskList;
