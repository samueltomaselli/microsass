"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "./actions";
import { useState } from "react";

export default function LoginForm() {
  const [error, setError] = useState<string>("");
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await login(formData);
    if (response?.error) {
      setError(response.error);
    } else {
      setError("");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm ">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Entre com seu nome e senha.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Nome</Label>
              <Input className="h-10" id="username" name="username" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full">Entrar</Button>
            {error && <div className="text-red-500 text-sm font-light">{error}</div>}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
