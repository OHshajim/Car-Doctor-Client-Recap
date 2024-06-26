import { GrGoogle } from 'react-icons/gr';
import login from '../assets/login/login.svg'
import { FaFacebook } from 'react-icons/fa';
import { RiLinkedinFill } from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
const Login = () => {
    const { Login } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()

    const handleLogin = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        Login(email, password)
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    title: "Welcome",
                    text: "Successfully logged in",
                    icon: "success",
                    confirmButtonText: 'ok'
                });

                navigate(location?.state ? location?.state : '/')

            })
            .catch(error => {
                console.log(error)
                Swal.fire({
                    title: "Failed",
                    text: "try again",
                    icon: "error",
                    confirmButtonText: 'ok'
                });

            })
    }
    return (
        <div>
            <div className="hero">
                <div className="hero-content flex-col  w-full lg:flex-row items-center">
                    <div className=" lg:text-left w-full lg:w-1/2 flex justify-center">
                        <img src={login} alt="" />
                    </div>
                    <div className="card shrink-0 w-full lg:w-1/2 shadow-2xl border border-[rgb(208, 208, 208)] p-10">
                        <form className="card-body" onSubmit={handleLogin}>
                            <h1 className="text-3xl text-center font-bold">Login</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name='password' className="input input-bordered" required />

                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <p className='text-center'>or Sign in With </p>
                        <div className='flex justify-center gap-3 mt-5 '>
                            <button className='btn btn-circle '><GrGoogle /></button>
                            <button className='btn btn-circle '><RiLinkedinFill /></button>
                            <button className='btn btn-circle '><FaFacebook /></button>
                        </div>
                        <label className="label my-5">
                            <p className="text-center w-full ">Have an account? <span className='text-orange-600 font-bold'><Link to='/signUp'>Sign In</Link></span></p >
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;