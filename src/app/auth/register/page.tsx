
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Moon, Mail, Lock, User, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useAuth, useFirestore } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const db = useFirestore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Create user profile with access (simulating payment completion)
      await setDoc(doc(db, "user_profiles", user.uid), {
        id: user.uid,
        name: formData.name,
        email: formData.email,
        hasAccess: true, // We give access immediately for this prototype/MVP
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      toast({
        title: "Sucesso!",
        description: "Sua conta foi criada e seu acesso foi liberado.",
      });

      router.push("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: error.message || "Não foi possível criar sua conta.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-secondary blur-[100px] rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[300px] h-[300px] bg-accent blur-[100px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <Moon className="text-secondary w-8 h-8" />
            <span className="font-headline font-bold text-2xl tracking-tight">SONO <span className="text-secondary">ZEN</span></span>
          </Link>
          <h1 className="text-3xl font-headline font-bold">Crie sua conta</h1>
          <p className="text-muted-foreground">Inicie sua jornada rumo ao descanso profundo</p>
        </div>

        <Card className="glass-dark border-white/5 shadow-2xl">
          <CardHeader className="space-y-1 text-center border-b border-white/5 mb-4">
            <div className="bg-secondary/20 text-secondary text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full mx-auto w-fit mb-2">
              Acesso por R$ 9,90
            </div>
            <CardTitle className="text-xl">Informações de Acesso</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="name" 
                    placeholder="Seu nome" 
                    className="pl-10 glass-dark border-white/10" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="exemplo@email.com" 
                    className="pl-10 glass-dark border-white/10" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Crie uma Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Mínimo 6 caracteres" 
                    className="pl-10 glass-dark border-white/10" 
                    required 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90" disabled={loading}>
                {loading ? "Criando conta..." : "Liberar Meu Acesso"}
              </Button>
              <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                <CheckCircle2 className="w-3 h-3 text-accent" /> Acesso imediato após o cadastro
              </div>
              <p className="text-sm text-center text-muted-foreground mt-2">
                Já possui conta?{" "}
                <Link href="/auth/login" className="text-secondary font-semibold hover:underline">
                  Faça login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
