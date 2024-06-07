import React, { useState } from 'react';
import { Box, SimpleGrid, Text, Checkbox, Heading, IconButton, HStack } from '@chakra-ui/react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from 'date-fns';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

interface ProgressCalendarProps {
    progress: { [date: string]: boolean };
    toggleCompletion: (date: string) => void;
}

const ProgressCalendar: React.FC<ProgressCalendarProps> = ({ progress, toggleCompletion }) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const handlePreviousMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });
    const monthName = format(currentDate, 'MMMM yyyy');

    return (
        <Box>
        <HStack justify="space-between" mb={4}>
            <IconButton
            aria-label="Previous month"
            icon={<ArrowBackIcon />}
            onClick={handlePreviousMonth}
            />
            <Heading size="md">{monthName}</Heading>
            <IconButton
            aria-label="Next month"
            icon={<ArrowForwardIcon />}
            onClick={handleNextMonth}
            />
        </HStack>
        <SimpleGrid columns={7} spacing={2}>
            {days.map((day) => {
            const formattedDate = format(day, 'yyyy-MM-dd');
            return (
                <Box key={formattedDate} textAlign="center">
                <Text>{format(day, 'd')}</Text>
                <Checkbox
                    isChecked={!!progress[formattedDate]}
                    onChange={() => toggleCompletion(formattedDate)}
                    colorScheme='orange'
                />
                </Box>
            );
            })}
        </SimpleGrid>
        </Box>
    );
};

export default ProgressCalendar;
