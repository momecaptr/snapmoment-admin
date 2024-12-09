"use client"
import { useForm } from 'react-hook-form';
import { useCustomToast } from '@/shared/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import {useRouter} from "next/navigation";
import {useLoginAdminMutation} from "@/graphql/mutations/loginAdmin.generated";
import {signInAdminSchema, type SignInAdminSchemaType} from "@/shared/schemas";

export const useSignInForm = () => {
  const {
    control,
    formState: { isValid },
    handleSubmit
  } = useForm<SignInAdminSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(signInAdminSchema)
  });

  const router = useRouter()
  const [login, { error, loading }] = useLoginAdminMutation();
  const { showToast } = useCustomToast(); // TODO: Поменять на другое??? Не работает
  let temp: string;

  const onSubmit = async (data: SignInAdminSchemaType) => {
    // REFETCH QUERIES НАДО??? -- позволяет выполнить другие запросы сразу после выполнения этого запроса; также позволяет создать параметры для context-а -- а мы помним, что нужно указывать authorization
    try {
      await login({
        variables: {
          email: data.email,
          password: data.password,
        },
        onCompleted: (res) => {
          if (res.loginAdmin.logged === true) {
            try {
              const temp = btoa(`${data.email}:${data.password}`);
              if (typeof window !== "undefined") {
                localStorage.setItem("accessKey", temp);
              }
              showToast({ message: "Login success", type: "success" });
              router.push("/users-list");
            } catch (err) {
              console.error("Failed to save accessKey to localStorage:", err);
            }
          } else {
            localStorage.removeItem("accessKey"); // Очистка данных
            showToast({ message: "Wrong password or username", type: "error" });
          }
        },
        onError: (e) => {
          console.error(e);
          showToast({
            message: `Something bad happened, ${e.message}. Try again later`,
            type: "error",
          });
        },
      });
    } catch (e) {
      console.error("Unexpected error:", e);
      showToast({
        message: `Unexpected error occurred. Try again later.`,
        type: "error",
      });
    }
  };

  return {
    control,
    handleSubmit,
    isLoading: loading,
    isValid,
    onSubmit
  };
};
