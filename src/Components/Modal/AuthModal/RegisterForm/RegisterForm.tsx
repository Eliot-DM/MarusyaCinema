import { Secondary } from "../../../Button/Secondary/Secondary";
import { InputAccount } from "../../../Input/InputAccount/InputAccount";
import styles from "./RegisterForm.module.css";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginUser, registerUser } from "../../../../Api/auth";
import { queryClient } from "../../../../Api/QueryClient";
import { useDispatch } from "react-redux";
import { formRegisterEnd } from "../../../../store/AuthModalFormSlice";

const CreateRegisterSchemas = z
  .object({
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
    surname: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
  });

type CreateRegisterForm = z.infer<typeof CreateRegisterSchemas>;

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const LoginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const RegisterMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (_, variables) => {
      LoginMutation.mutate({
        email: variables.email,
        password: variables.password,
      });
      dispatch(formRegisterEnd());
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRegisterForm>({
    resolver: zodResolver(CreateRegisterSchemas),
  });

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(({ email, password, name, surname }) => {
        RegisterMutation.mutate({ email, password, name, surname });
      })}
    >
      <p className={styles.title}>Регистрация</p>
      <InputAccount
        error={errors.email?.message}
        placeholder={"Электронная почта"}
        icon={"email"}
        {...register("email")}
      />
      <InputAccount
        error={errors.name?.message}
        placeholder={"Имя"}
        icon={"user"}
        {...register("name")}
      />
      <InputAccount
        error={errors.surname?.message}
        placeholder={"Фамилия"}
        icon={"user"}
        {...register("surname")}
      />
      <InputAccount
        error={errors.password?.message}
        placeholder={"Пароль"}
        icon={"password"}
        {...register("password")}
      />
      <InputAccount
        placeholder={"Подтвердите пароль"}
        icon={"password"}
        error={errors.password?.message}
        {...register("confirmPassword")}
      />
      <p>{errors.confirmPassword?.message}</p>
      <Secondary type="submit" text={"Создать аккаунт"} />
    </form>
  );
};
