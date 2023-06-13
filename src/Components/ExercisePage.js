import "./ExercisePage.css"
import { useState,useContext,useEffect} from "react";
import ClientDataService from '../services/client.service';
import {logContext, idContext} from '../App';
import ApiDataService from '../services/api.service';
import { ToastContainer, toast } from 'react-toastify';
export default function ExercisesPage(){
    const weeks = ['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const muscles = ['abdominals','abductors','adductors','biceps','calves','chest','forearms','glutes','hamstrings','lats','lower_back','middle_back','neck','quadriceps','traps','triceps'];
    const [week,setWeek] = useState(weeks);
    const [inputs, setInputs] = useState({weekday: 'Monday',difficulty:"beginner",muscle:"biceps"});
    const [exercises, setExercises] = useState([]);
    const [value,setValue] = useState([true]);
    const {id,setId} = useContext(idContext);

    const initExercises = async () => {
        const result = await ClientDataService.getExercises(id);
        const resultdata = result.data;
        const input = [];
        resultdata.map((res) =>{
            input.push({
                name: res.name,
                muscle: res.muscle,
                difficulty: res.difficulty,
                reps: res.reps,
                sets: res.sets,
                weekday: res.weekday,
                hour: res.hour,
                minute: res.minute
            });
        });
        setExercises(input);
    };

    useEffect(()=>{
        initExercises();
    },[]);
    
    const handleSend = (event) => {
        event.preventDefault();
        ClientDataService.deleteExercises(id);
        exercises.map((exercise)=>{
            console.log(exercise);
            console.log(id);
            ClientDataService.addExercise(id,{
                name: exercise.name,
                muscle: exercise.muscle,
                difficulty: exercise.difficulty,
                reps: exercise.reps,
                sets: exercise.sets,
                weekday: exercise.weekday,
                hour: exercise.hour,
                minute: exercise.minute
            });
        });
    }

    const handleLoad = async (event) => {
        event.preventDefault();
        const result = await ClientDataService.getExercises(id);
        const resultdata = result.data;
        const input = [];
        resultdata.map((res) =>{
            input.push({
                name: res.name,
                muscle: res.muscle,
                difficulty: res.difficulty,
                reps: res.reps,
                sets: res.sets,
                weekday: res.weekday,
                hour: res.hour,
                minute: res.minute
            });
        });
        setExercises(input);
        setValue(!value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const api = await ApiDataService.getExercise(inputs.muscle,inputs.difficulty);
        const apiResult = api.data;
        if(Object.keys(apiResult).length===0){
            console.log("info");
            toast.info('Couldn\'t match any exercise', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
        exercises.push({
            name: apiResult[0].name,
            muscle: apiResult[0].muscle,
            difficulty: apiResult[0].difficulty,
            reps: inputs.reps,
            sets: inputs.sets,
            weekday: inputs.weekday,
            hour: inputs.hour,
            minute: inputs.minute
          });
          setValue(!value);
          console.log(exercises);
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    const exerciseshow = (day) => {
        return (
            <div>
                {exercises.map((exercise)=>{
                    console.log(exercise);
                    if(exercise.weekday===day){
                        return (<div className="bg-info rounded-4 border border-danger mb-2 row">
                            <div className="col-9">
                                <p className="fw-bold">{exercise.hour}:{exercise.minute}<br/>name:{exercise.name}<br/>muscle:{exercise.muscle}<br/>difficulty:{exercise.difficulty}<br/>reps:{exercise.reps}x{exercise.sets}</p>
                            </div>
                            <div className="col-1 p-2 pr-2">
                            <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Warning</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    Do you really want to delete this exercise?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => {setExercises(exercises.filter(a =>a!==exercise))}}>Yes</button>
                                </div>
                                </div>
                            </div>
                            </div>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">X</button>
                            </div>      
                        </div>);
                    }
                })}
            </div>
        );
    }
    const showWeeks = (day) => {
        return(
        <div className="col-1 p-2 m-1 settings-block text-center">
        <h3>{day}</h3>
        {exerciseshow(day)}
    </div>);
    }
    return (
        <div>
            <h1 className="container">Exercise Plan</h1>
            <ToastContainer />
            <div className="">
                <div className="row container-fluid">
                    <div className="col-2 settings-block text-center">
                    <div className="container p-5">
                    <h2>Add product</h2>
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label for="muscle" class="form-label">Muscle:</label>
                            <select class="form-select form form-control" name="muscle" value={inputs.muscle} onChange={handleChange}>
                                {muscles.map((muscle)=>{return <option>{muscle}</option>})}
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="difficulty" class="form-label">Difficulty:</label>
                            <select class="form-select form form-control" name="difficulty" value={inputs.difficulty} onChange={handleChange}>
                                <option>beginner</option>
                                <option>intermediate</option>
                                <option>expert</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="weekday" class="form-label">Weekday:</label>
                            <select class="form-select form form-control" name="weekday" value={inputs.weekday} onChange={handleChange}>
                                {weeks.map((day)=>{return <option>{day}</option>})}
                            </select>
                        </div>
                        <div class="mb-3 row">
                            <div className="col">
                                <label for="reps" class="form-label">Reps:</label>
                                <input type="number" class="form-control" id="r" min={0} placeholder="Enter reps" name="reps" value={inputs.reps} onChange={handleChange}/>
                            </div>
                            <div className="col">
                                <label for="minute" class="form-label">Sets:</label>
                                <input type="number" class="form-control" id="s" min={0} placeholder="Enter sets" name="sets" value={inputs.sets} onChange={handleChange}/>
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <div className="col">
                                <label for="hour" class="form-label">Hour:</label>
                                <input type="number" class="form-control" id="h" min={0} max={23} placeholder="Enter hour" name="hour" value={inputs.hour} onChange={handleChange}/>
                            </div>
                            <div className="col">
                                <label for="minute" class="form-label">Minute:</label>
                                <input type="number" class="form-control" id="m" min={0} max={59} placeholder="Enter minute" name="minute" value={inputs.minute} onChange={handleChange}/>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
                    </div>
                    {week.map((day)=> showWeeks(day))}
                </div>
                <div className="container-fluid row">
                    <div className="col-8"></div>
                    <div className="col-1">
                        <button onClick={handleLoad} class="btn btn-primary m-2 p-2">Load</button>
                    </div>
                    <div className="col-3">
                        <button onClick={handleSend} class="btn btn-primary m-2 p-2">Save</button>
                    </div>
                </div>               
            </div>
        </div>
    );
}