import { useState, useRef } from "react"
import Modal from "./Modal";
export default function NewTask({onAdd}){

    const[enteredTask, setEnteredTask] =useState("");
    const modal1 = useRef();

    function handleChange(event){
        setEnteredTask(event.target.value);
    }

    function handleClick(){
        if(enteredTask.trim() === ''){
            modal1.current.open();
            return;
        }
        onAdd(enteredTask)
        setEnteredTask('');
    }

    return <div className="flex items-center gap-4">
        <Modal ref={modal1} buttonCaption="Okay">
            <h2 className='text-xl font-bold text-stone-700 my-4 '>Empty Input</h2>
            <p className='text-stone-600 mb-4 '>Make sure input fields have a value</p>
        </Modal>
        <input 
        className="w-64 px-2 py-1 rounded-sm bg-stone-200" 
        type="text"
        onChange={handleChange}
        value={enteredTask}
        />
        <button onClick={handleClick} className="text-stone-700 hover:text-stone-950">Add Task</button>
    </div>
}