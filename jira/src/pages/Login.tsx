import React from 'react'
import './scss/Login.scss'
// import { withFormik } from 'formik'
import { useForm, SubmitHandler } from 'react-hook-form'
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserJira } from '../services/managerUser.services';
import { RootState, useAppDispatch } from '../store';
import { signIn } from '../store/managerUser.service/thunkAction';
import { useSelector } from 'react-redux';


const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<getUserJira>({ mode: "onChange" })

  const navigate = useNavigate()
  const appDispatch = useAppDispatch()
  const { isLoadingSignIn } = useSelector((state: RootState) => state.managerUser)
  if (isLoadingSignIn) {
    return (
      <div className="h-screen grid content-center">
        <div className='boxLoading flex justify-center'>
          <svg className="gegga">
            <defs>
              <filter id="gegga">
                <feGaussianBlur in="SourceGraphic" stdDeviation={7} result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10" result="inreGegga" />
                <feComposite in="SourceGraphic" in2="inreGegga" operator="atop" />
              </filter>
            </defs>
          </svg>
          <svg className="snurra" width={200} height={200} viewBox="0 0 200 200">
            <defs>
              <linearGradient id="linjärGradient">
                <stop className="stopp1" offset={0} />
                <stop className="stopp2" offset={1} />
              </linearGradient>
              <linearGradient y2={160} x2={160} y1={40} x1={40} gradientUnits="userSpaceOnUse" id="gradient" xlinkHref="#linjärGradient" />
            </defs>
            <path className="halvan" d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64" />
            <circle className="strecken" cx={100} cy={100} r={64} />
          </svg>

        </div>

      </div>
    );
  }
  return (
    <div className='bg-gray-300 h-screen grid content-center'>
      <div className='flex justify-center  '>
        <form className="form_main" onSubmit={handleSubmit(async (value) => {
          await appDispatch(signIn(value))
          navigate("/")
        })}>
          <p className="heading">Login</p>
          <div className="inputContainer">
            <svg viewBox="0 0 16 16" fill="#2e2e2e" height={16} width={16} xmlns="http://www.w3.org/2000/svg" className="inputIcon">
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
            </svg>
            <input placeholder="email" className="inputField" type="text"
              {...register("email", {
                required: "Vui lòng nhập mail !",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Vui lòng nhập đúng email",
                },
              })} />
          </div>
          {errors && errors.email && <p className="text-[13px] text-red-500">{errors.email.message}</p>}
          <div className="inputContainer">
            <svg viewBox="0 0 16 16" fill="#2e2e2e" height={16} width={16} xmlns="http://www.w3.org/2000/svg" className="inputIcon">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
            <input placeholder="Password" className="inputField" type="password"
              {...register("passWord", {
                required: "Vui lòng nhập password !",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/,
                  message: "Vui lòng nhập đúng mật khẩu",
                },
              })} />
          </div>
          {errors && errors.passWord && <p className="text-[13px] text-red-500">{errors.passWord.message}</p>}
          <button id="button">Sign In</button>
          <div className="signupContainer">
            <div className="mt-12 text-sm font-display font-semibold text-black text-center">
              Don't have an account ? <a className="cursor-pointer" onClick={() => {
                navigate("/register")
              }}>Sign up</a>
            </div>
          </div>
        </form>

      </div>


    </div>
  )
}

export default Login