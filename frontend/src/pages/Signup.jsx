import React from "react";
import Form from "../components/Form/form";
import users from "../components/Form/dataForm";
import ApiManager from "../services/ApiManager";

function RegistrationForm() {
  const FormPostData = async (e) => {
    e.preventDefault();

    // Créer un objet FormData à partir de l'événement de formulaire
    const form = new FormData(e.target);
    const data = Object.fromEntries(form);

    // Déclarer 'password' et 'confirm_password' ici
    const password = "password";
    const confirmPassword = "confirm_password";

    // Vérifier si le mot de passe et la confirmation du mot de passe sont identiques
    if (data[password] !== data[confirmPassword]) {
      // Si non identiques, gérer cela ici (par exemple, afficher une erreur)
      console.error(
        "Le mot de passe et la confirmation du mot de passe ne correspondent pas."
      );
      return;
    }
    // Supprimer la clé 'confirm_password' de l'objet data avant l'envoi
    const { [confirmPassword]: _, ...dataWithoutConfirmPassword } = data;
    ApiManager.post("users", dataWithoutConfirmPassword);
  };

  return (
    <div className="background-modal">
      <div className="registration-contain">
        <Form data={users} FormPostData={FormPostData} />;
      </div>
    </div>
  );
}

export default RegistrationForm;
