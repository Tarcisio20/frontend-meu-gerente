import { toast } from "sonner";

export const notify = {
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    info: (message: string) => toast(message),

    // ✅ toast persistente (para processos longos)
    loading: (message: string) => toast(message, { duration: Infinity }),

    // ✅ atualizar um toast existente (por id)
    updateSuccess: (id: string | number, message: string) =>
        toast.success(message, { id }),

    updateError: (id: string | number, message: string) =>
        toast.error(message, { id }),

    dismiss: (id?: string | number) => toast.dismiss(id),

    // ✅ padrão ouro pra promessas (requests)
    promise: <T>(
        promise: Promise<T>,
        msgs: { loading: string; success: string; error: string }
    ) =>
        toast.promise(promise, {
            loading: msgs.loading,
            success: msgs.success,
            error: msgs.error,
        }),
};
