
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, Clock, BookOpen, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  const modules = [
    { id: 1, title: "Introdução ao Método", desc: "Entenda por que você não dorme e como vamos resolver isso.", lessons: 3, duration: "15 min", color: "from-blue-500/20 to-blue-600/20" },
    { id: 2, title: "A Receita do Chá", desc: "Passo a passo do blend de ervas e o preparo ideal.", lessons: 2, duration: "10 min", color: "from-green-500/20 to-green-600/20" },
    { id: 3, title: "Técnica de Respiração", desc: "A técnica de 5 minutos que acalma seu cérebro.", lessons: 1, duration: "8 min", color: "from-purple-500/20 to-purple-600/20" },
    { id: 4, title: "Sua Nova Rotina", desc: "Otimize seu ambiente e hábitos pré-sono.", lessons: 4, duration: "25 min", color: "from-indigo-500/20 to-indigo-600/20" },
    { id: 5, title: "Dicas Extras & FAQ", desc: "Suplementação natural e dúvidas comuns.", lessons: 5, duration: "20 min", color: "from-secondary/20 to-secondary/30" }
  ];

  return (
    <div className="space-y-10">
      <section className="relative h-64 md:h-80 rounded-[2rem] overflow-hidden glass-dark border border-white/5 flex items-center px-10">
        <div className="absolute top-0 right-0 w-1/2 h-full -z-10 bg-gradient-to-l from-secondary/30 to-transparent"></div>
        <div className="space-y-4 max-w-xl">
          <div className="bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full w-fit uppercase tracking-widest">Novo Conteúdo</div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold">Continue sua jornada</h1>
          <p className="text-muted-foreground text-sm md:text-base">Você completou 15% do curso. Vamos para o próximo passo hoje?</p>
          <Button className="bg-secondary hover:bg-secondary/90 rounded-full gap-2">
            <PlayCircle className="w-5 h-5" /> Continuar Assistindo
          </Button>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-headline font-bold">Módulos do Curso</h2>
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">5 Módulos no Total</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => (
            <Link key={m.id} href={`/dashboard/modules/${m.id}`}>
              <Card className={`group relative h-full glass-dark border-white/5 hover:border-secondary/50 transition-all duration-300 overflow-hidden cursor-pointer bg-gradient-to-br ${m.color}`}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="bg-white/10 w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all">
                      <PlayCircle className="w-5 h-5" />
                    </div>
                    {m.id === 1 && <CheckCircle2 className="text-accent w-5 h-5" />}
                  </div>
                  <CardTitle className="text-lg font-headline">{m.title}</CardTitle>
                  <CardDescription className="text-xs line-clamp-2">{m.desc}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> {m.lessons} Aulas
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {m.duration}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-8">
        <div className="glass-dark border-white/5 p-8 rounded-3xl flex flex-col md:flex-row gap-8 items-center bg-accent/5">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h3 className="text-xl font-headline font-bold">Precisa de Ajuda?</h3>
            <p className="text-sm text-muted-foreground">Nossa equipe de suporte está pronta para tirar suas dúvidas sobre o preparo do chá ou as técnicas de respiração.</p>
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white rounded-xl">Falar com Suporte</Button>
          </div>
          <div className="w-32 h-32 relative bg-accent/20 rounded-full flex items-center justify-center p-4">
             <div className="absolute inset-0 border-4 border-accent border-dashed rounded-full animate-spin [animation-duration:10s]"></div>
             <Leaf className="w-16 h-16 text-accent" />
          </div>
        </div>
      </section>
    </div>
  );
}
