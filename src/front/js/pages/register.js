import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const [email, setEmail] = useState("")



    return (
        <>
        

                <div className="text-start mt-5 col-3">
                    <h1>Registro Usuario</h1>
                    <div>
                        <label>Email:  </label>
                        <input onChange={(event) => setEmail(event.target.value)}></input>
                    </div>

                    <div>
                        <label>Password:  </label>
                        <input onChange={(event) => setPassword(event.target.value)}></input>
                    </div>

                    <button onClick={login}>Enviar</button>
                </div>


        </>
    );
};