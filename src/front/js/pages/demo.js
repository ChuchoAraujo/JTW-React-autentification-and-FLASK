import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiFillFacebook } from 'react-icons/ai';

import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	const logOut = () => {
		localStorage.removeItem("Token")
		navigate("/")
	}



	useEffect(() => {
		fetch(process.env.BACKEND_URL + "/api/private", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"Bearer " + localStorage.getItem("Token"),
			},
		})
			.then(response => response.json())
			.then((result) => {
				if (!result.correcto) {
					navigate("/")
				}
					
			})
			.catch(error => console.log('error', error));
	}, [])

	return (
		<div className="container mt-5">
			<div className="text-center">
				<h1>Bienvenido! Esto es la zona privada</h1>
				<img 
				className="me-5"
				width={200}
				src="https://images.unsplash.com/photo-1592769606534-fe78d27bf450?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"></img>
				<button className="btn btn-success mt-5" onClick={logOut}>logout</button>
				
			</div>
		</div>
	);
};
