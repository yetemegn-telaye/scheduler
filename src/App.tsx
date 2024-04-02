import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useState, useEffect, useRef } from "react";
import { add, format } from "date-fns";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {addTask, toggleModal} from "./redux/action";
import gsap from "gsap";

import MonthCalendar from "./components/MonthCalendar";
import { useSelector } from "react-redux";

function App() {
  const isModalOpen = useSelector((state:any) => state.modalOpen);
  const selectedDate = useSelector((state:any) => state.selectedDate);
  const [title, setTitle] = useState("");
  const modalRef = useRef(null);
  const dispatch = useDispatch();


  const labelColors = [
    { name: 'Urgent', value: 'red' },
    { name: 'not urgent', value: 'blue' },
    { name: 'chill', value: 'green' },
    { name: 'Asap', value: 'yellow' },
    // Add more colors as needed
  ];
  const [labelColor, setLabelColor] = useState(labelColors[0].value);

  useEffect(() => {
    const modal = modalRef.current;
    if (isModalOpen) {
      gsap.to(modal, {
        duration: 0.5,
        x: 0,
        y: 0,
        width: "50%",
        height: "60%",
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        ease: "power4.out",
      });
    } else {
      gsap.to(modal, {
        duration: 0.5,
        x: "100%",
        y: "-100%",
        width: "40rem",
        height: "20rem",
        borderTopRightRadius: "2rem",
        borderBottomLeftRadius: "2rem",
        ease: "power4.in",
      });
    }
  }, [isModalOpen]);

  const openModal = () => {
    dispatch(toggleModal(true));
  };

  const closeModal = () => {
    dispatch(toggleModal(false));
    setTitle("");
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const newTask = { 
      title: title,
      labels: [{ id:Math.random() ,color: labelColor, text: labelColor }], // Set default labels if needed or gather them from state/form
      date: format(selectedDate, 'yyyy-MM-dd')
    };
    dispatch(addTask(newTask))
    setTitle("");
   dispatch(toggleModal(false));
  };

  return (
    <>
      <Provider store={store}>
        <div className="relative p-2">
          <MonthCalendar />
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
              <div
                ref={modalRef}
                className="bg-white p-8 rounded-lg shadow-lg overflow-hidden"
              >
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <AiOutlineClose size={24} />
                </button>
                <h1 className="text-lg font-bold mb-4 text-gray-800">Add Task</h1>
                <form onSubmit={handleSubmit}>
  <div className="mb-4">
    <label className="block mb-2 text-gray-800">Title:</label>
    <input
      type="text"
      value={title}
      name="title"
      onChange={(e) => setTitle(e.target.value)}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
      required
    />
  </div>
  <div className="mb-4">
    <label className="block mb-2 text-gray-800">Label Color:</label>
    <select
      name="labelColor"
      value={labelColor}
      onChange={(e) => setLabelColor(e.target.value)}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
    >
      {labelColors.map((color) => (
        <option key={color.value} value={color.value}>
          {color.name}
        </option>
      ))}
    </select>
  </div>
  <div className="mb-4">
    <label className="block mb-2 text-gray-800">Date:</label>
    <input
      type="date"
      name="date"
      value={format(selectedDate, "yyyy-MM-dd")}
      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
      required
      disabled
    />
  </div>
  <button
    type="submit"
    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
  >
    Add Task
  </button>
</form>

              </div>
            </div>
          )}
        </div>
      </Provider>
    </>
  );
}

export default App;
