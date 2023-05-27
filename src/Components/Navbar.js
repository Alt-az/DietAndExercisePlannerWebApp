import {
  Link
} from "react-router-dom";
import { useContext, useState } from "react";
import {logContext, idContext} from '../App';
import ProfileLogo from "./ProfileLogo";
export default function Navbar() {
  const {log,setLog} = useContext(logContext);
  const logButtons =  () => {
    return (log==='unlogged')?
    <><button type="button" class="btn btn-outline-light me-2"><Link to="/login" class="text-decoration-none text-white">Login</Link></button><button type="button" class="btn btn-warning"><Link to="/register" class="text-decoration-none text-dark">Sign-up</Link></button></>:
    <ProfileLogo/>
  }
  return (
    <header class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          {/* <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg> */}
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 "><Link to="/" class="text-decoration-none text-white">Home</Link></a></li>
          <li><a href="#" class="nav-link px-2 text-white">Features</a></li>
          <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
          <li><a href="#" class="nav-link px-2 text-white">About</a></li>
        </ul>


        <div class="text-end">
            {logButtons()}
        </div>
      </div>
    </div>
  </header>
  );
}
