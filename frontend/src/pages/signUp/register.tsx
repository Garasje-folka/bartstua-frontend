import { useState, FormEvent } from "react";
<<<<<<< HEAD:frontend/src/pages/signUp/register.tsx
import { InputField, SubmitButton, FormContainer } from "../../components/form";
=======
import { FormContainer, InputField, SubmitButton } from "../../components/form";
>>>>>>> c554304... design of register page:frontend/src/pages/register.tsx
import { userManagement } from "../../services";
import { CardContainer, CardHeader, CardBody } from "../../components/card";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useCallback } from "react";
import {
  ActionsContainer,
  Background,
  CenterContainer,
  EmailField,
  HeadingContainer,
<<<<<<< HEAD:frontend/src/pages/signUp/register.tsx
  IconInputContainer,
  LeftContainer,
  PasswordField,
  RightContainer,
  SignInButton,
  SignUpContainer,
  SignUpHeader,
  SignUpLabel,
  SignUpButton,
  StyledFormContainer,
  OuterFormContainer,
} from "../signUp/signUp.styled";
import { Heading } from "../../components/text";
import Feedback from "react-bootstrap/esm/Feedback";
import { right } from "@popperjs/core";
import { EmailIcon, PasswordIcon } from "../../icons";
import { InputFieldSize } from "../../components/form/inputField";
=======
  LeftContainer,
  PasswordField,
  RightContainer,
  SignInBottom,
  SignInContainer,
  SignInHeader,
  SignInLabel,
} from "../signIn/signIn.styled";
import { Heading } from "../../components/text";
import { SignInButton } from "../../components/header/header.styled";
>>>>>>> c554304... design of register page:frontend/src/pages/register.tsx

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
      setErrorPassword2(t("text_passwords_not_matching"));

      return false;
    } else {
      setErrorPassword2(undefined);
      return true;
    }
  }, [password, passwordConf, t]);

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
            setErrorEmail(t("text_email_already_used"));
            setEmail("");
            break;
          case ERROR_EMAIL_NOT_VALID:
            setErrorEmail(t("text_email_not_valid"));
            setEmail("");
            break;
          case ERROR_WEAK_PASSWORD:
            setErrorPassword1(t("text_password_too_weak"));
            setPassword("");
            setPasswordConf("");
            break;
          case ERROR_UNKNOWN:
            setErrorEmail("");
            setErrorPassword1("");
            setErrorPassword2(t("text_something_went_wrong"));
            setEmail("");
            setPassword("");
            setPasswordConf("");
            break;
        }
      });
  };

  return (
    <Background>
      <LeftContainer>
        <CenterContainer>
          <HeadingContainer>
            <Heading type={Heading.types.HEADING1}>
              {t("label_bartstua")}
            </Heading>
            <Heading type={Heading.types.HEADING3}>
              {t("label_bartstua_quote")}
            </Heading>
          </HeadingContainer>
          <ActionsContainer>
            <SignInButton>{t("label_sign_in")}</SignInButton>
          </ActionsContainer>
        </CenterContainer>
      </LeftContainer>
      <RightContainer>
<<<<<<< HEAD:frontend/src/pages/signUp/register.tsx
        <SignUpContainer>
          <SignUpHeader>
            <SignUpLabel>
              <Heading type={Heading.types.HEADING1}>
                {t("label_register_user")}
              </Heading>
            </SignUpLabel>
          </SignUpHeader>
          <OuterFormContainer>
            <StyledFormContainer onSubmit={() => {}}>
              <EmailField
                ghostText={t("label_email")}
                icon={EmailIcon}
                size={InputFieldSize.SMALL}
              />
              <PasswordField
                ghostText={t("label_password")}
                icon={PasswordIcon}
                size={InputFieldSize.SMALL}
              />
              <PasswordField
                ghostText={t("label_repeat_password")}
                icon={PasswordIcon}
                size={InputFieldSize.SMALL}
              />
              <SignUpButton label={t("label_register_user")} />
            </StyledFormContainer>
          </OuterFormContainer>
        </SignUpContainer>
=======
        <SignInContainer>
          <SignInHeader>
            <SignInLabel>
              <Heading type={Heading.types.HEADING1}>
                {t("label_register_user")}
              </Heading>
            </SignInLabel>
          </SignInHeader>
          <EmailField ghostText="E-post" />
          <PasswordField ghostText="Passord" />
          <PasswordField ghostText="Passord på nytt" />
          <SignInBottom>
            <SignInButton>{t("label_register_user")}</SignInButton>
          </SignInBottom>
        </SignInContainer>
>>>>>>> c554304... design of register page:frontend/src/pages/register.tsx
      </RightContainer>
    </Background>

    /*<>
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
      
    </>*/
  );
};

export { Register };
