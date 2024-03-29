import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';


const WeekdayHeader: React.FC = () => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekdayRefs = useRef(new Array(7).fill(null));
  const currentDayIndex = new Date().getDay();

  useEffect(() => {
    // Only animate the current day
    const currentDayRef = weekdayRefs.current[currentDayIndex];
    if (currentDayRef) {
      gsap.fromTo(currentDayRef, { scale: 0.8 }, { scale: 1, duration: 0.5, ease: 'back.out(1.7)' });
    }
  }, [currentDayIndex]);

  return (
    <div className="grid grid-cols-7 gap-4 text-center font-bold mt-5 border-2 border-gray-700 rounded-lg shadow-lg p-4 bg-gray-800">
      {weekdays.map((day, index) => {
        const isToday = index === currentDayIndex;
        return (
          <div
            key={day}
            ref={(el) => (weekdayRefs.current[index] = el)}
            className={`px-4 py-2 rounded-full ${isToday ? 'bg-blue-500' : 'bg-gray-700'} text-gray-300`}
            style={{ transition: 'transform 0.5s' }}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
};

export default WeekdayHeader;
