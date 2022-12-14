import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { AiFillFacebook, AiFillInstagram } from 'react-icons/ai';
import { SiGitpod } from 'react-icons/si';

export const Navbar = () => {
	const { store, actions } = useContext(Context);




	return (
		<nav className="navbar navbar navegador">
			<div className="container mb-2 mt-2">
				<div >
					<AiFillFacebook  fontSize={30} />
					<AiFillInstagram className="ms-2" fontSize={30} />
					<SiGitpod className="ms-2" fontSize={30} />
				</div>
				
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>

			</div>
		</nav>
	);
};
