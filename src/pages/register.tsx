import { useState, FormEvent } from "react";
import { FormContainer, InputField, SubmitButton } from "../components/form";
import { userManagement } from "../services";
import { CardContainer, CardHeader, CardBody } from "../components/card";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useCallback } from "react";

// TODO: Getting a Bad Request console error when creating user, look into it.

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConf, setPasswordConf] = useState<string>("");

  const { t } = useTranslation();

  const [errorEmail, setErrorEmail] = useState<undefined | string>();
  const [errorPassword1, setErrorPassword1] = useState<undefined | string>();
  const [errorPassword2, setErrorPassword2] = useState<undefined | string>();
  const [serious, setSerious] = useState<boolean>(false);

  const resetFieldErrors = () => {
    setErrorEmail(undefined);
    setErrorPassword1(undefined);
    setErrorPassword2(undefined);
  };

  const checkPasswordFields = useCallback(() => {
    if (password !== passwordConf) {
      setErrorPassword2("Passordet stemmer ikke med bekreftelses passordet");

      return true;
    } else {
      setErrorPassword2(undefined);
      return false;
    }
  }, [password, passwordConf]);

  useEffect(() => {
    checkPasswordFields();
  }, [checkPasswordFields]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    resetFieldErrors();

    setSerious(true);

    if (!checkPasswordFields()) return;

    await userManagement
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        const {
          ERROR_EMAIL_ALREADY_USED,
          ERROR_EMAIL_NOT_VALID,
          ERROR_UNKNOWN,
          ERROR_WEAK_PASSWORD,
        } = userManagement.createUserErrorCodes;

        switch (error.code) {
          case ERROR_EMAIL_ALREADY_USED:
            setErrorEmail("E-posten er allerede i bruk");
            setEmail("");
            break;
          case ERROR_EMAIL_NOT_VALID:
            setErrorEmail("E-posten er ikke gyldig");
            setEmail("");
            break;
          case ERROR_WEAK_PASSWORD:
            setErrorPassword1("Passordet er for svakt");
            setPassword("");
            setPasswordConf("");
            break;
          case ERROR_UNKNOWN:
            setErrorEmail("");
            setErrorPassword1("");
            setErrorPassword2("Noe gikk galt");
            setEmail("");
            setPassword("");
            setPasswordConf("");
            break;
        }
      });
  };

  return (
    <>
      <CardContainer>
        <CardHeader title={t("label_register")} />
        <CardBody>
          <FormContainer onSubmit={handleSubmit}>
            <InputField
              label={t("label_email")}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              errorSerious={serious}
              errorText={errorEmail}
            />
            <InputField
              label={t("label_password")}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              errorSerious={serious}
              errorText={errorPassword1}
            />
            <InputField
              label={t("label_confirm_password")}
              type="password"
              value={passwordConf}
              onChange={(event) => setPasswordConf(event.target.value)}
              errorSerious={serious}
              errorText={errorPassword2}
            />
            <SubmitButton label={t("label_register_user")} />
          </FormContainer>
        </CardBody>
      </CardContainer>
    </>
  );
};

export { Register };
