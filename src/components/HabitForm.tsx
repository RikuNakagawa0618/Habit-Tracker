import React, { useState } from 'react';
import { Flex, Input, Button, useToast, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from '@chakra-ui/react';

interface HabitFormProps {
    handleAddHabit: (habitName: string, weeklyGoal: number) => void;
}

const HabitForm: React.FC<HabitFormProps> = ({ handleAddHabit }) => {
    const [habitName, setHabitName] = useState<string>('');
    const [weeklyGoal, setWeeklyGoal] = useState<number>(1);
    const toast = useToast();

    const handleSubmit = () => {
        if (habitName.trim() !== '' && weeklyGoal > 0) {
        handleAddHabit(habitName, weeklyGoal);
        setHabitName('');
        setWeeklyGoal(1);
        } else {
        toast({
            title: 'Please enter a habit name.',
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
        }
    };

    return (
        <Flex>
            <Input
                placeholder="Enter a new habit"
                size="lg"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                mr={2}
            />
            <NumberInput
                value={weeklyGoal}
                min={1}
                size="lg"
                onChange={(valueString) => setWeeklyGoal(parseInt(valueString))}
                mr={2}
            >
                <NumberInputField placeholder="Weekly Goal" />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <Button colorScheme="pink" size="lg" px={8} onClick={handleSubmit}>
                Add Habit
            </Button>
        </Flex>
    );
};

export default HabitForm;
