import { useAuth } from "@/features/auth/hooks/useAuth";
import { useAppSelector } from "@/app/hooks/redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { selectAuthError } from "@/features/auth/slice";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "../schema";

export default function LoginForm() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const error = useAppSelector(selectAuthError);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { remember: false },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await login(data.email, data.password, data.remember).unwrap();
      navigate("/");
    } catch {
    }
  };

  return (
    <div className="min-h-dvh w-full flex sm:items-center sm:justify-center">
      <Card className="flex flex-col w-full max-w-xl shadow-lg rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-1 flex-col">
          <CardHeader className="text-center p-4 sm:p-6">
            <img
              src="/assets/logo.png"
              alt="DuckFeed"
              className="mx-auto h-[clamp(4rem,10vh,7rem)] w-auto"
            />
            <p className="mt-4 text-[clamp(0.9rem,2vw,1.1rem)] font-semibold">
              Hey, Enter your details to sign in to your account
            </p>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col justify-center gap-6 px-6 sm:px-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-bold">
                Email
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter Email"
                {...register("email")}
                className="h-12 text-base"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-bold">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                {...register("password")}
                className="h-12 text-base"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Controller
                  name="remember"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      id="remember"
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="remember" className="text-sm">Remember me</Label>
              </div>
              <a
                href="/forgot-password"
                className="text-sm font-medium text-black hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Server error */}
            {error && (
              <ul className="text-red-500 text-sm space-y-1">
                {error.split(",").map((msg, i) => (
                  <li key={i}>{msg.trim()}</li>
                ))}
              </ul>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4 p-6 sm:p-4">
            <Button
              type="submit"
              className="w-full h-12 text-base font-bold"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>

            <div className="flex items-center w-full my-2">
              <div className="h-px flex-grow bg-gray-300"></div>
              <span className="mx-2 text-sm font-medium text-gray-600">
                Don’t have an account?
              </span>
              <div className="h-px flex-grow bg-gray-300"></div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-base font-bold"
              onClick={() => navigate("/register")}
            >
              Create an account
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
