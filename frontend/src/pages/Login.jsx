import React from "react";
import Form from "../components/Form/form";
import { FetchLogin } from "../services/ApiController";
import ApiManager from "../services/ApiManager";

function Login() {
  const userLogin = {
    email: {
      value: "Adresse email",
      type: "email",
      option: "required",
    },
    password: {
      value: "Mot de passe",
      type: "password",
      option: "required",
    },
  };
  const token = ApiManager.getToken();
  const FormPostData = async (e) => {
    e.preventDefault();
    // Créer un objet FormData à partir de l'événement de formulaire
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);
    FetchLogin(data);
  };
  return (
    <div>{!token && <Form data={userLogin} FormPostData={FormPostData} />}</div>
  );
}

export default Login;
