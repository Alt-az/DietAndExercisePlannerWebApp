
import {logContext, idContext} from '../App';
import { useContext, useState } from "react";
import "../services/client.service";
import ClientDataService from '../services/client.service';
import { useNavigate } from 'react-router-dom';
export default function Login(){
  const {log,setLog} = useContext(logContext);
  const {id,setId} = useContext(idContext);
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [p,setP] = useState('unlogged');
  const navigate = useNavigate();
  const getData = async () => {
    return (await ClientDataService.findByEmail(email)).data;
  }
  const logIn = async (e) => {
    e.preventDefault();
    try{
    if(ClientDataService.findByEmail(email)!=null){
      const response = await getData();
      setId(response[0].id);
      setLog('logged');
    }
    }finally{
      setEmail('');
      setPassword('');
      navigate('/')
    }
  }
    return (
        <div>
            <div class="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5" tabindex="-1" role="dialog" id="modalSignin">
  <div class="modal-dialog" role="document">
    <div class="modal-content rounded-4 shadow">
      <div class="modal-header p-5 pb-4 border-bottom-0">
        <h1 class="fw-bold mb-0 fs-2">Login</h1>
      </div>

      <div class="modal-body p-5 pt-0">
        <form class="" onSubmit={logIn}>
          <div class="form-floating mb-3">
            <input type="email" class="form-control rounded-3" id="floatingInput" placeholder="name@example.com" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control rounded-3" id="floatingPassword" placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            <label for="floatingPassword">Password</label>
          </div>
          <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Login</button>
          <small class="text-body-secondary">By clicking Login, you agree to the terms of use.</small>
          <hr class="my-4"/>
        </form>
      </div>
    </div>
  </div>
</div>
        </div>
    );
}