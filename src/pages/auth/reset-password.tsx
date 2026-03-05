import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { CircleCheck, Loader, RefreshCcw } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/app-hooks";
import { forgotPasswordActions } from "@/store/auth/forgot-password-store";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { phase: forgotPasswordPhase, error: forgotPasswordError } =
    useAppSelector((state) => state.forgotPassword);

  let password = "";

  const resetPasswordFormSchema = z.object({
    token: z.string(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .refine((value) => {
        password = value;
        return true;
      }),
    confirmPassword: z
      .string()
      .min(6, { message: "You must confirm your password" })
      .refine((value) => value === password, "Passwords do not match"),
  });

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      token: token,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitForm = (data: z.infer<typeof resetPasswordFormSchema>) => {
    dispatch(forgotPasswordActions.resetPassword(data.password, data.token));
  };

  React.useEffect(() => {
    if (forgotPasswordPhase === "reset-password-error") {
      toast.error(forgotPasswordError);
      dispatch(forgotPasswordActions.setPhase(null, null));
    } else if (forgotPasswordPhase === "reset-password-success") {
      toast.success("Password updated!");
      setTimeout(() => {
        navigate("/sign-in");
        dispatch(forgotPasswordActions.setPhase(null, null));
      }, 3000);
    }
  }, [forgotPasswordPhase]);

  return (
    <div className="flex w-full h-full px-4 justify-center items-center pt-4">
      <div className="bg-card text-card-foreground border-none shadow-none max-w-md w-full h-min">
        <h1>token : {token}</h1>
        {!token ? (
          <div className="w-full flex flex-col gap-3 text-center">
            <span className="text-center text-lg">Token not found!</span>
            <div className="w-full text-center">
              <p className="text-sm">
                <span className="text-muted-foreground">Back to</span>
                &nbsp;
                <span
                  onClick={() => navigate("/sign-in")}
                  className="text-primary cursor-pointer"
                >
                  sign in
                </span>
              </p>
            </div>
          </div>
        ) : forgotPasswordPhase === "reset-password-success" ? (
          <div className="flex flex-col items-center justify-center text-center gap-3">
            <CircleCheck className="size-6" />
            <span>Your password has been changed</span>
            <span>You are directed to the sign in page...</span>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmitForm)}>
            <FieldGroup>
              <Card className="shadow-none border-none">
                <CardHeader className="p-2 md:p-4 text-center">
                  <CardTitle className="text-xl">Reset Password</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2 p-2 md:p-4">
                  <div className="grid w-full items-center">
                    <Controller
                      name="password"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-password-input">
                            Password
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-password-input"
                            aria-invalid={fieldState.invalid}
                            className="h-11"
                            disabled={
                              forgotPasswordPhase === "reset-password-loading"
                            }
                            placeholder="Password"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                  <div className="grid w-full items-center">
                    <Controller
                      name="confirmPassword"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-confirmPassword-input">
                            Confirm Password
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-confirmPassword-input"
                            aria-invalid={fieldState.invalid}
                            className="h-11"
                            disabled={
                              forgotPasswordPhase === "reset-password-loading"
                            }
                            placeholder="Confirm Password"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-5 p-2 md:p-4">
                  <Button
                    size="lg"
                    disabled={forgotPasswordPhase === "reset-password-loading"}
                    className="w-full"
                  >
                    {forgotPasswordPhase === "reset-password-loading" ? (
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCcw className="mr-2 h-4 w-4" />
                    )}

                    {forgotPasswordPhase === "reset-password-loading"
                      ? "Processing"
                      : "Reset"}
                  </Button>

                  <div className="w-full text-center">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Back to</span>
                      &nbsp;
                      <span
                        onClick={() => navigate("/sign-in")}
                        className="text-primary cursor-pointer"
                      >
                        sign in
                      </span>
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </FieldGroup>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
