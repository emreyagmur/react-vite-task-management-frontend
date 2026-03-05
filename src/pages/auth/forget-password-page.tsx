import React from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { Loader, SendHorizonal } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/app-hooks";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { forgotPasswordActions } from "@/store/auth/forgot-password-store";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { phase: forgotPasswordPhase, error: forgotPasswordError } =
    useAppSelector((state) => state.forgotPassword);

  const forgotPasswordSchema = z.object({
    email: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .min(2, {
        message: "Email is required",
      }),
  });

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmitForm = (data: z.infer<typeof forgotPasswordSchema>) => {
    dispatch(forgotPasswordActions.sendLink(data.email));
  };

  React.useEffect(() => {
    if (forgotPasswordPhase === "forgot-password-error") {
      toast.error(forgotPasswordError);
      dispatch(forgotPasswordActions.setPhase(null, null));
    } else if (forgotPasswordPhase === "forgot-password-success") {
      toast.success("Reset link sent!");
      dispatch(forgotPasswordActions.setPhase(null, null));
    }
  }, [forgotPasswordPhase]);

  return (
    <div className="flex w-full h-full px-4 justify-center items-center pt-4">
      <div className="bg-card text-card-foreground border-none shadow-none max-w-md w-full h-min">
        <form onSubmit={form.handleSubmit(onSubmitForm)}>
          <FieldGroup>
            <Card className="shadow-none border-none">
              <CardHeader className="p-2 md:p-4 text-center">
                <CardTitle className="text-xl">Trouble logging in?</CardTitle>
                <CardDescription>
                  Enter your email and we'll send you a link to get back into
                  your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2 p-2 md:p-4">
                <div className="grid w-full items-center">
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="forget-password-email-input">
                          Email Address
                        </FieldLabel>
                        <Input
                          {...field}
                          id="forget-password-email-input"
                          aria-invalid={fieldState.invalid}
                          className="h-11"
                          disabled={
                            forgotPasswordPhase === "forgot-password-loading"
                          }
                          placeholder="name@example.com"
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
                  disabled={forgotPasswordPhase === "forgot-password-loading"}
                  className="w-full"
                >
                  {forgotPasswordPhase === "forgot-password-loading" ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <SendHorizonal className="mr-2 h-4 w-4" />
                  )}

                  {forgotPasswordPhase === "forgot-password-loading"
                    ? "Processing..."
                    : "Send reset link"}
                </Button>

                <div className="w-full text-center">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Back to</span>
                    &nbsp;
                    <span
                      onClick={() => navigate("/sign-in")}
                      className="text-primary cursor-pointer"
                    >
                      Sign in
                    </span>
                  </p>
                </div>
              </CardFooter>
            </Card>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
