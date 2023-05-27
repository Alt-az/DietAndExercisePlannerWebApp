import { useContext, useState } from "react";
import {logContext, idContext} from '../App';
import ClientDataService from '../services/client.service';
export default function Settings(){
    const [inputs, setInputs] = useState({});
    const {id,setId} = useContext(idContext);
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(id);
        console.log(inputs);
        await ClientDataService.update(id,{
            height: inputs.height,
            weight: inputs.weight,
            password: inputs.password
        });
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
    return(<div>
        <div className="container p-5">
            <h1>Settings</h1>
            <form onSubmit={handleSubmit}>
            <div class="mb-3 mt-3">
                <label for="height" class="form-label">Height:</label>
                <input type="height" class="form-control" id="hgt" placeholder="Enter height" name="height" value={inputs.height} onChange={handleChange}/>
            </div>
            <div class="mb-3">
                <label for="weight" class="form-label">Weight:</label>
                <input type="weight" class="form-control" id="wgt" placeholder="Enter weight" name="weight" value={inputs.weight} onChange={handleChange}/>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="password" value={inputs.password} onChange={handleChange}/>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
            </form>
        </div>
    </div>
    );

}