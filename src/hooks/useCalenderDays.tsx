import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import format from "date-fns/format";
import addDays from "date-fns/addDays";
import DayBox from "../components/DayBox";
import { moveTask } from "../redux/action"; // Import the moveTask action

const useCalendarDays = ({ startDay, endDay,openAddTaskModal}: any) => {
    // Use useSelector to get the tasks from the Redux store
    const tasks = useSelector((state:any) => state.tasks);

    // Use useDispatch to get the dispatch function
    const dispatch = useDispatch();

    // Replace moveTaskToDay with the dispatch call
    const moveTaskToDay = (taskId: number, newDate: Date) => {
        dispatch(moveTask(taskId, newDate));
    };

    const days = useMemo(() => {
        const daysArray = [];
        for (let day = startDay; day <= endDay; day = addDays(day, 1)) {
            const dayString = format(day, 'yyyy-MM-dd');
            daysArray.push({
                key: day.toISOString(),
                date: day,
                tasks: tasks[dayString] || [],
                onDropTask: moveTaskToDay,
                openAddTaskModal
            });
        }
        return daysArray;
    }, [startDay, endDay, tasks, moveTaskToDay]);

    const renderDays = () => days.map((dayProps) => <DayBox {...dayProps} />);

    return { days, renderDays };
};

export default useCalendarDays;
