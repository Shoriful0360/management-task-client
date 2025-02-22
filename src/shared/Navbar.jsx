import { Link } from "react-router";
import logo from "../assets/DALL·E 2025-02-20 19.37.18 - A modern and sleek logo for 'TaskPilot', a task management application. The design should incorporate a stylized checkmark and an airplane or pilot th.webp"
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";


const Navbar = () => {
    const{user,logOut}=useContext(AuthContext)
   console.log(user)
    return (
        <div className="navbar bg-gradient-to-l from-[#5C8BCE] to-[#E18167]  px-10 shadow-sm">
        <div className="flex-1">
            <img src={logo} alt="logo" className="w-20 h-20 rounded-full"  />

        </div>
        <div className="flex gap-2">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          {
            user? <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                
              <div className="w-10 rounded-full">
          
                <img
                  alt="Tailwind CSS Navbar component"
            
                  src="https://img.icons8.com/?size=50&id=7819&format=png" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <p onClick={logOut}> logout</p>
              {/* <li><a onClick={logOut()}>Logout</a></li> */}
            </ul>
          </div>
          :
          <Link to={'/login'}>  <button className="btn">LogIn</button></Link>
          }
     
         
        </div>
      </div>
    );
};

export default Navbar;