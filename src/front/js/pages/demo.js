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
		var myHeaders = new Headers();
		myHeaders.append("Authorization",
		"Bearer " + localStorage.getItem("Token"));

		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
			redirect: 'follow'
		};

		fetch("https://3001-chuchoarauj-jwtauthenti-vqe7wqm4dhi.ws-eu78.gitpod.io/api/private", requestOptions)
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
				<button onClick={logOut}>logout</button>
				
			</div>
		</div>
	);
};
