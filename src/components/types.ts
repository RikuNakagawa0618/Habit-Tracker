export interface Habit {
    id: string;
    name: string;
    completed: boolean;
    progress: { [date: string]: boolean };
    weeklyGoal: number;
}
