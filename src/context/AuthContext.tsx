import { createContext, ReactNode, useContext, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import { isString } from "../utils/text";
import { fetchData } from "../services/axios";
import { InputFocusEvent } from "../models/types";
import { useLocalStorage } from "../custom-hooks/useLocalStorage";
import { IFormState, InputBaseProps, Messages } from "../models/interfaces";
import usePath from "../custom-hooks/usePath";

type AuthProviderProps = {
  children: ReactNode;
};

export type AuthUser = null | string;

export enum LoginPage {
  Login = "login",
  EmailVerify = "email-verify",
  ConfirmOtp = "confirm-otp",
  ResetPassword = "reset-password",
}

export enum RegisterPage {
  Register = "register",
  ConfirmOtp = "confirm-otp",
}

interface IAuthContext {
  user: AuthUser;
  loginPage: LoginPage;
  verificationEmail: AuthUser;
  handleFormValidate: <T extends object>(
    InputsArray: Array<InputBaseProps<T>>,
    authValues: T,
    sanitizeFn: (
      key: keyof IFormState<T>,
      value: Partial<Record<keyof T, string>>
    ) => void
  ) => boolean;
  handleOnFocusEvent: <T extends object>(
    e: InputFocusEvent,
    formValues: IFormState<T>,
    sanitizeFn: (value: IFormState<T>) => void
  ) => void;
  updateData: <T>(
    params: AxiosRequestConfig,
    formValues: IFormState<T>,
    messages: Messages,
    setFormState: (value: IFormState<T>) => void
  ) => Promise<unknown>;
  navigateToHome: (uesr?: AuthUser) => void;
  handleLoginPage: (page: LoginPage, email?: AuthUser) => void;
  logout: () => void;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();

  const [user, setUser] = useLocalStorage<AuthUser>("user", null);
  const [loginPage, setLoginPage] = useState<LoginPage>(LoginPage.Login);
  const [verificationEmail, setVerificationEmail] = useLocalStorage<AuthUser>(
    "verify-email",
    null
  );

  const { getFindPath } = usePath();

  const authPath = ["register", "login"];

  const handleFormValidate = <T extends object>(
    InputsArray: Array<InputBaseProps<T>>,
    authValues: T,
    sanitizeFn: (
      key: keyof IFormState<T>,
      value: Partial<Record<keyof T, string>>
    ) => void
  ): boolean => {
    let newError = {} as Partial<Record<keyof T, string>>;
    let isValid: boolean = true;
    InputsArray.forEach((input: InputBaseProps<T>) => {
      if (input.validation && input.validation.length) {
        input.validation.forEach((vRule) => {
          const errorMessage = vRule!.rule(
            authValues[input.name],
            input.label,
            vRule!.args
          );
          if (errorMessage.length) {
            newError[input.name] = errorMessage;
            isValid = false;
          }
        });
      }
    });
    sanitizeFn("errors", newError);
    return isValid;
  };

  const handleOnFocusEvent = <T extends object>(
    e: InputFocusEvent,
    formValues: IFormState<T>,
    sanitizeFn: (value: IFormState<T>) => void
  ): void => {
    e.preventDefault();
    sanitizeFn(formValues);
  };

  async function updateData<T extends object>(
    params: AxiosRequestConfig,
    formValues: IFormState<T>,
    messages: Messages,
    setFormState: (value: IFormState<T>) => void
  ) {
    setFormState({ ...formValues, isButtonLoading: true });
    try {
      const response = await fetchData(params);
      console.log("response", response);
      setFormState({
        ...formValues,
        helperText: messages.success,
        submitSuccess: true,
        isButtonLoading: false,
      });
      return response;
    } catch (error: any) {
      console.log("error", error);
      setFormState({
        ...formValues,
        helperText: isString(error?.message) ? error?.message : messages.error,
        submitSuccess: false,
        isButtonLoading: false,
      });
      return null;
    }
  }

  const navigateToHome = (authUser?: AuthUser) => {
    if (authUser) {
      setUser(authUser);
    }
    setVerificationEmail(null);

    if (authPath.includes(getFindPath())) {
      navigate("/");
    }
  };

  const handleLoginPage = (page: LoginPage, email?: AuthUser) => {
    if (email !== undefined) {
      setVerificationEmail(email);
    }
    setLoginPage(page);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginPage,
        verificationEmail,
        logout,
        updateData,
        handleLoginPage,
        handleFormValidate,
        handleOnFocusEvent,
        navigateToHome,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
