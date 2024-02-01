/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Input from "./input";

function Form({ data, FormPostData, isAuth, action, route, isAdmin }) {
  return (
    <div>
      <form className="df-column" onSubmit={FormPostData}>
        {Object.keys(data).map((fieldName) =>
          data[fieldName].type !== "select" ? (
            <Input
              key={fieldName}
              name={fieldName}
              type={data[fieldName].type}
              placeholder={data[fieldName].value}
              required={data[fieldName].option === "required"}
              isAuth={isAuth}
              route={route}
              isAdmin={isAdmin}
            />
          ) : (
            <p>select</p>
            // <Select
            //   key={fieldName}
            //   entry={fieldName}
            //   name={data[fieldName].value}
            //   objet={data[fieldName].option}
            // />
          )
        )}
        {action && (
          <Link className="login-link-password" to="/sinscire">
            Mot de passe oublié?
          </Link>
        )}
        <button className="signin-btn-submit" type="submit">
          Se Connecter
        </button>

        <Link className="login-link-signup" to="/signup">
          S'inscrire
        </Link>
      </form>
    </div>
  );
}

export default Form;

const dataShape = PropTypes.shape({
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  option: PropTypes.arrayOf,
});
Form.defaultProps = {
  isAuth: false,
  action: false,
  route: null,
};
Form.propTypes = {
  route: PropTypes.string,
  data: PropTypes.objectOf(dataShape).isRequired,
  FormPostData: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
  action: PropTypes.bool,
};
