import {Link
} from "react-router-dom";
import {logContext, idContext} from '../App';
import { useContext, useState } from "react";
export default function ProfileLogo() {
  const {log,setLog} = useContext(logContext);
  const {id,setId} = useContext(idContext);
  const logout = (event) => {
    event.preventDefault();
    setId('');
    setLog('unlogged');
  }
  return (
  <div class="dropdown">
      <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
        My profile
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#"><Link to="/settings" class="text-decoration-none text-dark">Settings</Link></a></li>
        <li><a class="dropdown-item" href="#"><Link to="/diet" class="text-decoration-none text-dark">My diet plan</Link></a></li>
        <li><a class="dropdown-item" href="#"><Link to="/exercise" class="text-decoration-none text-dark">My training plan</Link></a></li>
        <li><a class="dropdown-item" href="#"><Link to="/stats" class="text-decoration-none text-dark">My statistics</Link></a></li>
        <li><a class="dropdown-item" href="#" onClick={logout}><Link to="/" class="text-decoration-none text-dark">Logout</Link></a></li>
      </ul>
  </div>
  );
}
  