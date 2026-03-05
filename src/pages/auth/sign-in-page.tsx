import React from "react";
import { useAppSelector } from "@/hooks/app-hooks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";

import { signInFormSchema } from "@/schemas/auth-schema";
import { authActions } from "@/store/auth/auth";
import { verifyToken } from "@/utils/verify-token";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Loader, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { accessToken, user, phase, error } = useAppSelector(
    (state) => state.auth,
  );

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof signInFormSchema>) => {
    dispatch(authActions.login(data.email, data.password, "ipaddress"));
  };

  React.useEffect(() => {
    if (accessToken && user && phase === "success") {
      if (verifyToken(accessToken)) {
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      }
    }
  }, [accessToken, user, phase]);

  React.useEffect(() => {
    if (phase === "error") {
      toast.error(error);
      dispatch(authActions.setPhase(null, null));
    }
  }, [phase]);

  return (
    <div className="flex w-full h-full px-4 justify-center items-center pt-4">
      <div className="bg-card text-card-foreground border-none shadow-none max-w-md w-full h-min">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Card className="shadow-none border-none">
              <CardHeader className="p-2 md:p-4 text-center">
                <CardTitle className="text-xl">
                  Sign in to your account
                </CardTitle>
                <CardDescription>
                  Enter your email and password to sign in to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2 p-2 md:p-4">
                <div className="grid w-full items-center">
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-email-input">
                          Email Address
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-email-input"
                          aria-invalid={fieldState.invalid}
                          className="h-11"
                          disabled={phase === "loading" ? true : false}
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
                          disabled={phase === "loading" ? true : false}
                          placeholder="Enter your password"
                          autoComplete="off"
                          type="password"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>
                <div className="w-full text-right">
                  <p className="text-sm">
                    <span
                      onClick={() => navigate("/forget-password")}
                      className="text-primary cursor-pointer"
                    >
                      Forget Password?
                    </span>
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-5 p-2 md:p-4">
                <Button
                  size="lg"
                  disabled={phase === "loading" ? true : false}
                  className="w-full"
                >
                  {phase === "loading" ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <LogIn className="mr-2 h-4 w-4" />
                  )}

                  {phase === "loading" ? "Signing in..." : "Sign In"}
                </Button>

                <div className="w-full text-center">
                  <p className="text-sm">
                    <span className="text-muted-foreground">
                      Dont have an account?{" "}
                    </span>
                    &nbsp;
                    <span
                      onClick={() => navigate("/sign-up")}
                      className="text-primary cursor-pointer"
                    >
                      Sign Up
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

export default SignInPage;
