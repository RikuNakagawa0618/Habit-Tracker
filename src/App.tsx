import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack } from '@chakra-ui/react';
import { Habit } from './components/types';
import { v4 as uuidv4 } from 'uuid';
import HabitForm from './components/HabitForm';
import HabitList from './components/HabitList';

const App: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const storedHabits = localStorage.getItem('habits');
    if (storedHabits) {
      try {
        const parsedHabits = JSON.parse(storedHabits);
        console.log('Loaded habits from localStorage:', parsedHabits);
        setHabits(parsedHabits);
      } catch (error) {
        console.error('Error parsing stored habits:', error);
      }
    } else {
      console.log('No habits found in localStorage');
    }
  }, []);

  useEffect(() => {
    try {
      console.log('Saving habits to localStorage:', habits);
      if (habits.length > 0) {
        localStorage.setItem('habits', JSON.stringify(habits));
      }
    } catch (error) {
      console.error('Error saving habits to localStorage:', error);
    }
  }, [habits]);

  const handleAddHabit = (habitName: string, weeklyGoal: number) => {
    const newHabit: Habit = {
      id: uuidv4(),
      name: habitName,
      completed: false,
      progress: {},
      weeklyGoal: weeklyGoal,
    };
    setHabits([...habits, newHabit]);
  };

  const toggleHabitCompletion = (id: string, date: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const newProgress = { ...habit.progress, [date]: !habit.progress[date] };
        console.log('Toggling habit completion:', id, date, newProgress);
        return { ...habit, progress: newProgress };
      }
      return habit;
    }));
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <VStack spacing={8} mb={8} mx="50px">
        <Heading
          as="h1"
          size="2xl"
          mt={8}
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          bgClip='text'
          fontSize='6xl'
          fontWeight='extrabold'
        >
          Habit Tracker
        </Heading>
        <HabitForm handleAddHabit={handleAddHabit} />
        <HabitList
          habits={habits}
          toggleCompletion={toggleHabitCompletion}
          handleDeleteHabit={handleDeleteHabit}
        />
      </VStack>
    </Box>
  );
};

export default App;
