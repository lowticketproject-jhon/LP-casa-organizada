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
  Calendar,
  Compass,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from './lib/supabase';

// --- Components ---

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  primary?: boolean;
  key?: React.Key;
  onClick?: () => void;
}

const Button = ({ children, className = "", primary = false, onClick, disabled = false, loading = false }: ButtonProps & { disabled?: boolean, loading?: boolean }) => (
  <button 
    onClick={onClick}
    disabled={disabled || loading}
    className={`
      px-8 py-4 rounded-full font-bold transition-all duration-300 transform 
      active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
      ${primary 
        ? "bg-brand-accent text-white hover:bg-brand-accent-light shadow-brand-accent/25 btn-pulse" 
        : "glass text-brand-text border border-brand-lavender-dark hover:bg-brand-lavender/80 shadow-card"}
      ${className}
    `}
  >
    {loading ? (
      <div className="flex items-center justify-center gap-2">
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        <span>Processando...</span>
      </div>
    ) : children}
  </button>
);

interface CardProps {
  children: React.ReactNode;
  className?: string;
  key?: React.Key;
}

const Card = ({ children, className = "" }: CardProps) => (
  <div className={`glass p-8 rounded-[2.5rem] shadow-premium border border-brand-lavender/60 transition-all duration-300 hover:shadow-premium hover:border-brand-accent/30 ${className}`}>
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
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-brand-accent text-white rotate-180 shadow-premium' : 'bg-brand-lavender/50 text-brand-accent'}`}>
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
    <div className="absolute top-[20%] right-[30%] w-64 h-64 bg-brand-accent/5 rounded-full blur-[80px]" />
    <div className="absolute bottom-[20%] left-[20%] w-80 h-80 bg-brand-accent/5 rounded-full blur-[100px]" />
  </div>
);

const SuccessView = () => {
  const [email] = useState(new URLSearchParams(window.location.search).get('email') || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    setLoading(true);
    setError(null);

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
    } else if (signUpData?.user) {
      // Update purchase_access to link the user and mark as used
      await supabase
        .from('purchase_access')
        .update({ 
          used: true, 
          auth_user_id: signUpData.user.id 
        })
        .eq('email', email);
        
      setDone(true);
    }
    setLoading(false);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-bg-off-white flex items-center justify-center p-6 relative">
        <DecorativeBackground />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-premium border border-brand-lavender/40 text-center relative z-10"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 shadow-premium">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-brand-text mb-4">Cadastro Criado!</h2>
          <p className="text-brand-text-muted mb-8 font-medium">Sua conta está ativa. Clique abaixo para entrar no seu portal agora.</p>
          <Button primary className="w-full text-lg py-5 shadow-brand-accent/40 shadow-premium" onClick={() => window.location.href = 'https://gravidezorganizada.online'}>ACESSAR MEU APLICATIVO</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-off-white flex items-center justify-center p-6 relative">
      <DecorativeBackground />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-premium border border-brand-lavender/40 relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-block px-4 py-2 bg-brand-lavender/30 rounded-full text-brand-accent text-xs font-black uppercase tracking-widest mb-4">
            Compra Aprovada
          </div>
          <h2 className="text-3xl font-black text-brand-text mb-2 tracking-tight">Crie sua Senha</h2>
          <p className="text-brand-text-muted font-medium">Falta só um passo para acessar seu portal.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-brand-text-muted mb-2 ml-4">E-mail</label>
            <input 
              type="email" 
              value={email} 
              disabled 
              className="w-full px-6 py-4 rounded-2xl bg-bg-warm-gray/30 border border-brand-lavender/40 text-brand-text-muted font-medium focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-brand-text-muted mb-2 ml-4">Escolha uma Senha</label>
            <input 
              type="password" 
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-6 py-4 rounded-2xl bg-white border border-brand-lavender/40 text-brand-text font-medium focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent focus:outline-none transition-all"
            />
          </div>
          
          {error && (
            <div className="p-4 bg-red-50 rounded-xl text-red-600 text-sm font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              {error}
            </div>
          )}

          <Button primary loading={loading} className="w-full mt-4 py-5 text-base shadow-brand-accent/40 shadow-premium">Concluir Cadastro</Button>
        </form>
      </motion.div>
    </div>
  );
};

