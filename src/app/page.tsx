"use client";

import Image from 'next/image';
import { 
  ChevronRight, 
  Moon, 
  Wind, 
  Leaf, 
  Zap, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  Coffee,
  Menu,
  Clock as ClockIcon,
  Activity,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState<{ min: number; sec: number } | null>(null);

  useEffect(() => {
    setTimeLeft({ min: 59, sec: 59 });
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (!prev) return null;
        if (prev.min === 0 && prev.sec === 0) {
          clearInterval(interval);
          return prev;
        }
        let nextMin = prev.min;
        let nextSec = prev.sec - 1;
        if (nextSec < 0) {
          nextMin -= 1;
          nextSec = 59;
        }
        return { min: nextMin, sec: nextSec };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: { min: number; sec: number } | null) => {
    if (!time) return "59:59";
    return `${String(time.min).padStart(2, '0')}:${String(time.sec).padStart(2, '0')}`;
  };

  const scrollToOffer = () => {
    const offerElement = document.getElementById('oferta');
    if (offerElement) {
      offerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const heroImage = PlaceHolderImages.find(img => img.id === 'chinese-method-ritual');
  const problemImage = PlaceHolderImages.find(img => img.id === 'insomnia-night-struggle');
  const capsulesImage = PlaceHolderImages.find(img => img.id === 'weight-loss-capsules');

  const menuLinks = [
    { label: "A Solução", href: "#solucao" },
    { label: "Benefícios", href: "#beneficios" },
    { label: "Depoimentos", href: "#depoimentos" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Moon className="text-secondary w-6 h-6" />
          <span className="font-headline font-bold text-xl tracking-tight">SONO <span className="text-secondary">ZEN</span></span>
        </div>
        
        <div className="hidden md:flex gap-8 items-center font-medium text-sm uppercase tracking-widest">
          {menuLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-secondary transition-colors text-white">{link.label}</a>
          ))}
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6 text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-dark border-white/10 text-white w-[300px]">
              <SheetHeader className="text-left mb-8">
                <SheetTitle className="flex items-center gap-2 text-white">
                  <Moon className="text-secondary w-5 h-5" />
                  <span className="font-headline font-bold tracking-tight text-white">SONO <span className="text-secondary">ZEN</span></span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6">
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Navegação</p>
                  {menuLinks.map((link) => (
                    <a key={link.href} href={link.href} className="block text-lg font-medium hover:text-secondary transition-colors py-2 border-b border-white/5 text-white">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full -z-10 opacity-30">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-secondary blur-[150px] rounded-full"></div>
          <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-primary blur-[150px] rounded-full"></div>
        </div>
        
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-xs font-semibold tracking-wider uppercase text-secondary">
              <Leaf className="w-3 h-3" /> Método 100% Natural
            </div>
            <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight text-white">
              Durma mais rápido com um <span className="text-secondary">simples ritual</span> chinês
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
              Chá SONO ZEN + técnica milenar de 5 minutos para relaxar corpo e mente. Recupere suas noites de sono profundo naturalmente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToOffer}
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg rounded-full w-full"
              >
                QUERO MEU SONO DE VOLTA <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-secondary/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"></div>
            {heroImage && (
              <Image 
                src={heroImage.imageUrl} 
                alt="Ritual Chinês Sono Zen" 
                width={800} 
                height={600} 
                className="relative rounded-2xl shadow-2xl glass-dark border border-white/5 object-cover"
                data-ai-hint={heroImage.imageHint}
              />
            )}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problema" className="py-20 px-6 bg-card/30">
        <div className="container mx-auto max-w-4xl text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">Você se sente exausto, mas não consegue dormir?</h2>
            <p className="text-muted-foreground text-lg">A insônia não é apenas sobre estar acordado à noite. É sobre como ela destrói o seu dia.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Wind className="text-secondary w-8 h-8" />, title: "Mente Acelerada", desc: "Pensamentos que não param quando você encosta a cabeça no travesseiro." },
              { icon: <Zap className="text-secondary w-8 h-8" />, title: "Cansaço Extremo", desc: "Acordar mais cansado do que quando foi dormir, sem energia para o dia." },
              { icon: <ShieldCheck className="text-accent w-8 h-8" />, title: "Saúde em Risco", desc: "O estresse e a falta de sono afetam sua imunidade e humor." }
            ].map((item, idx) => (
              <Card key={idx} className="glass-dark border-white/5">
                <CardContent className="p-8 space-y-4">
                  <div className="bg-primary/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-headline font-semibold text-xl text-white">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solucao" className="py-20 px-6 relative overflow-hidden">
        <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative">
            {problemImage && (
              <Image 
                src={problemImage.imageUrl} 
                alt="Problemas de insônia" 
                width={800} 
                height={600} 
                className="rounded-2xl glass-dark border border-white/5 object-cover"
                data-ai-hint={problemImage.imageHint}
              />
            )}
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <CheckCircle2 className="text-white w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-white">Eficácia Comprovada</p>
                  <p className="text-xs text-muted-foreground">Resultados em 7 dias</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-3xl md:text-5xl font-headline font-bold leading-tight text-white">Conheça o Chá <span className="text-secondary">SONO ZEN</span></h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Não é apenas um chá. É um ecossistema de relaxamento. Combinamos a sabedoria milenar chinesa com uma técnica de respiração que "desliga" seu estresse.
            </p>
            <ul className="space-y-4 text-white">
              {[
                "Ingredientes 100% naturais e fáceis de encontrar",
                "Técnica de relaxamento guiada em vídeo",
                "Guia de higiene do sono para resultados permanentes",
                "Fórmula exclusiva de blend relaxante"
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-accent w-5 h-5 flex-shrink-0" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-20 px-6 bg-gradient-to-b from-background to-primary/10">
        <div className="container mx-auto text-center space-y-16">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-white">O que você ganha ao dominar o ritual?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Moon />, title: "Sono Rápido", desc: "Pegue no sono em menos de 15 minutos." },
              { icon: <Leaf />, title: "100% Natural", desc: "Sem efeitos colaterais ou remédios químicos." },
              { icon: <Wind />, title: "Menos Ansiedade", desc: "Acalme sua mente antes de deitar." },
              { icon: <Coffee />, title: "Acordar Disposto", desc: "Sinta energia logo no primeiro minuto do dia." }
            ].map((item, i) => (
              <div key={i} className="space-y-4 p-4 text-white">
                <div className="text-secondary w-12 h-12 mx-auto">{item.icon}</div>
                <h3 className="font-headline font-bold text-lg">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-20 px-6 bg-card/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-headline font-bold text-center mb-16 text-white">Histórias de quem já transformou suas noites</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Mariana S.", role: "Empresária", text: "Eu não dormia sem remédios há 3 anos. Com o Sono Zen, na primeira semana já consegui dormir naturalmente. É libertador!", image: PlaceHolderImages.find(img => img.id === 'testimonial-1')?.imageUrl },
              { name: "Ricardo F.", role: "Programador", text: "Minha cabeça não parava à noite. A técnica de respiração junto com o chá foi o que faltava para eu 'apagar'. Acordo muito mais focado.", image: PlaceHolderImages.find(img => img.id === 'testimonial-2')?.imageUrl },
              { name: "Cláudia M.", role: "Mãe", text: "Ritual simples e muito eficaz. Me sinto muito mais calma e disposta para cuidar da minha família. Recomendo para todos!", image: PlaceHolderImages.find(img => img.id === 'testimonial-3')?.imageUrl }
            ].map((item, i) => (
              <Card key={i} className="glass-dark border-white/5 p-8 space-y-6">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                </div>
                <p className="italic text-muted-foreground">"{item.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted overflow-hidden">
                    {item.image && <Image src={item.image} alt={item.name} width={48} height={48} className="object-cover h-full w-full" />}
                  </div>
                  <div>
                    <p className="font-bold text-white">{item.name}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section id="oferta" className="py-24 px-6 bg-gradient-to-t from-primary/20 to-background">
        <div className="container mx-auto max-w-lg text-center">
          <div className="glass-dark p-12 rounded-[2.5rem] border border-secondary/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 bg-secondary text-white text-xs font-bold uppercase rotate-12 translate-x-4 -translate-y-2">Digital</div>
            
            <h2 className="text-2xl font-headline font-bold mb-4 text-white">Oferta Exclusiva</h2>
            <p className="text-muted-foreground mb-4 text-sm italic">Método completo + Receitas + Técnicas</p>
            
            <div className="mb-6 flex flex-col items-center gap-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive/10 text-destructive border border-destructive/20 animate-pulse">
                <ClockIcon className="w-4 h-4" />
                <span className="text-sm font-bold uppercase tracking-tighter">{formatTime(timeLeft)}</span>
              </div>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">A oferta acaba em instantes!</p>
            </div>

            <div className="space-y-2 mb-10">
              <span className="text-muted-foreground line-through text-lg">R$ 97,00</span>
              <div className="text-6xl font-headline font-black text-secondary">R$ 9,90</div>
              <p className="text-xs text-muted-foreground">Pagamento único. Acesso vitalício.</p>
            </div>
            
            <Button 
              className="w-full bg-secondary hover:bg-secondary/90 text-lg py-8 rounded-2xl mb-6 shadow-[0_0_20px_rgba(108,64,181,0.3)] transition-all hover:shadow-[0_0_30px_rgba(108,64,181,0.5)]"
            >
              QUERO MEU SONO DE VOLTA <ChevronRight className="ml-2" />
            </Button>
            
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4" /> 7 dias de garantia incondicional
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Product Section */}
      <section className="py-16 px-6 bg-card/20 border-t border-white/5">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="bg-accent/10 text-accent text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-4">Combo Recomendado</div>
            <h2 className="text-3xl md:text-5xl font-headline font-bold text-white max-w-3xl">Potencialize sua saúde com o <span className="text-accent">DETOX PLUS 2-EM-1</span></h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl">A solução completa para quem busca emagrecer naturalmente e eliminar dores crônicas ou lombares que impedem o descanso.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center bg-gradient-to-br from-white/5 to-transparent p-6 md:p-10 rounded-[3rem] border border-white/5">
            <div className="relative group mb-4 md:mb-0">
              <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity"></div>
              {capsulesImage && (
                <Image 
                  src={capsulesImage.imageUrl} 
                  alt="Cápsulas Detox Plus" 
                  width={600} 
                  height={400} 
                  className="relative rounded-[2rem] shadow-2xl object-cover"
                  data-ai-hint={capsulesImage.imageHint}
                />
              )}
              <div className="absolute top-6 right-6 bg-accent text-white px-3 py-2 rounded-xl shadow-xl font-bold text-[10px] md:text-xs z-10 border border-white/20 uppercase tracking-widest">
                60 CÁPSULAS
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-accent/5 rounded-3xl border border-accent/10">
                <div className="flex flex-col items-center md:items-start gap-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 animate-pulse">
                    <ClockIcon className="w-3 h-3" />
                    <span className="text-xs font-bold uppercase tracking-tighter">Expira em: {formatTime(timeLeft)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <span className="text-xs text-muted-foreground line-through">De R$ 147,90</span>
                      <p className="text-3xl font-black text-white">Por R$ 43,90</p>
                    </div>
                    <div className="text-right hidden sm:block">
                      <span className="text-[10px] text-accent font-bold uppercase tracking-widest block">Pagamento Único</span>
                      <span className="text-xs text-muted-foreground font-bold">Pote com 60 cápsulas</span>
                    </div>
                  </div>

                  <Button className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-6 rounded-xl group text-sm">
                    ADICIONAR CÁPSULAS AO PEDIDO <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {[
                  { icon: <Zap className="text-accent w-5 h-5" />, title: "Queima Ativa", desc: "Acelera o metabolismo no repouso." },
                  { icon: <Activity className="text-accent w-5 h-5" />, title: "Alívio Lombar", desc: "Ação anti-inflamatória natural." },
                  { icon: <Leaf className="text-accent w-5 h-5" />, title: "100% Orgânico", desc: "Sem efeitos colaterais químicos." }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="bg-accent/10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{feature.title}</h4>
                      <p className="text-muted-foreground text-xs">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-headline font-bold text-center mb-12 text-white">Dúvidas Frequentes</h2>
          <Accordion type="single" collapsible className="w-full text-white">
            <AccordionItem value="item-1">
              <AccordionTrigger>Funciona mesmo para quem tem insônia crônica?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Sim. O método atua no sistema nervoso, ajudando a regular os ciclos de relaxamento do corpo. Muitas pessoas com anos de dificuldade relatam melhoras na primeira semana.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>As cápsulas ajudam mesmo nas dores lombares?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Sim. Nossa fórmula contém ativos anti-inflamatórios naturais que ajudam a reduzir a rigidez matinal e as dores crônicas que costumam piorar à noite.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Quanto tempo leva o ritual?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                O preparo do chá leva cerca de 5 minutos, e a técnica de relaxamento também leva 5 minutos. No total, 10 minutos de dedicação para uma noite inteira de sono.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-card/20">
        <div className="container mx-auto text-center space-y-8">
          <div className="flex items-center justify-center gap-2">
            <Moon className="text-secondary w-6 h-6" />
            <span className="font-headline font-bold text-xl tracking-tight text-white">SONO <span className="text-secondary">ZEN</span></span>
          </div>
          <div className="max-w-2xl mx-auto text-[10px] text-muted-foreground leading-relaxed">
            AVISO LEGAL: Este produto não substitui orientação médica profissional. Resultados podem variar de pessoa para pessoa. Sempre consulte seu médico antes de iniciar novos hábitos alimentares ou de relaxamento se você possui condições pré-existentes ou usa medicação.
          </div>
          <div className="text-sm text-muted-foreground border-t border-white/5 pt-8">
            &copy; 2024 SONO ZEN. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
