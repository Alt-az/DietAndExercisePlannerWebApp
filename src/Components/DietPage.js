import "./DietPage.css"
import ApiDataService from '../services/api.service'
import { useState,useContext,useEffect} from "react";
import ClientDataService from '../services/client.service';
import {logContext, idContext} from '../App';
export default function DietPage(){
    const weeks = ['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const [week,setWeek] = useState(weeks);
    const [inputs, setInputs] = useState({});
    
    const [value,setValue] = useState([true]);
    const {id,setId} = useContext(idContext);
    const [meals, setMeals] = useState([]);
    const initMeals = async () => {
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
        const api = await ApiDataService.getFood(inputs.weight,inputs.name);
        const apiResult = api.data;
        console.log(apiResult[0].calories);
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
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
    const mealShow = (day) => {
        return (
            <div>
                {meals.map((meal)=>{
                    if(meal.weekday===day){
                        return (<div className="bg-info rounded-4 border border-danger mb-2 row">
                            <div className="col-9">
                                <p className="fw-bold">{meal.hour}:{meal.minute}<br/>name:{meal.name}<br/>calories:{meal.calories}<br/>weight:{meal.weight}</p>
                            </div>
                            <div className="col-1 p-2 pr-2">
                                <button  onClick={() => {
                                setMeals(
                                    meals.filter(a =>
                                    a!==meal
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
        {mealShow(day)}
    </div>);
    }
    
    return (
        <div>
            <h1 className="container">Diet Plan</h1>
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
                            <label for="weight" class="form-label">Weight:</label>
                            <input type="weight" class="form-control" id="wgt" placeholder="Enter weight" name="weight" value={inputs.weight} onChange={handleChange}/>
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
                                <label for="minute" class="form-label">minute:</label>
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