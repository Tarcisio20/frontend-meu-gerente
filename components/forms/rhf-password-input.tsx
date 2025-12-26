"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FieldDescription } from "../ui/field";
import { Label } from "@radix-ui/react-label"; // ou "@/components/ui/label"

type Props = {
    name: string;
    label: string;
    description?: string;
} & Omit<React.ComponentProps<typeof Input>, "type">;

export function RHFPasswordInput({ name, label, description, ...props }: Props) {
    const [show, setShow] = React.useState(false);

    const {
        register,
        formState: { errors },
    } = useFormContext();

    const errorMessage = (errors as any)?.[name]?.message as string | undefined;

    return (
        <div className="space-y-1">
            <Label htmlFor={name}>{label}</Label>

            <div className="relative">
                <Input
                    id={name}
                    type={show ? "text" : "password"}
                    aria-invalid={!!errorMessage}
                    className="pr-10"
                    {...register(name)}
                    {...props}
                />

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                    onClick={() => setShow((s) => !s)}
                    tabIndex={-1}
                >
                    {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
            </div>

            {errorMessage ? (
                <FieldDescription className="text-destructive">
                    {errorMessage}
                </FieldDescription>
            ) : description ? (
                <FieldDescription>{description}</FieldDescription>
            ) : null}
        </div>
    );
}