export default function App() {
  const isSuccessPage = window.location.pathname === '/sucesso' || new URLSearchParams(window.location.search).has('email');

  if (isSuccessPage) {
    return <SuccessView />;
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-accent/30 selection:text-brand-text">
      {/* 1. HERO SECTION */}
      <header className="relative pt-6 pb-8 px-6 overflow-hidden">
        <DecorativeBackground />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
{/* Logo */}
          <div className="flex justify-center mb-6">
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-brand-text leading-[1.1] mb-4 max-w-5xl mx-auto text-balance tracking-tight"
          >
           Entenda em que fase da gravidez você está, acompanhe o desenvolvimento do bebé e <span className="text-brand-accent">saiba o que acompanhar em cada etapa da sua jornada</span>.
          </motion.h1>

          {/* Mockup Principal */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-4xl mx-auto mb-8"
          >
            <div className="relative z-10 rounded-[2rem] overflow-hidden">
              <img 
                src="https://res.cloudinary.com/dynjqdxw8/image/upload/v1774495739/1774438917689-removebg-preview_lenqun.png" 
                alt="Gravidez Organizada App" 
                className="w-full h-auto"
              />
            </div>
            {/* Decorative Glows */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-accent/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-accent/10 rounded-full blur-[120px] -z-10" />
          </motion.div>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl text-brand-text-muted mb-6 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Um app prático para acompanhar sua gravidez com mais clareza, organizar exames e consultas, visualizar os próximos passos importantes e registrar momentos especiais da sua jornada.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <Button primary className="text-lg px-12 py-5" onClick={() => document.getElementById('preco')?.scrollIntoView({ behavior: 'smooth' })}>QUERO ACOMPANHAR MINHA GRAVIDEZ AGORA</Button>

            {/* Microtexto */}
            <div className="flex items-center justify-center gap-4 mt-4 text-[11px] font-black uppercase tracking-widest text-brand-text-muted/60">
              <span>Acesso imediato</span>
              <span className="w-1 h-1 rounded-full bg-brand-lavender-dark" />
              <span>Funciona no celular</span>
              <span className="w-1 h-1 rounded-full bg-brand-lavender-dark" />
              <span>Pagamento único</span>
            </div>
          </motion.div>
        </div>
      </header>

{/* 2. SEÇÃO — DOR CURTA */}
      <section className="py-12 px-6 bg-white relative overflow-hidden border-b border-brand-lavender/40">
        <DecorativeBackground />
        <div className="max-w-3xl mx-auto relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-black text-brand-text mb-4 leading-tight">
                Em muitos momentos da gravidez, o mais difícil não é só lidar com as mudanças. É <span className="text-brand-accent">saber o que acompanhar em cada fase</span>.
              </h2>
              <div className="space-y-3 mb-6">
                <p className="text-brand-text-muted text-lg leading-relaxed font-medium">
                  Entre exames, consultas, sintomas e informações espalhadas, é comum se sentir confusa sobre o que está acontecendo agora e o que vem a seguir.
                </p>
                <p className="text-brand-text-muted text-lg leading-relaxed font-bold">
                  O Gravidez Organizada foi criado para reunir em um só lugar o que ajuda você a acompanhar sua jornada com mais clareza, organização e tranquilidade.
                </p>
              </div>
              <Button primary onClick={() => document.getElementById('preco')?.scrollIntoView({ behavior: 'smooth' })}>QUERO TER MAIS CLAREZA NA MINHA GRAVIDEZ</Button>
            </motion.div>
        </div>
      </section>

      {/* 3. FAIXA DE BENEFÍCIOS RÁPIDOS */}
      {/* REMOVIDA */}
      {/* 4. BLOCO DE VITRINE VISUAL */}
<section className="py-8 px-6 bg-brand-accent relative overflow-hidden border-b border-white/10">
        <DecorativeBackground />
<div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 text-balance tracking-tight">O que você acompanha no app</h2>
            <p className="text-brand-lavender-dark max-w-3xl mx-auto text-lg md:text-xl font-medium leading-relaxed">Tudo pensado para ajudar você a entender melhor sua fase atual, acompanhar o desenvolvimento do bebé e visualizar o que merece sua atenção em cada etapa da jornada.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Calendar,
                title: "Semana atual da gravidez",
                desc: "Saiba em que fase você está e acompanhe sua evolução com mais clareza."
              },
              {
                icon: Baby,
                title: "Desenvolvimento do bebé",
                desc: "Veja o que está acontecendo em cada etapa da gestação."
              },
              {
                icon: Stethoscope,
                title: "Exames e consultas",
                desc: "Tenha mais organização para acompanhar o que merece sua atenção."
              },
              {
                icon: Compass,
                title: "Próximos passos importantes",
                desc: "Visualize o que observar e o que vem a seguir em cada fase."
              },
              {
                icon: ClipboardList,
                title: "Checklists e linha do tempo",
                desc: "Tenha uma visão mais prática da sua jornada do positivo ao parto."
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className={`group flex flex-col bg-white/10 p-6 rounded-[2rem] border border-white/20 shadow-premium transition-all duration-300 hover:shadow-premium hover:scale-[1.02] hover:bg-white/20`}
              >
                <div className="w-14 h-14 rounded-[1.5rem] bg-white/20 flex items-center justify-center text-white mb-4 shadow-premium transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {item.icon && <item.icon className="w-7 h-7" />}
                </div>
                <div className="">
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-white transition-colors">{item.title}</h3>
                  <p className="text-brand-lavender-dark leading-relaxed text-[15px] font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button onClick={() => document.getElementById('preco')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 rounded-full font-bold bg-white text-brand-text shadow-lg hover:bg-brand-lavender transition-all duration-300">
              QUERO ACOMPANHAR MINHA GRAVIDEZ AGORA
            </button>
          </div>
        </div>
      </section>

      {/* 5. BLOCO DE SOLUÇÃO */}
      {/* REMOVIDO */}

{/* 7. SEÇÃO DE BENEFÍCIOS */}
      <section className="py-6 px-6 bg-white border-y border-brand-lavender/40 relative">
<DecorativeBackground />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-4">
            <h2 className="text-xl md:text-3xl font-bold text-brand-text mb-3">O que muda quando você acompanha sua gravidez com mais clareza</h2>
            <p className="text-brand-text-muted max-w-2xl mx-auto text-base font-medium">Mais do que organizar informações, o Gravidez Organizada ajuda você a viver cada etapa com mais segurança, direção e tranquilidade.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, title: "Mais segurança no dia a dia", desc: "Entenda melhor o que está acontecendo e o que vem a seguir em cada fase." },
              { icon: Zap, title: "Menos confusão com informações soltas", desc: "Tenha em um só lugar o que realmente importa para acompanhar sua jornada." },
              { icon: Stethoscope, title: "Mais organização com exames e consultas", desc: "Visualize com mais clareza o que merece sua atenção em cada momento." },
              { icon: Heart, title: "Mais tranquilidade para acompanhar cada etapa", desc: "Saber o que observar e quais são os próximos passos reduz a sensação de insegurança." },
              { icon: Baby, title: "Mais conexão com o desenvolvimento do bebé", desc: "Acompanhar cada fase torna sua jornada mais presente e significativa." }
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-[2rem] bg-white shadow-card border-2 border-brand-accent/40 hover:shadow-premium hover:border-brand-accent transition-all duration-500 group">
                <div className="w-9 h-9 rounded-lg bg-brand-lavender flex items-center justify-center text-brand-accent mb-3 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <item.icon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-brand-text mb-1 tracking-tight">{item.title}</h3>
                <p className="text-brand-text-muted leading-relaxed text-[13px] font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* 8. BLOCO DE VALOR */}
      <section className="py-4 px-6 bg-bg-warm-gray relative">
        <DecorativeBackground />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-lg md:text-xl font-bold text-brand-text mb-3 text-balance">Tudo o que você precisa para acompanhar sua gravidez com mais clareza em um só lugar</h2>
          <p className="text-brand-text-muted text-base leading-relaxed font-medium">Por um valor único, você acessa um app prático para entender sua fase atual, acompanhar o desenvolvimento do bebé, visualizar os próximos passos importantes e viver sua jornada com mais organização e tranquilidade.</p>
        </div>
      </section>

      {/* 10. SEÇÃO DE BÔNUS */}
      <section className="py-6 px-6 bg-white relative">
        <DecorativeBackground />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-4">
            <h2 className="text-xl md:text-3xl font-bold text-brand-text mb-3">Bônus para deixar sua jornada ainda mais prática</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Stethoscope, tag: "Bônus 1", title: "Checklist da Consulta Pré-Natal", desc: "Um guia simples para ajudar você a se organizar melhor para suas consultas." },
              { icon: ShoppingBag, tag: "Bônus 2", title: "Checklist da Maternidade", desc: "Uma lista prática para ajudar você a se preparar com mais objetividade." },
              { icon: MessageCircleQuestion, tag: "Bônus 3", title: "Perguntas para levar ao obstetra", desc: "Um material de apoio com perguntas úteis para esclarecer dúvidas importantes nas consultas." }
            ].map((item, i) => (
              <Card key={i} className="relative group bg-bg-off-white p-5">
                <div className="absolute top-4 right-4 bg-brand-accent text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-premium">{item.tag}</div>
                <div className="w-12 h-12 rounded-lg bg-brand-lavender flex items-center justify-center text-brand-accent mb-4 group-hover:bg-brand-accent group-hover:text-white transition-all duration-300">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-brand-text mb-2 tracking-tight">{item.title}</h3>
                <p className="text-brand-text-muted text-[13px] leading-relaxed font-medium">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="preco" className="py-6 px-6 bg-brand-accent relative overflow-hidden">
        <DecorativeBackground />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Tudo o que você precisa para acompanhar sua gravidez com mais clareza em um só lugar</h2>
            <p className="text-brand-lavender-dark font-medium text-base">Pagamento único. Sem mensalidade. Acesso imediato no celular.</p>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass bg-white/10 backdrop-blur-lg rounded-[3rem] shadow-premium border border-white/20 overflow-hidden grid md:grid-cols-2"
          >
            <div className="p-6 bg-brand-accent border-r border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 font-display">Ao comprar hoje, você recebe:</h3>
              <ul className="space-y-2">
                {[
                  "Acesso ao app Gravidez Organizada",
                  "Semana atual da gestação",
                  "Desenvolvimento do bebé",
                  "Exames e consultas",
                  "Próximos passos importantes",
                  "Checklists práticos",
                  "Linha do tempo da gravidez"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] font-bold text-white">
                    <CheckCircle2 className="w-4 h-4 text-white mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-white font-bold text-sm mt-4 mb-2">E ainda recebe como bônus:</p>
              <ul className="space-y-2">
                {[
                  "Checklist da Consulta Pré-Natal",
                  "Checklist da Maternidade",
                  "Perguntas para levar ao obstetra"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] font-bold text-white">
                    <CheckCircle2 className="w-4 h-4 text-white mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
</ul>
            </div>
            <div className="p-6 flex flex-col justify-center text-center bg-white relative">
              <div className="mb-4">
                <p className="text-brand-text-muted font-bold text-sm uppercase tracking-widest mb-2">Condição especial de hoje</p>
                <span className="text-brand-text-muted/40 line-through text-xl font-bold">De R$ 37,90</span>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <span className="text-2xl font-bold text-brand-text self-start mt-2">por apenas</span>
                  <span className="text-5xl font-black text-brand-text font-display">R$ 19,90</span>
                </div>
                <div className="flex items-center justify-center gap-4 mt-3 text-[11px] font-bold uppercase tracking-widest text-brand-accent">
                  <span>Pagamento único</span>
                  <span className="w-1 h-1 rounded-full bg-brand-accent" />
                  <span>Acesso imediato</span>
                </div>
              </div>

              <Button primary className="w-full text-base py-4 mb-4 shadow-brand-accent/40 bg-green-600 hover:bg-green-500 font-black" onClick={() => window.open('https://pay.cakto.com.br/koqudon_817260', '_blank')}>SIM! QUERO ACESSAR O GRAVIDEZ ORGANIZADA</Button>
              
              <div className="flex flex-col gap-1 items-center text-[11px] text-brand-text-muted font-bold uppercase tracking-wider">
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
      <section className="py-6 px-6 bg-bg-warm-gray relative">
        <DecorativeBackground />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-white rounded-[2.5rem] shadow-card p-6 md:p-8 border border-brand-lavender/40 flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="shrink-0">
              <img src="/selo.png" alt="Garantia de 7 dias" className="w-44 md:w-54 h-auto" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-bold text-brand-text mb-3 font-display">Você tem 7 dias de garantia para conhecer o Gravidez Organizada com tranquilidade</h3>
              <p className="text-brand-text-muted text-[15px] leading-relaxed font-medium">
                Entre, explore o app e veja se ele faz sentido para este momento da sua gravidez. Se dentro de 7 dias você entender que o Gravidez Organizada não é para você, poderá solicitar o cancelamento conforme as condições informadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FAQ */}
      <section className="py-6 px-6 bg-bg-off-white relative overflow-hidden">
        <DecorativeBackground />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-4">
            <h2 className="text-xl md:text-3xl font-bold text-brand-text mb-3">Perguntas frequentes</h2>
          </div>
          
          <div className="glass bg-brand-lavender rounded-[2.5rem] p-6 md:p-8 shadow-premium border border-brand-lavender/60">
            <FAQItem 
              question="Funciona em qualquer celular?" 
              answer="Sim. O acesso foi pensado para ser simples e prático no celular." 
            />
            <FAQItem 
              question="Posso usar mesmo se já estiver com vários meses?" 
              answer="Sim. O app ajuda você a acompanhar a fase atual da sua gravidez e o que vem a seguir." 
            />
            <FAQItem 
              question="Serve para quem acabou de descobrir a gravidez?" 
              answer="Sim. Ele pode ser usado desde o início da gestação." 
            />
            <FAQItem 
              question="Isso substitui acompanhamento médico?" 
              answer="Não. O Gravidez Organizada é uma ferramenta de apoio e organização. Não substitui acompanhamento médico profissional." 
            />
            <FAQItem 
              question="O pagamento é mensal?" 
              answer="Não. O acesso é por pagamento único." 
            />
            <FAQItem 
              question="Recebo acesso logo após a compra?" 
              answer="Sim. O acesso é liberado após a confirmação do pagamento." 
            />
          </div>
        </div>
      </section>

      {/* 15. FECHAMENTO FINAL */}
      <section className="py-10 px-6 bg-bg-lavender-soft text-center relative overflow-hidden border-t border-brand-lavender/40">
        <DecorativeBackground />
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-2xl md:text-4xl font-black text-brand-text mb-3 leading-[1.1] font-display text-balance tracking-tight">Tenha sua gravidez <span className="text-brand-accent">mais clara, organizada e acompanhada</span> em um só lugar</h2>
          <p className="text-base md:text-lg text-brand-text-muted mb-6 max-w-3xl mx-auto font-medium">Se você quer entender melhor cada etapa da gravidez, acompanhar o desenvolvimento do bebé, visualizar os próximos passos importantes e registrar momentos especiais da sua jornada, o Gravidez Organizada foi feito para isso.</p>
          <Button primary className="text-lg py-4 px-10 shadow-brand-accent/40" onClick={() => document.getElementById('preco')?.scrollIntoView({ behavior: 'smooth' })}>QUERO ACOMPANHAR MINHA GRAVIDEZ AGORA</Button>
          
          <div className="mt-6 flex justify-center items-center gap-8 opacity-50 grayscale font-bold text-[12px] uppercase tracking-widest">
             <div className="flex items-center gap-2">
               <ShieldCheck className="w-5 h-5" />
               <span>Compra Segura</span>
             </div>
             <div className="flex items-center gap-2">
               <Smartphone className="w-5 h-5" />
               <span>Acesso Mobile</span>
             </div>
             <div className="flex items-center gap-2">
               <CheckCircle2 className="w-5 h-5" />
               <span>Pagamento único</span>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 bg-white border-t border-brand-lavender/40 text-center relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-4">
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
