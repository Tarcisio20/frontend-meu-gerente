"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";

import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RHFInput } from "./rhf-input";

export const registerSchema = z
    .object({
        first_name: z.string().min(1, "Informe seu primeiro nome."),
        last_name: z.string().min(1, "Informe seu sobrenome."),
        email: z
            .string()
            .min(1, "Informe seu email")
            .email("Informe um email válido."),
        password: z.string().min(4, "A senha precisa ter no mínimo 4 caracteres."),
        confirmPassword: z
            .string()
            .min(4, "A senha precisa ter no mínimo 4 caracteres."),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas precisam ser iguais.",
        path: ["confirmPassword"],
    });

export type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const methods = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onSubmit", // pode trocar pra "onBlur" se quiser validar ao sair do campo
    });

    const { handleSubmit, formState } = methods;

    async function onSubmit(values: RegisterFormData) {
        // aqui você faz o envio pro backend
        console.log("dados:", values);
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Crie sua conta!</CardTitle>
                    <CardDescription>
                        Entre com os seus dados para efetuar o seu cadastro e a começar a
                        controlar as suas finanças!
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FieldGroup>
                                <RHFInput
                                    name="first_name"
                                    label="Primeiro Nome"
                                    placeholder="John"
                                    autoComplete="given-name"
                                />

                                <RHFInput
                                    name="last_name"
                                    label="Sobrenome"
                                    placeholder="Doe"
                                    autoComplete="family-name"
                                />

                                <RHFInput
                                    name="email"
                                    label="Email"
                                    type="email"
                                    placeholder="m@example.com"
                                    autoComplete="email"
                                />

                                <Field>
                                    <div className="grid grid-cols-2 gap-4">
                                        <RHFInput
                                            name="password"
                                            label="Senha"
                                            type="password"
                                            autoComplete="new-password"
                                        />

                                        <RHFInput
                                            name="confirmPassword"
                                            label="Confirme sua Senha"
                                            type="password"
                                            autoComplete="new-password"
                                        />
                                    </div>

                                    <FieldDescription>
                                        A senha precisa conter no mínimo 4 caracteres.
                                    </FieldDescription>
                                </Field>

                                <Field>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={formState.isSubmitting}
                                    >
                                        {formState.isSubmitting ? "Criando..." : "Crie sua conta"}
                                    </Button>

                                    <FieldDescription className="text-center">
                                        Já tem conta? <a className="underline" href="#">Faça login</a>
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        </form>
                    </FormProvider>
                </CardContent>
            </Card>

            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <a className="underline" href="#">Terms of Service</a>{" "}
                and <a className="underline" href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    );
}
