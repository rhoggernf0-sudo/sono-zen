
"use client";

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Moon, 
  PlayCircle, 
  BookOpen, 
  Coffee, 
  Wind, 
  Settings, 
  LogOut, 
  LayoutDashboard, 
  Star,
  User as UserIcon,
  MessageSquare,
  MoreVertical,
  BarChart3,
  Sliders
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, useDoc, useMemoFirebase, useAuth } from "@/firebase";
import { doc } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  
  const userProfileRef = useMemoFirebase(() => user ? doc(user.auth.app.firestore(), 'user_profiles', user.uid) : null, [user]);
  const { data: profile, isLoading: isProfileLoading } = useDoc(userProfileRef);

  useEffect(() => {
    if (!isUserLoading && !isProfileLoading) {
      if (!user || !profile?.hasAccess) {
        router.push("/");
      }
    }
  }, [user, profile, isUserLoading, isProfileLoading, router]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  const menuItems = [
    { icon: <LayoutDashboard />, label: "Início", path: "/dashboard" },
    { icon: <PlayCircle />, label: "Introdução", path: "/dashboard/modules/1" },
    { icon: <Coffee />, label: "A Receita", path: "/dashboard/modules/2" },
    { icon: <Wind />, label: "Respiração", path: "/dashboard/modules/3" },
    { icon: <BookOpen />, label: "Rotina", path: "/dashboard/modules/4" },
    { icon: <Star />, label: "Dicas Extras", path: "/dashboard/modules/5" },
  ];

  if (isUserLoading || isProfileLoading) {
    return <div className="h-screen w-full flex items-center justify-center bg-background">Carregando...</div>;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background w-full text-foreground">
        <Sidebar className="border-r border-white/5 bg-card">
          <SidebarHeader className="p-6 border-b border-white/5">
            <Link href="/" className="flex items-center gap-2">
              <Moon className="text-secondary w-6 h-6" />
              <span className="font-headline font-bold text-lg tracking-tight">SONO <span className="text-secondary">ZEN</span></span>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.path}
                    className={`gap-3 py-6 px-4 rounded-xl transition-all ${pathname === item.path ? 'bg-secondary/10 text-secondary' : 'hover:bg-white/5'}`}
                  >
                    <Link href={item.path}>
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-white/5 space-y-2">
            <SidebarMenuButton className="gap-3 hover:bg-white/5">
              <Settings className="w-5 h-5" />
              <span>Configurações</span>
            </SidebarMenuButton>
            <SidebarMenuButton onClick={handleSignOut} className="gap-3 hover:bg-destructive/10 text-destructive">
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex-1 flex flex-col bg-background/50 overflow-hidden">
          <header className="h-16 flex items-center px-6 border-b border-white/5 glass justify-between shrink-0 z-10">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <h2 className="font-headline font-semibold text-lg">Área do Membro</h2>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 hover:bg-white/5 p-1 rounded-full md:rounded-xl transition-all focus:outline-none">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold">Olá, {profile?.name || 'Usuário'}</p>
                    <p className="text-[10px] text-accent uppercase font-bold tracking-widest">Acesso Premium</p>
                  </div>
                  <div className="relative h-10 w-10 rounded-full overflow-hidden ring-offset-background ring-2 ring-transparent hover:ring-secondary/50">
                    <div className="w-full h-full bg-secondary flex items-center justify-center font-bold text-white shadow-lg uppercase">
                      {(profile?.name || 'U').charAt(0)}
                    </div>
                  </div>
                  <MoreVertical className="w-5 h-5 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 glass-dark border-white/10 mt-2" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold leading-none">{profile?.name || 'Usuário'}</p>
                    <p className="text-xs leading-none text-muted-foreground">{profile?.email || 'email@exemplo.com'}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                
                <DropdownMenuItem className="focus:bg-white/10 cursor-pointer gap-2 py-3">
                  <UserIcon className="w-4 h-4 text-secondary" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Parte Pessoal</span>
                    <span className="text-[10px] text-muted-foreground">Seus dados e perfil</span>
                  </div>
                </DropdownMenuItem>
                
                <DropdownMenuItem className="focus:bg-white/10 cursor-pointer gap-2 py-3">
                  <BarChart3 className="w-4 h-4 text-accent" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Meu Progresso</span>
                    <span className="text-[10px] text-muted-foreground">Veja quanto você já evoluiu</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className="focus:bg-white/10 cursor-pointer gap-2 py-3">
                  <Sliders className="w-4 h-4 text-blue-400" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Preferências</span>
                    <span className="text-[10px] text-muted-foreground">Ajustes da plataforma</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-white/10" />
                
                <DropdownMenuItem className="focus:bg-white/10 cursor-pointer gap-2 py-3">
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Fale Conosco</span>
                    <span className="text-[10px] text-muted-foreground">Suporte especializado</span>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-white/10" />
                
                <DropdownMenuItem onClick={handleSignOut} className="focus:bg-destructive/10 text-destructive cursor-pointer gap-2 py-3">
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Sair da Conta</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="container mx-auto max-w-5xl">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
