import { useState, FormEvent } from "react";
import { useHistory } from "react-router";
import { FormContainer, InputField, SubmitButton } from "../../components/form";
import { userManagement } from "../../services";
import { CardContainer, CardHeader, CardBody } from "../../components/card";
import { HOME } from "../../router/routeConstants";
import { useTranslation } from "react-i18next";
import { InputFieldSize } from "../../components/form/inputField";
import { Button } from "../../components/button";
import {
  Background,
  LeftContainer,
  CenterContainer,
  HeadingContainer,
  ActionsContainer,
  RightContainer,
  SignInContainer,
  SignInHeader,
  SignInLabel,
  EmailField,
  PasswordField,
  SignInBottom,
  OuterFormContainer,
  StyledFormContainer,
} from "./signIn.styled";
import { Heading, Paragraph } from "../../components/text";
import { SignInButton } from "./signIn.styled";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";
import { EmailIcon, PasswordIcon, SignInIcon, SignUpIcon } from "../../icons";

// TODO: Getting a bad request error when trying to log in with a valid email, but wrong password.

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);

  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await userManagement
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(HOME);
      })
      .catch((error) => {
        const { signInErrorCodes } = userManagement;

        switch (error.code) {
          case signInErrorCodes.ERROR_INVALID_EMAIL:
            setErrorMessage("Ugyldig e-post");
            setIsEmailError(true);
            setIsPasswordError(false);
            break;

          case signInErrorCodes.ERROR_USER_NOT_FOUND:
            setErrorMessage("Det finnes ingen brukere med den e-posten");
            setIsEmailError(true);
            setIsPasswordError(false);
            break;

          case signInErrorCodes.ERROR_WRONG_PASSWORD:
            setErrorMessage("Feil passord");
            setIsEmailError(false);
            setIsPasswordError(true);
            break;

          default:
            setErrorMessage("Noe gikk galt");
            setIsEmailError(true);
            setIsPasswordError(true);
            break;
        }
        setPassword("");
      });
  };

  const handleEmailChange = (event: any) => setEmail(event.target.value);
  const handlePasswordChange = (event: any) => setPassword(event.target.value);

  return (
    <>
      <Background>
        <LeftContainer>
          <CenterContainer>
            <HeadingContainer>
              <Heading type={Heading.types.HEADING1}>
                {t("label_bartstua")}
              </Heading>
              <Paragraph type={Paragraph.types.PARAGRAPH1}>
                {t("label_bartstua_quote")}
              </Paragraph>
            </HeadingContainer>
            <ActionsContainer>
              <Paragraph type={Paragraph.types.PARAGRAPH1}>
                {t("label_not_registered")}
              </Paragraph>
              <SignInButton icon={SignUpIcon}>
                {t("label_register_user")}
              </SignInButton>
            </ActionsContainer>
          </CenterContainer>
        </LeftContainer>
        <RightContainer>
          <SignInContainer>
            <SignInHeader>
              <SignInLabel>
                <Heading type={Heading.types.HEADING1}>
                  {t("label_sign_in")}
                </Heading>
              </SignInLabel>
            </SignInHeader>
            <OuterFormContainer>
              <StyledFormContainer>
                <EmailField
                  ghostText="E-post"
                  icon={EmailIcon}
                  size={InputFieldSize.SMALL}
                />
                <PasswordField
                  ghostText="Passord"
                  icon={PasswordIcon}
                  size={InputFieldSize.SMALL}
                />
                <SignInButton icon={SignInIcon}>
                  {t("label_sign_in")}
                </SignInButton>
              </StyledFormContainer>
            </OuterFormContainer>
          </SignInContainer>
        </RightContainer>
      </Background>

      {/* <FormContainer onSubmit={handleSubmit}>
        <InputField
        type="email"
        value={email}
        label={t("label_email")}
        onChange={handleEmailChange}
          size={InputFieldSize.SMALL}
          errorSerious={!!errorMessage}
          errorText={isEmailError ? errorMessage : undefined}
        />

        <InputField
          type="password"
          value={password}
          label="Passord"
          onChange={handlePasswordChange}
          size={InputFieldSize.SMALL}
          errorSerious={!!errorMessage}
          errorText={isPasswordError ? errorMessage : undefined}
        />

        <SubmitButton label={t("label_sign_in")} />
      </FormContainer> */}
    </>
  );
};

export { SignIn };