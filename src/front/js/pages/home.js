import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const [mensaje, setMensaje] = useState("")


	const login = () => {

		fetch(process.env.BACKEND_URL + "/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},

			body: JSON.stringify({
				"email": email,
				"password": password
			}),
		})

			.then(response => response.json())
			.then((result) => {
				if (result.token) {
					localStorage.setItem("Token", result.token)
					navigate("/demo")
				}
				else {
					setError(result.msg)
				}
			})
			.catch(error => console.log('error', error));

	}



	const enviarDatos = () => {

		fetch(process.env.BACKEND_URL + "/api/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"Bearer " + localStorage.getItem("Token"),
			},
			body: JSON.stringify({
				"email": email,
				"password": password
			}),
		})

			.then(response => response.json())
			.then((result) => {
				if (result) {
					setMensaje(result.msg)
				}
				else {
					setMensaje("Usuario ya existe")
				}
			})
			.catch(error => console.log('error', error));

	}



	return (
		<>
			{/* ------------------------------------------------CONTENEDOR SIGN UP --------------------------------------------------------------------*/}

			<form className="container row align-items-center">
				<div className="text-center col-6">
					<div class="mb-3">
						<h1 className="labelText">Sign up</h1>
						<input type="text" className="form-control mt-3" placeholder="email" onChange={(event) => setEmail(event.target.value)}></input>
					</div>
					<div class="mb-3">
						<input type="password" placeholder="password" className="form-control" onChange={(event) => setPassword(event.target.value)}></input>
					</div>

					<button type="submit" className="btn btn-success ms-3 mt-2" onClick={enviarDatos}>Send</button>

				</div>

				{mensaje &&
					<div className="text-center alert alert-danger" role="alert">
						{mensaje}
					</div>}

				<div className="col-6">
					<img src="https://images.unsplash.com/photo-1487611459768-bd414656ea10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"></img>
				</div>


				{/* ------------------------------------------------CONTENEDOR LOGIN --------------------------------------------------------------------*/}

				<div className="container row align-items-center mt-5 containerLogin">
					<div className="text-center mt-5 col-6">
						<h1>Login</h1>
						<input className="mt-3 form-control" placeholder="email" onChange={(event) => setEmail(event.target.value)}></input>
						<input type="password" placeholder="password" className="mt-3 form-control" onChange={(event) => setPassword(event.target.value)}></input>
						<button className="btn btn-success ms-3 mt-4" onClick={login}>Enter</button>
					</div>

					{error &&
						<div class="alert alert-danger" role="alert">
							{error}
						</div>}
					<div className="col-6 mt-5">
						<img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"></img>
					</div>
				</div>
			</form>
		</>
	);
};
