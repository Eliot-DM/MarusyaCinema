import z from "zod";
import { Secondary } from "../../../Button/Secondary/Secondary";
import { InputAccount } from "../../../Input/InputAccount/InputAccount";
import styles from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../../../Api/auth";
import type { SuccessfulResult } from "../../../../Api/schemas";
import { queryClient } from "../../../../Api/QueryClient";
import { useDispatch } from "react-redux";
import { formNull } from "../../../../store/AuthModalFormSlice";
import { authExit } from "../../../../store/AuthModalSlice";

const CreateRegisterSchemas = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(5),
});

type CreateRegisterForm = z.infer<typeof CreateRegisterSchemas>;

export const LoginForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateRegisterForm>({
    resolver: zodResolver(CreateRegisterSchemas),
  });

  const LoginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: SuccessfulResult) => {
      if (data.result) {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        dispatch(formNull());
        dispatch(authExit());
      }
    },
  });

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(({ email, password }) => {
        LoginMutation.mutate({ email, password });
      })}
    >
      <InputAccount
        error={errors.email?.message}
        placeholder={"Электронная почта"}
        icon={"email"}
        {...register("email")}
      />
      <InputAccount
        error={errors.password?.message}
        placeholder={"Пароль"}
        icon={"password"}
        {...register("password")}
      />

      <Secondary text={"Войти"} disabled={!isValid} />
    </form>
  );
};
