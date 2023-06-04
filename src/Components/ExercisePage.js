import "./ExercisePage.css"
import { useState,useContext} from "react";
import ClientDataService from '../services/client.service';
import {logContext, idContext} from '../App';
export default function ExercisesPage(){
    const weeks = ['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const [week,setWeek] = useState(weeks);
    const [inputs, setInputs] = useState({});
    const [exercises, setExercises] = useState([]);
    const [value,setValue] = useState([true]);
    const {id,setId} = useContext(idContext);
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
        exercises.push({
            name: inputs.name,
            muscle: inputs.muscle,
            difficulty: inputs.difficulty,
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
                                <p className="fw-bold">{exercise.hour}:{exercise.minute}<br/>name:{exercise.name}<br/>muscle:{exercise.muscle}<br/>difficulty:{exercise.difficulty}</p>
                            </div>
                            <div className="col-1 p-2 pr-2">
                                <button  onClick={() => {
                                setExercises(
                                    exercises.filter(a =>
                                    a!==exercise
                                    )
                                );
                                }}>
                                X
                                </button>
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
            <div className="">
                <div className="row container-fluid">
                    <div className="col-2 settings-block text-center">
                    <div className="container p-5">
                    <h2>Add product</h2>
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3 mt-3">
                            <label for="name" class="form-label">Name:</label>
                            <input type="name" class="form-control" id="nm" placeholder="Enter name" name="name" value={inputs.name} onChange={handleChange}/>
                        </div>
                        <div class="mb-3">
                            <label for="muscle" class="form-label">muscle:</label>
                            <input type="muscle" class="form-control" id="clr" placeholder="Enter muscle" name="muscle" value={inputs.muscle} onChange={handleChange}/>
                        </div>
                        <div class="mb-3">
                            <label for="difficulty" class="form-label">Difficulty:</label>
                            <input type="difficulty" class="form-control" id="wgt" placeholder="Enter difficulty" name="difficulty" value={inputs.difficulty} onChange={handleChange}/>
                        </div>
                        <div class="mb-3">
                            <label for="weekday" class="form-label">Weekday:</label>
                            <input type="weekday" class="form-control" id="wd" placeholder="Enter weekday" name="weekday" value={inputs.weekday} onChange={handleChange}/>
                        </div>
                        <div class="mb-3 row">
                            <div className="col">
                                <label for="hour" class="form-label">Hour:</label>
                                <input type="hour" class="form-control" id="h" placeholder="Enter hour" name="hour" value={inputs.hour} onChange={handleChange}/>
                            </div>
                            <div className="col">
                                <label for="minute" class="form-label">Minute:</label>
                                <input type="minute" class="form-control" id="m" placeholder="Enter minute" name="minute" value={inputs.minute} onChange={handleChange}/>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">Save</button>
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