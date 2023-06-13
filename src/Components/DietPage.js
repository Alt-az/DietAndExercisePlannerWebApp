import "./DietPage.css"
import ApiDataService from '../services/api.service'
import { useState,useContext,useEffect} from "react";
import ClientDataService from '../services/client.service';
import {logContext, idContext} from '../App';
import React from 'react';
import 'reactjs-popup/dist/index.css';
import { ToastContainer, toast } from 'react-toastify';
export default function DietPage(){
    const weeks = ['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const [week,setWeek] = useState(weeks);
    const [inputs, setInputs] = useState({weekday: 'Monday'});
    const [value,setValue] = useState([true]);
    const {id,setId} = useContext(idContext);
    const [meals, setMeals] = useState([]);
    const initMeals = async () => {
        const result = await ClientDataService.getFood(id);
        const resultdata = result.data;
        const input = [];
        console.log(resultdata);
        resultdata.map((res) =>{
            input.push({
                name: res.name,
                calories: res.calories,
                weight: res.weight,
                weekday: res.weekday,
                hour: res.hour,
                minute: res.minute
            });
        });
        setMeals(input);
    };

    useEffect(()=>{
        initMeals();
    },[]);
    

    const handleSend = (event) => {
        event.preventDefault();
        ClientDataService.deleteFood(id);
        meals.map((meal)=>{      
            ClientDataService.addFood(id,{
                name: meal.name,
                calories: meal.calories,
                weight: meal.weight,
                weekday: meal.weekday,
                hour: meal.hour,
                minute: meal.minute
            });
        });
    }

    const handleLoad = async (event) => {
        event.preventDefault();
        const result = await ClientDataService.getFood(id);
        const resultdata = result.data;
        const input = [];
        resultdata.map((res) =>{
            input.push({
                name: res.name,
                calories: res.calories,
                weight: res.weight,
                weekday: res.weekday,
                hour: res.hour,
                minute: res.minute
            });
        });
        setMeals(input);
        setValue(!value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if(inputs.minute<=60 && inputs.hour<=24 && inputs.minute>=0 && inputs.hour>=0){
            const api = await ApiDataService.getFood(inputs.weight,inputs.name);
            const apiResult = api.data;
            if(Object.keys(apiResult).length===0){
                console.log("info");
                toast.info('couldn\'t match any food', {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            meals.push({
                name: inputs.name,
                calories: apiResult[0].calories,
                weight: inputs.weight,
                weekday: inputs.weekday,
                hour: inputs.hour,
                minute: inputs.minute
            });
            setValue(!value);
        }
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
    const mealShow = (day) => {
        return (
            <div>
                {meals.map((meal)=>{
                    // console.log(meals);   
                    if(meal.weekday===day){
                        return (<div className="bg-info rounded-4 border border-danger mb-2 row">
                            <div className="col-9">
                                <p className="fw-bold">{meal.hour}:{meal.minute}<br/>name:{meal.name}<br/>calories:{meal.calories}cal<br/>weight:{meal.weight}g</p>
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
                                    Do you really want to delete this meal?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => {setMeals(meals.filter(a =>a!==meal))}}>Yes</button>
                                </div>
                                </div>
                            </div>
                            </div>
                            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">X</button>
                            </div>    
                        </div>
                        );
                    }
                })}
            </div>
        );
    }
    const showWeeks = (day) => {
        return(
        <div className="col-1 p-2 m-1 settings-block text-center">
        <h3>{day}</h3>
        {mealShow(day)}
    </div>);
    }

    return (
        <div>
            <h1 className="container">Diet Plan</h1>
            <ToastContainer />
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
                            <label for="weight" class="form-label">Weight (grams):</label>
                            <input type="weight" class="form-control" id="wgt" placeholder="Enter weight" name="weight" value={inputs.weight} onChange={handleChange}/>
                        </div>
                        <div class="mb-3">
                            <label for="weekday" class="form-label">Weekday:</label>
                            <select class="form-select form form-control" name="weekday" value={inputs.weekday} onChange={handleChange}>
                                {weeks.map((day)=>{return <option>{day}</option>})}
                            </select>
                        </div>
                        <div class="mb-3 row">
                            <div className="col">
                                <label for="hour" class="form-label">Hour:</label>
                                <input type="number" class="form-control" id="h" min={0} max={23} placeholder="Enter hour" name="hour" value={inputs.hour} onChange={handleChange}/>
                            </div>
                            <div className="col">
                                <label for="minute" class="form-label">minute:</label>
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
                    <div className="col-7"></div>
                    <div className="col-2">
                        <button onClick={handleLoad} class="btn btn-primary m-2">Load last saved plan</button>
                    </div>
                    <div className="col-1">
                        <button onClick={handleSend} class="btn btn-primary m-2">Save plan</button>
                    </div>
                </div>
                
            </div>
        </div>
        
    );
}