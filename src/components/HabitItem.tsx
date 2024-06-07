import React from 'react';
import { Box, VStack, HStack, Text, IconButton, Progress } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { Habit } from './types';
import ProgressCalendar from './ProgressCalendar';
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';

interface HabitItemProps {
    habit: Habit;
    toggleCompletion: (id: string, date: string) => void;
    handleDeleteHabit: (id: string) => void;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit, toggleCompletion, handleDeleteHabit }) => {
    const currentWeek = eachDayOfInterval({
        start: startOfWeek(new Date(), { weekStartsOn: 6 }),
        end: endOfWeek(new Date(), { weekStartsOn: 6 }),
    }).map(date => format(date, 'yyyy-MM-dd'));

    const completedDays = currentWeek.filter(date => habit.progress[date]).length;
    const progressPercentage = (completedDays / habit.weeklyGoal) * 100;

    const cardBgColor = completedDays >= habit.weeklyGoal ? 'red.50' : 'white';

    return (
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" minWidth="300px" bgColor={cardBgColor}>
            <VStack spacing={2} align="stretch">
                <HStack justify="space-between" spacing={4}>
                    <Text fontWeight="bold" fontSize="lg">{habit.name}</Text>
                    <IconButton
                        aria-label="Delete habit"
                        icon={<CloseIcon />}
                        size="sm"
                        colorScheme="red"
                        onClick={() => handleDeleteHabit(habit.id)}
                    />
                </HStack>
                <ProgressCalendar
                    progress={habit.progress}
                    toggleCompletion={(date) => toggleCompletion(habit.id, date)}
                />
                <Text>Weekly Goal: {habit.weeklyGoal}</Text>
                <Progress value={progressPercentage} colorScheme="green" />
                <Text>{completedDays} / {habit.weeklyGoal} days completed</Text>
            </VStack>
        </Box>
    );
};

export default HabitItem;
