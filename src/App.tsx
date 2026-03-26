/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Baby, 
  ClipboardList, 
  Smartphone, 
  ShieldCheck, 
  Zap, 
  Heart, 
  Clock, 
  LayoutDashboard,
  Stethoscope,
  ShoppingBag,
  MessageCircleQuestion,
  Star,
  Moon,
  Leaf,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  primary?: boolean;
  key?: React.Key;
  onClick?: () => void;
}

const Button = ({ children, className = "", primary = false, onClick }: ButtonProps) => (
  <button onClick={onClick} className={`px-8 py-4 rounded-full font-bold transition-all duration-500 transform hover:scale-[1.02] active:scale-95 shadow-premium ${
    primary 
      ? "bg-brand-accent text-white hover:bg-brand-accent-light shadow-brand-accent/25 btn-pulse" 
      : "glass text-brand-text border border-brand-lavender-dark hover:bg-brand-lavender/80 shadow-card"
  } ${className}`}>
    {children}
  </button>
);

interface CardProps {
  children: React.ReactNode;
  className?: string;
  key?: React.Key;
}

const Card = ({ children, className = "" }: CardProps) => (
  <div className={`glass p-8 rounded-[2.5rem] shadow-premium border border-brand-lavender/60 transition-all duration-500 hover:shadow-premium hover:border-brand-accent/30 ${className}`}>
    {children}
  </div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-brand-lavender/40 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
      >
        <span className={`text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-brand-accent' : 'text-brand-text group-hover:text-brand-accent-light'}`}>{question}</span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-brand-accent text-white rotate-180 shadow-premium' : 'bg-brand-lavender/50 text-brand-accent'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-brand-text-muted leading-relaxed text-[15px] font-medium">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Decorative Background ---
const DecorativeBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <Heart className="decorative-icon top-[10%] left-[5%] w-14 h-14 rotate-12 opacity-[0.03]" />
    <Star className="decorative-icon top-[15%] right-[10%] w-12 h-12 -rotate-12 opacity-[0.03]" />
    <Baby className="decorative-icon top-[40%] left-[8%] w-16 h-16 rotate-6 opacity-[0.04]" />
    <Moon className="decorative-icon top-[60%] right-[12%] w-14 h-14 -rotate-6 opacity-[0.03]" />
    <Leaf className="decorative-icon top-[80%] left-[15%] w-14 h-14 rotate-45 opacity-[0.04]" />
    <Calendar className="decorative-icon top-[25%] right-[20%] w-12 h-12 opacity-[0.02]" />
    <div className="absolute top-[20%] right-[30%] w-64 h-64 bg-brand-accent/5 rounded-full blur-[120px]" />
    <div className="absolute bottom-[20%] left-[20%] w-80 h-80 bg-brand-accent/5 rounded-full blur-[150px]" />
  </div>
);

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-accent/30 selection:text-brand-text">
      {/* 1. HERO SECTION */}
      <header className="relative pt-10 pb-16 px-6 overflow-hidden">
        <DecorativeBackground />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-brand-accent rounded-2xl flex items-center justify-center shadow-premium shadow-brand-accent/20">
                <Heart className="text-white w-6 h-6" fill="currentColor" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-brand-text font-display">Gravidez Organizada</span>
            </motion.div>
          </div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-brand-text leading-[1.1] mb-6 max-w-5xl mx-auto text-balance tracking-tight"
          >
            Veja em que fase sua gravidez está, como o bebê está se desenvolvendo e quais são os <span className="text-brand-accent">próximos passos importantes</span>.
          </motion.h1>

          {/* Mockup Principal */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ 
              opacity: 1, 
              y: [0, -15, 0],
            }}
            transition={{ 
              opacity: { duration: 0.8 },
              y: { 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }
            }}
            className="relative max-w-[280px] md:max-w-[320px] mx-auto mb-10"
          >
            <div className="relative z-10 rounded-[3.5rem] border-[10px] border-brand-text overflow-hidden shadow-premium">
              <img 
                src="https://picsum.photos/seed/pregnancy-app-v4/800/1600" 
                alt="App Dashboard" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative Glows */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-accent/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-accent/10 rounded-full blur-[100px] -z-10" />
          </motion.div>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-brand-text-muted mb-8 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Acompanhe sua gravidez semana a semana, organize exames e consultas e tenha tudo o que importa em um só lugar, do positivo ao parto.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <Button primary className="text-lg px-12 py-5" onClick={() => document.getElementById('preco')?.scrollIntoView({ behavior: 'smooth' })}>QUERO ACOMPANHAR MINHA GRAVIDEZ AGORA</Button>

            {/* Reforços rápidos */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6">
              {["Acesso imediato", "Funciona no celular", "Do positivo ao parto"].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-brand-text-muted font-bold">
                  <CheckCircle2 className="w-4 h-4 text-brand-accent" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* 2. BLOCO DE DESTAQUE INCLUSIVO */}
      <section className="py-12 px-6 bg-brand-lavender/30 border-y border-brand-lavender/60 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-text mb-4">Cada gravidez é única — mesmo para quem já é mãe.</h2>
          <p className="text-brand-text-muted text-lg leading-relaxed font-medium">Mesmo que essa não seja sua primeira gestação, cada gravidez tem seu ritmo, suas mudanças e seus próprios momentos importantes. O Gravidez Organizada ajuda você a acompanhar tudo sem deixar nada importante passar.</p>
        </div>
      </section>

      {/* 3. FAIXA DE BENEFÍCIOS RÁPIDOS */}
      <section className="py-8 bg-white border-b border-brand-lavender/60 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Clock, text: "Semana atual da gravidez" },
              { icon: Baby, text: "Desenvolvimento do bebê" },
              { icon: Stethoscope, text: "Exames e consultas" },
              { icon: Zap, text: "Próximos passos importantes" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-3 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-brand-lavender/50 flex items-center justify-center text-brand-accent transition-all duration-300 group-hover:bg-brand-accent group-hover:text-white">
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-sm md:text-base font-bold text-brand-text leading-tight">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BLOCO DE PROBLEMA */}
      <section className="py-20 px-6 bg-brand-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <DecorativeBackground />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">Você não precisa acompanhar sua gravidez no escuro.</h2>
            <p className="text-brand-lavender-dark max-w-2xl mx-auto text-lg font-medium">Quando as informações ficam soltas, os exames se acumulam e tudo parece importante ao mesmo tempo, acompanhar a gravidez pode ficar mais confuso do que deveria.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: LayoutDashboard, title: "Nada importante passar batido", desc: "Consultas, exames e etapas importantes podem se perder no meio da rotina." },
              { icon: Baby, title: "Dificuldade para acompanhar o bebê", desc: "Nem sempre fica claro o que está acontecendo com você e com o bebê em cada semana." },
              { icon: Stethoscope, title: "Informação demais, direção de menos", desc: "Você vê muita coisa, mas continua sem saber o que importa agora." }
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-lg p-8 rounded-[2.5rem] border border-white/20 shadow-premium transition-all duration-500 hover:bg-white/15 hover:scale-[1.02]">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-6 shadow-premium">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-brand-lavender-dark leading-relaxed text-[15px] font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BLOCO DE SOLUÇÃO */}
      <section className="py-20 px-6 bg-brand-accent relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 opacity-10">
          <DecorativeBackground />
        </div>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 text-balance">O Gravidez Organizada reúne em um só lugar o que realmente importa na sua gravidez.</h2>
            <p className="text-lg text-brand-lavender-dark mb-10 leading-relaxed font-medium">
              Você acompanha sua gravidez com mais praticidade, entende melhor o desenvolvimento do bebê e visualiza o que vem a seguir em cada etapa.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {[
                "Semana atual",
                "Desenvolvimento do bebê",
                "Exames e consultas",
                "Próximos passos",
                "Checklists",
                "Linha do tempo"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-white font-bold text-[16px]">
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-brand-accent shadow-premium">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
            <Button className="w-full sm:w-auto bg-white text-brand-text hover:bg-brand-lavender" onClick={() => document.getElementById('preco')?.scrollIntoView({ behavior: 'smooth' })}>QUERO ACOMPANHAR MINHA GRAVIDEZ AGORA</Button>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="rounded-[3rem] overflow-hidden shadow-premium border-8 border-white/20">
              <img 
                src="https://picsum.photos/seed/pregnancy-solution-v4/1000/800" 
                alt="App Centralizador" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. SEÇÃO “O QUE VOCÊ ACOMPANHA NO APP” */}
      <section className="py-16 px-6 bg-white relative">
        <DecorativeBackground />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-text mb-4">O que você acompanha no app</h2>
            <p className="text-brand-text-muted max-w-2xl mx-auto text-lg font-medium">Tudo o que importa para a sua gravidez, reunido em um só lugar.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: LayoutDashboard, title: "Acompanhamento semanal", desc: "Veja em que semana você está e o que esperar deste momento." },
              { icon: Baby, title: "Desenvolvimento do bebê", desc: "Acompanhe como seu bebê está crescendo em cada etapa." },
              { icon: Stethoscope, title: "Cronograma de exames", desc: "Saiba o que normalmente acontece em cada fase e organize seu pré-natal." },
              { icon: ClipboardList, title: "Checklists práticos", desc: "Tenha listas prontas para os momentos mais importantes da gravidez." },
              { icon: Clock, title: "Linha do tempo da gestação", desc: "Visualize sua jornada do positivo ao parto com mais clareza." },
              { icon: Zap, title: "Próximos passos importantes", desc: "Saiba exatamente o que vem a seguir em cada fase da gestação." },
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="mb-4 overflow-hidden rounded-[2rem] bg-brand-blue aspect-video flex items-center justify-center relative shadow-premium group-hover:shadow-premium transition-all duration-500">
                  <img 
                    src={`https://picsum.photos/seed/module-v4-${i}/600/400`} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex gap-4 px-2">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-lavender flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-text mb-1 tracking-tight">{item.title}</h3>
                    <p className="text-[14px] text-brand-text-muted leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* 7. SEÇÃO DE BENEFÍCIOS */}
      <section className="py-16 px-6 bg-bg-warm-gray relative">
        <DecorativeBackground />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-text mb-4">O que muda quando você acompanha sua gravidez com mais clareza</h2>
            <p className="text-brand-text-muted max-w-2xl mx-auto text-lg font-medium">Mais do que organização, você ganha tranquilidade em cada etapa da gestação.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Mais segurança no dia a dia", desc: "Você entende melhor o que está acontecendo e o que vem a seguir." },
              { icon: Heart, title: "Mais conexão com a gravidez", desc: "Acompanhar o desenvolvimento do bebê torna cada etapa mais presente." },
              { icon: Zap, title: "Menos confusão, mais direção", desc: "Exames, prazos e informações importantes ficam mais fáceis de acompanhar." },
              { icon: Clock, title: "Organização sem esforço", desc: "Saber exatamente o que está acontecendo reduz o estresse e a ansiedade do dia a dia." },
              { icon: Baby, title: "Conexão com o bebê desde o início", desc: "Acompanhar o desenvolvimento cria um vínculo mais forte com o bebê em cada semana." },
              { icon: Calendar, title: "Controle das datas importantes", desc: "Tenha todas as datas de exames e consultas organizadas na palma da sua mão." }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-brand-accent shadow-premium border border-brand-accent/30 hover:shadow-premium transition-all duration-500 group">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white mb-4 group-hover:bg-white group-hover:text-brand-accent transition-colors">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{item.title}</h3>
                <p className="text-brand-lavender-dark leading-relaxed text-[14px] font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BLOCO DE VALOR */}
      <section className="py-14 px-6 bg-bg-warm-gray relative">
        <DecorativeBackground />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold text-brand-text mb-5 text-balance">Tudo o que você precisa em um só lugar para acompanhar sua gravidez com mais tranquilidade</h2>
          <p className="text-brand-text-muted text-lg leading-relaxed font-medium">Por um valor único, você tem acesso a um app que ajuda a acompanhar a gravidez, entender o desenvolvimento do bebê e visualizar os próximos passos sem depender de informações soltas.</p>
        </div>
      </section>

      {/* 10. SEÇÃO DE BÔNUS */}
      <section className="py-16 px-6 bg-white relative">
        <DecorativeBackground />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-text mb-4">Bônus exclusivos para deixar sua jornada ainda mais prática</h2>
            <p className="text-brand-text-muted text-lg font-medium">Materiais complementares inclusos para você de presente.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Stethoscope, tag: "Bônus 1", title: "Checklist da Consulta Pré-Natal", desc: "Um guia simples com o que observar e o que levar para suas consultas." },
              { icon: ShoppingBag, tag: "Bônus 2", title: "Checklist da Maternidade", desc: "Uma lista prática para ajudar você a se preparar sem exageros." },
              { icon: MessageCircleQuestion, tag: "Bônus 3", title: "Perguntas para levar ao obstetra", desc: "Um material de apoio com perguntas úteis para tirar dúvidas importantes." }
            ].map((item, i) => (
              <Card key={i} className="relative group bg-bg-off-white p-8">
                <div className="absolute top-6 right-6 bg-brand-accent text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-premium">{item.tag}</div>
                <div className="w-14 h-14 rounded-xl bg-brand-lavender flex items-center justify-center text-brand-accent mb-6 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-brand-text mb-3 tracking-tight">{item.title}</h3>
                <p className="text-brand-text-muted text-[14px] leading-relaxed font-medium">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 11. ANCORAGEM DE PREÇO */}
      <section className="py-12 px-6 bg-brand-accent relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 text-balance">Tudo isso por apenas <span className="font-black">R$ 19,90</span></h2>
          <p className="text-brand-lavender-dark text-lg leading-relaxed font-medium">Menos do que você gastaria em uma compra pequena do dia a dia para acompanhar sua gravidez com muito mais clareza, organização e praticidade.</p>
        </div>
      </section>

      {/* 12. OFERTA FINAL */}
      <section id="preco" className="py-16 px-6 bg-brand-accent relative overflow-hidden">
        <DecorativeBackground />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Comece hoje a acompanhar sua gravidez com mais clareza</h2>
            <p className="text-brand-lavender-dark font-medium text-lg">Pagamento único. Sem mensalidade. Acesso imediato no celular.</p>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass bg-white/10 backdrop-blur-lg rounded-[3rem] shadow-premium border border-white/20 overflow-hidden grid md:grid-cols-2"
          >
            <div className="p-10 bg-brand-accent border-r border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 font-display">Ao comprar hoje, você recebe:</h3>
              <ul className="space-y-3">
                {[
                  "Acesso ao app Gravidez Organizada",
                  "Acompanhamento da gravidez por fase",
                  "Semana atual da gestação",
                  "Desenvolvimento do bebê",
                  "Cronograma de exames e consultas",
                  "Checklists práticos",
                  "Linha do tempo da gravidez",
                  "Acesso imediato no celular",
                  "Bônus 1: Checklist da Consulta Pré-Natal",
                  "Bônus 2: Checklist da Maternidade",
                  "Bônus 3: Perguntas para levar ao obstetra"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px] font-bold text-white">
                    <CheckCircle2 className="w-4 h-4 text-white mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-10 flex flex-col justify-center text-center bg-white">
              <div className="mb-6">
                <p className="text-brand-text-muted font-bold text-sm uppercase tracking-widest mb-2">Condição Especial de Hoje</p>
                <span className="text-brand-text-muted/40 line-through text-xl font-bold">R$ 37,90</span>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <span className="text-2xl font-bold text-brand-text self-start mt-2">R$</span>
                  <span className="text-7xl font-black text-brand-text font-display">19</span>
                  <span className="text-2xl font-bold text-brand-text self-end mb-3">,90</span>
                </div>
                <p className="text-brand-accent font-black text-xs mt-2 uppercase tracking-widest">Pagamento único</p>
              </div>

              <Button primary className="w-full text-base py-5 mb-5 shadow-brand-accent/40 bg-green-600 hover:bg-green-500" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>SIM! QUERO ACESSAR O GRAVIDEZ ORGANIZADA</Button>
              
              <div className="flex flex-col gap-2 items-center text-[12px] text-brand-text-muted font-bold uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Garantia de 7 dias
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-brand-accent" />
                  Acesso imediato no celular
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 13. BLOCO DE GARANTIA */}
      <section className="py-12 px-6 bg-bg-warm-gray relative">
        <DecorativeBackground />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-white rounded-[2.5rem] shadow-card p-8 md:p-10 border border-brand-lavender/40 flex flex-col md:flex-row items-center gap-8 md:gap-10">
            <div className="shrink-0">
              <img src="/selo.png" alt="Garantia de 7 dias" className="w-44 md:w-54 h-auto" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-brand-text mb-3 font-display">Você tem 7 dias de garantia</h3>
              <p className="text-brand-text-muted text-[15px] leading-relaxed font-medium">
                Explore o Gravidez Organizada com tranquilidade. Se dentro de 7 dias você entender que ele não faz sentido para este momento, poderá solicitar o cancelamento conforme as condições informadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FAQ */}
      <section className="py-16 px-6 bg-bg-off-white relative overflow-hidden">
        <DecorativeBackground />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-text mb-4">Perguntas frequentes</h2>
            <p className="text-brand-text-muted text-lg font-medium">Tudo o que você precisa saber sobre o Gravidez Organizada.</p>
          </div>
          
          <div className="glass bg-brand-lavender rounded-[2.5rem] p-8 md:p-12 shadow-premium border border-brand-lavender/60">
            <FAQItem 
              question="Preciso baixar o aplicativo?" 
              answer="Não. O Gravidez Organizada é um app web e funciona direto no celular." 
            />
            <FAQItem 
              question="Funciona em qualquer celular?" 
              answer="Sim. O acesso é simples e pensado para uso no celular." 
            />
            <FAQItem 
              question="Posso usar mesmo se já estiver com vários meses?" 
              answer="Sim. O app acompanha a gravidez em diferentes etapas." 
            />
            <FAQItem 
              question="Serve para quem acabou de descobrir a gravidez?" 
              answer="Sim. Inclusive essa é uma das fases em que ele mais ajuda." 
            />
            <FAQItem 
              question="Isso substitui o acompanhamento médico?" 
              answer="Não. É uma ferramenta de apoio e organização da gravidez." 
            />
            <FAQItem 
              question="Como recebo o acesso?" 
              answer="Após a compra, você recebe as instruções para acessar o app no celular." 
            />
            <FAQItem 
              question="O pagamento é único?" 
              answer="Sim. Você paga apenas R$ 19,90 uma única vez." 
            />
            <FAQItem 
              question="Serve só para quem está na primeira gravidez?" 
              answer="Não. Ele pode ajudar tanto quem está vivendo a primeira gestação quanto quem já teve outros filhos." 
            />
          </div>
        </div>
      </section>

      {/* 15. FECHAMENTO FINAL */}
      <section className="py-20 px-6 bg-bg-lavender-soft text-center relative overflow-hidden border-t border-brand-lavender/40">
        <DecorativeBackground />
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-brand-text mb-6 leading-[1.1] font-display text-balance tracking-tight">Tenha sua gravidez <span className="text-brand-accent">mais acompanhada e mais clara</span> em um só lugar.</h2>
          <p className="text-lg md:text-xl text-brand-text-muted mb-10 max-w-3xl mx-auto font-medium">Se você quer entender melhor cada etapa, acompanhar o desenvolvimento do bebê e saber o que vem a seguir, o Gravidez Organizada foi feito para isso.</p>
          <Button primary className="text-xl py-6 px-14 shadow-brand-accent/40" onClick={() => document.getElementById('preco')?.scrollIntoView({ behavior: 'smooth' })}>QUERO ACOMPANHAR MINHA GRAVIDEZ AGORA</Button>
          
          <div className="mt-16 flex justify-center items-center gap-10 opacity-50 grayscale font-bold text-[12px] uppercase tracking-widest">
             <div className="flex items-center gap-2">
               <ShieldCheck className="w-5 h-5" />
               <span>Compra Segura</span>
             </div>
             <div className="flex items-center gap-2">
               <Smartphone className="w-5 h-5" />
               <span>Acesso Mobile</span>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-brand-lavender/40 text-center relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3 opacity-80">
              <div className="w-10 h-10 bg-brand-text rounded-2xl flex items-center justify-center">
                <Heart className="text-white w-6 h-6" fill="currentColor" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-brand-text font-display">Gravidez Organizada</span>
            </div>
          </div>
          <p className="text-brand-text-muted text-[13px] font-bold max-w-lg mx-auto leading-relaxed">
            © 2026 Gravidez Organizada. Todos os direitos reservados.<br />
            O Gravidez Organizada é uma ferramenta de apoio e organização da gravidez. Não substitui acompanhamento médico profissional.
          </p>
        </div>
      </footer>
    </div>
  );
}
