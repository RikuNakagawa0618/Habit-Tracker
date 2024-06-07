import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import { Habit } from './types';
import HabitItem from './HabitItem';

interface HabitListProps {
    habits: Habit[];
    toggleCompletion: (id: string, date: string) => void;
    handleDeleteHabit: (id: string) => void;
}

const HabitList: React.FC<HabitListProps> = ({ habits, toggleCompletion, handleDeleteHabit }) => {
    return (
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={8}>
        {habits.map(habit => (
            <HabitItem
            key={habit.id}
            habit={habit}
            toggleCompletion={toggleCompletion}
            handleDeleteHabit={handleDeleteHabit}
            />
        ))}
        </SimpleGrid>
    );
};

export default HabitList;
