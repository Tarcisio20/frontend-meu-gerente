"use client"

import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { FieldDescription } from "../ui/field";
import { useFormContext } from "react-hook-form";

type Props = {
    name: string;
    label: string;
    description?: string;
} & React.ComponentProps<typeof Input>;

export function RHFInput({ name, label, description, ...props }: Props) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const errorMessage = (errors as any)?.[name]?.message as string | undefined;

    return (
        <div className="space-y-1">
            <Label htmlFor={name}>{label}</Label>

            <Input
                id={name}
                aria-invalid={!!errorMessage}
                {...register(name)}
                {...props}
            />

            {errorMessage ? (
                <FieldDescription className="text-destructive  font-red-500">
                    {errorMessage}
                </FieldDescription>
            ) : description ? (
                <FieldDescription>{description}</FieldDescription>
            ) : null}
        </div>
    );
}