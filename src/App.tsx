import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ChevronDown, 
  Baby, 
  ClipboardList, 
  Smartphone, 
  ShieldCheck, 
  Zap, 
  Heart, 
  Clock, 
  Stethoscope,
  ShoppingBag,
  MessageCircleQuestion,
  Calendar,
  Compass,
  Eye,
  Brain,
  AlertCircle,
  ArrowRight,
  Check,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import './index.css';

const CHECKOUT_URL = 'https://pay.cakto.com.br/koqudon_817260';

const getUrlParams = () => {
  const params = new URLSearchParams(window.location.search);
  const trackingParams = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 
    'fbclid', 'gclid', 'ttclid', 'utm_id'
  ];
  const filteredParams = new URLSearchParams();
  
  trackingParams.forEach(param => {
    const value = params.get(param);
    if (value) {
      filteredParams.set(param, value);
    }
  });
  
  return filteredParams;
};

const getCheckoutUrl = () => {
  const filteredParams = getUrlParams();
  const queryString = filteredParams.toString();
  return queryString ? `${CHECKOUT_URL}?${queryString}` : CHECKOUT_URL;
};

const trackEvent = (eventName: string, additionalData?: Record<string, any>) => {
  const fbq = (window as any).fbq;
  if (fbq) {
    const utmParams = getUrlParams();
    const trackingData: Record<string, any> = {
      content_name: 'Gravidez Organizada',
      content_type: 'product',
      ...Object.fromEntries(utmParams),
      ...additionalData
    };
    fbq('track', eventName, trackingData);
  }
  
  if ((window as any).cakto) {
    (window as any).cakto('track', eventName);
  }
};

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const Button = ({ children, className = "", onClick, variant = 'primary' }: ButtonProps) => (
  <button 
    onClick={onClick}
    className={`
      px-8 py-4 rounded-full font-bold transition-all duration-300 transform 
      active:scale-95 text-base md:text-lg btn-pulse
      ${variant === 'primary' 
        ? "bg-[#00A63E] text-white hover:bg-[#009632] shadow-lg hover:shadow-xl" 
        : "bg-[#8B5CF6] text-white hover:bg-[#7C3AED] shadow-lg hover:shadow-xl"}
      ${className}
    `}
  >
    {children}
  </button>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#8B5CF6]/20 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left"
      >
        <span className={`text-base font-semibold pr-4 ${isOpen ? 'text-[#8B5CF6]' : 'text-brand-text'}`}>{question}</span>
        <ChevronDown className={`w-5 h-5 text-[#8B5CF6] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-brand-text-muted">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SectionTitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <h2 className={`text-2xl md:text-4xl font-black text-brand-text leading-tight text-center mb-4 ${className}`}>
    {children}
  </h2>
);

const SectionSubtitle = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <p className={`text-base md:text-lg text-brand-text-muted text-center max-w-2xl mx-auto mb-8 md:mb-12 ${className}`}>
    {children}
  </p>
);

export default function App() {
  const handleCTAClick = (eventName: string) => {
    trackEvent(eventName, { value: 19.90, currency: 'BRL' });
    window.location.href = getCheckoutUrl();
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/5531992440099?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20Gravidez%20Organizada"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-50 hover:bg-green-600 transition-all"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* ========================================== */}
      {/* SEÇÃO 1 — HERO PRINCIPAL */}
      {/* ========================================== */}
      <section className="py-10 md:py-16 px-4 bg-gradient-to-b from-white to-[#F8F7FF]">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Título pequeno */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-[#8B5CF6] rounded-xl flex items-center justify-center">
              <Heart className="text-white w-5 h-5" fill="currentColor" />
            </div>
            <span className="text-lg font-bold text-brand-text">Gravidez Organizada</span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl md:text-5xl font-black text-brand-text leading-[1.15] mb-4 px-2">
            Veja em que fase da gravidez você está, entenda o que merece sua atenção agora e pare de depender de informações espalhadas.
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-xl text-brand-text-muted mb-6 max-w-2xl mx-auto px-2">
            Um app simples e prático que funciona como seu GPS da Gestação, reunindo em um só lugar o que ajuda você a acompanhar sua gravidez com mais clareza e menos confusão.
          </p>

          {/* Mockup visual */}
          <div className="relative max-w-xs mx-auto mb-8">
            <div className="bg-gradient-to-br from-[#8B5CF6]/10 to-[#8B5CF6]/5 rounded-3xl p-4 border border-[#8B5CF6]/20">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-[#8B5CF6] p-4 text-center">
                  <span className="text-white font-bold">Você está na</span>
                </div>
                <div className="p-6">
                  <div className="text-5xl font-black text-[#8B5CF6] mb-2">24ª</div>
                  <div className="text-sm text-brand-text-muted mb-4">semana de gravidez</div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#00A63E]" />
                      <span>Bebê tem 22cm</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#00A63E]" />
                      <span>Peso aprox. 600g</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#00A63E]" />
                      <span>Surdos agora</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bullets */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
            {[
              "Semana atual da gravidez",
              "Desenvolvimento do bebê",
              "O que merece sua atenção agora",
              "Próximos passos importantes"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm md:text-base text-brand-text-muted">
                <CheckCircle2 className="w-5 h-5 text-[#8B5CF6]" />
                {item}
              </div>
            ))}
          </div>

          {/* Botão CTA */}
          <Button onClick={() => handleCTAClick('Lead')} className="w-full max-w-sm mx-auto">
            QUERO MEU GPS DA GESTAÇÃO AGORA
          </Button>

          {/* Microprovas */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mt-6 text-xs md:text-sm font-medium text-brand-text-muted">
            <span>Acesso imediato</span>
            <span className="w-1 h-1 rounded-full bg-[#8B5CF6]/40" />
            <span>Funciona no celular</span>
            <span className="w-1 h-1 rounded-full bg-[#8B5CF6]/40" />
            <span>Pagamento único</span>
            <span className="w-1 h-1 rounded-full bg-[#8B5CF6]/40" />
            <span>Garantia de 7 dias</span>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SEÇÃO 2 — DOR / AGITAÇÃO */}
      {/* ========================================== */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle>
            A gravidez já traz mudanças demais. Você não precisa carregar também o peso de 1.000 informações soltas.
          </SectionTitle>
          
          <p className="text-base md:text-lg text-brand-text-muted mb-6">
            Entre exames, consultas, sintomas, preparativos e tanto conteúdo espalhado, muitas gestantes acaba mentalmente sobrecarregadas, sem saber exatamente o que merece atenção em cada fase.
          </p>
          
          <p className="text-lg md:text-xl font-semibold text-brand-text mb-8">
            O problema não é falta de informação.<br/>
            <span className="text-[#8B5CF6]">É excesso.</span>
          </p>
          
          <p className="text-base text-brand-text-muted">
            E quando tudo parece solto, vem aquela sensação de confusão, insegurança e medo de deixar passar algo importante.
          </p>
        </div>

        {/* 3 Cards de dor */}
        <div className="max-w-4xl mx-auto mt-10 grid md:grid-cols-3 gap-4 md:gap-6">
          {[
            { icon: Brain, title: "Informação demais", desc: "Você pesquisa, salva conteúdo e mesmo assim continua com dúvidas." },
            { icon: AlertCircle, title: "Peso mental", desc: "Exames, consultas, sintomas e preparativos acabam ficam todos na sua cabeça." },
            { icon: Eye, title: "Medo de esquecer algo", desc: "Fica difícil saber o que é prioridade agora e o que pode esperar." }
          ].map((item, i) => (
            <div key={i} className="bg-[#8B5CF6] rounded-2xl p-6 text-center shadow-lg">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-white/80">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================== */}
      {/* SEÇÃO 3 — APRESENTAÇÃO DA SOLUÇÃO */}
      {/* ========================================== */}
      <section className="py-12 md:py-16 px-4 bg-[#F8F7FF]">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle>
            Foi para isso que criamos o Gravidez Organizada.
          </SectionTitle>
          
          <p className="text-base md:text-lg text-brand-text-muted mb-8">
            O Gravidez Organizada reúne em um só lugar o que ajuda você a entender sua fase atual, acompanhar o desenvolvimento do bebê, visualizar o que merece sua atenção agora e organizar os próximos passos importantes.
          </p>
          
          <p className="text-base text-brand-text-muted mb-8">
            Tudo de forma simples, prática e fácil de acessar no celular.
          </p>
          
          <Button onClick={() => handleCTAClick('Lead')}>
            QUERO TER MAIS CLAREZA NA MINHA GRAVIDEZ
          </Button>
        </div>
      </section>

      {/* ========================================== */}
      {/* SEÇÃO 4 — MECANISMO ÚNICO */}
      {/* ========================================== */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle>
            Seu GPS da Gestação em 4 pontos simples
          </SectionTitle>
          <SectionSubtitle>
            Uma forma prática de acompanhar sua gravidez sem depender de informações espalhadas.
          </SectionSubtitle>
          
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {[
              { num: "1", title: "Onde você está agora", desc: "Veja em que fase da gravidez você está com clareza." },
              { num: "2", title: "O que está acontecendo com o bebê", desc: "Entenda o desenvolvimento da fase atual de forma simples." },
              { num: "3", title: "O que merece sua atenção agora", desc: "Saiba o que observar, acompanhar e organizar neste momento." },
              { num: "4", title: "O que vem a seguir", desc: "Visualize os próximos passos com mais clareza e menos confusão." }
            ].map((item, i) => (
              <div key={i} className="bg-[#F8F7FF] rounded-2xl p-6 text-left border border-[#8B5CF6]/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#8B5CF6] rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white font-bold">{item.num}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-text mb-1">{item.title}</h3>
                    <p className="text-sm text-brand-text-muted">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SEÇÃO 5 — O QUE TEM DENTRO DO PRODUTO */}
      {/* ========================================== */}
      <section className="py-12 md:py-16 px-4 bg-[#F8F7FF]">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle>
            Tudo o que você encontra no Gravidez Organizada
          </SectionTitle>
          <SectionSubtitle>
            Um painel simples no celular para ajudar você a acompanhar sua gravidez com mais clareza e organização.
          </SectionSubtitle>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Calendar, title: "Semana atual da gravidez", desc: "Saiba exatamente em que fase você está." },
              { icon: Baby, title: "Desenvolvimento do bebê", desc: "Entenda o que está acontecendo em cada etapa." },
              { icon: Compass, title: "O que merece sua atenção agora", desc: "Veja o que é importante no momento atual." },
              { icon: Stethoscope, title: "Exames e consultas", desc: "Organize e acompanhe seus exames e consultas." },
              { icon: ArrowRight, title: "Próximos passos", desc: "Visualize o que vem a seguir sem se sentir perdida." },
              { icon: ClipboardList, title: "Checklists práticos", desc: "Tenha apoio para não deixar passar pontos importantes." }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-[#8B5CF6]/10 flex items-start gap-4">
                <div className="w-10 h-10 bg-[#8B5CF6]/10 rounded-xl flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-brand-text mb-1">{item.title}</h3>
                  <p className="text-sm text-brand-text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <Button onClick={() => handleCTAClick('Lead')}>
              QUERO ACESSAR AGORA
            </Button>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SEÇÃO 6 — COMPARATIVO */}
      {/* ========================================== */}
      <section className="py-12 md:py-16 px-4 bg-[#F2F2F5]">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle>
            Por que não é a mesma coisa que buscar informações soltas na internet?
          </SectionTitle>
          
          <div className="grid md:grid-cols-2 gap-5 mt-8">
            <div className="bg-white rounded-2xl p-6 text-left shadow-sm border border-red-100">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-red-100">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                <h3 className="font-bold text-red-500">Informações soltas</h3>
              </div>
              <ul className="space-y-3">
                {["conteúdo espalhado", "dúvidas conflitantes", "difícil saber o que é prioridade", "você precisa filtrar tudo sozinha", "mais peso mental"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm bg-red-50 rounded-lg px-3 py-2 text-red-400">
                    <span className="text-red-400 mt-0.5 font-bold flex-shrink-0">✕</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-6 text-left shadow-sm border-2 border-[#8B5CF6]">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#8B5CF6]/20">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6]"></span>
                <h3 className="font-bold text-[#8B5CF6]">Gravidez Organizada</h3>
              </div>
              <ul className="space-y-3">
                {["fase atual em um só lugar", "desenvolvimento do bebê com clareza", "atenção ao que importa agora", "próximos passos organizados", "mais leveza mental e praticidade"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm bg-[#F8F7FF] rounded-lg px-3 py-2 text-brand-text">
                    <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] mt-0.5 flex-shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-8 inline-block bg-white rounded-2xl px-8 py-4 shadow-sm border border-[#8B5CF6]/15">
            <p className="text-xl font-bold text-brand-text">
              Mais clareza, menos confusão.
            </p>
            <p className="text-xl font-bold text-[#8B5CF6]">
              Mais organização, menos carga mental.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SEÇÃO 7 — PARA QUEM É */}
      {/* ========================================== */}
      <section className="py-12 md:py-16 px-4 bg-[#F8F7FF]">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle>
            Ideal para a gestante que quer clareza sem depender de 1.000 abas abertas no Google
          </SectionTitle>
          
          <div className="mt-8 space-y-4">
            {[
              "quer entender melhor a fase atual da gravidez",
              "sente que tem informação demais e direção de menos",
              "quer acompanhar o desenvolvimento do bebê com mais clareza",
              "quer organizar exames, consultas e próximos passos",
              "quer praticidade no celular"
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 max-w-md mx-auto">
                <CheckCircle2 className="w-5 h-5 text-[#8B5CF6]" />
                <span className="text-brand-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SEÇÃO 8 — BÔNUS */}
      {/* ========================================== */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle>
            Bônus para deixar sua rotina ainda mais prática
          </SectionTitle>
          
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-8">
            {[
              { icon: Stethoscope, title: "Checklist da Consulta Pré-Natal", desc: "Um guia simples para ajudar você a se organizar melhor antes de cada consulta." },
              { icon: ShoppingBag, title: "Checklist da Maternidade", desc: "Uma lista prática para ajudar você a se preparar com mais objetividade." },
              { icon: MessageCircleQuestion, title: "Perguntas para levar ao obstetra", desc: "Um material de apoio com perguntas úteis para esclarecer dúvidas importantes." }
            ].map((item, i) => (
              <div key={i} className="bg-[#F8F7FF] rounded-2xl p-6 border border-[#8B5CF6]/20">
                <div className="w-12 h-12 bg-[#8B5CF6] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-brand-text mb-2">{item.title}</h3>
                <p className="text-sm text-brand-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SEÇÃO 9 — OFERTA */}
      {/* ========================================== */}
      <section className="py-12 md:py-16 px-4 bg-[#8B5CF6]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4">
            Tenha acesso ao Gravidez Organizada por pagamento único
          </h2>
          
          <p className="text-white/80 mb-8">
            Ao comprar hoje, você recebe acesso a uma solução prática para:
          </p>
          
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-8">
            <ul className="space-y-3">
              {[
                "ver sua fase atual da gravidez",
                "entender o desenvolvimento do bebê",
                "saber o que merece atenção agora",
                "organizar exames e consultas",
                "acompanhar os próximos passos"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 justify-start bg-white/10 rounded-xl px-4 py-2.5">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#00A63E] rounded-full flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span className="text-white font-medium text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <p className="text-white/80 mb-4 font-semibold">
            E ainda recebe como bônus:
          </p>
          
          <div className="bg-[#00A63E]/20 border border-[#00A63E]/40 rounded-xl p-5 mb-8">
            <ul className="space-y-3">
              {["Checklist da Consulta Pré-Natal", "Checklist da Maternidade", "Perguntas para levar ao obstetra"].map((bonus, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#00A63E] rounded-full flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span className="text-white font-semibold text-sm">{bonus}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <p className="text-white/80 text-lg mb-2">Condição especial de hoje</p>
          
          <div className="mb-6">
            <span className="text-white/60 line-through text-xl">De R$ 37,90</span>
            <div className="text-5xl font-black text-white">R$ 19,90</div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6 text-white/80 text-sm">
            <span>Pagamento único</span>
            <span className="w-1 h-1 rounded-full bg-white/40 mt-2" />
            <span>Acesso imediato</span>
          </div>
          
          <Button 
            onClick={() => handleCTAClick('InitiateCheckout')} 
            variant="primary"
            className="w-full max-w-sm mx-auto text-lg"
          >
            QUERO ACESSAR AGORA
          </Button>
          
          <div className="flex items-center justify-center gap-4 mt-6 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantia de 7 dias</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SEÇÃO 10 — GARANTIA */}
      {/* ========================================== */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#F8F7FF] rounded-2xl p-8 text-center border border-[#8B5CF6]/20">
            <div className="mx-auto mb-6 flex items-center justify-center">
              <img 
                src="https://res.cloudinary.com/dynjqdxw8/image/upload/v1773801684/ChatGPT_Image_17_de_mar._de_2026__22_41_10-removebg-preview_cau976.webp" 
                alt="Selo de Garantia 7 dias" 
                className="w-44 h-44 object-contain"
              />
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold text-brand-text mb-4">
              Você tem 7 dias de garantia para conhecer o Gravidez Organizada com tranquilidade
            </h2>
            
            <p className="text-brand-text-muted mb-4">
              Entre, explore e veja se ele faz sentido para este momento da sua gravidez.
            </p>
            
            <p className="text-brand-text-muted">
              Se dentro de 7 dias você entender que o Gravidez Organizada não é para você, poderá solicitar o cancelamento conforme as condições informadas.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-brand-text-muted">
            <span>Acesso imediato no celular</span>
            <span className="w-1 h-1 rounded-full bg-[#8B5CF6]/40" />
            <span>Garantia de 7 dias</span>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SEÇÃO 11 — FAQ */}
      {/* ========================================== */}
      <section className="py-12 md:py-16 px-4 bg-[#F8F7FF]">
        <div className="max-w-3xl mx-auto">
          <SectionTitle className="mb-8">
            Perguntas frequentes
          </SectionTitle>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <FAQItem question="Como recebo o acesso?" answer="O acesso é liberado após a confirmação da compra, com as orientações enviadas para você." />
            <FAQItem question="Preciso baixar o aplicativo?" answer="Não necessariamente. O acesso pode ser feito de forma prática pelo celular." />
            <FAQItem question="Funciona em qualquer celular?" answer="Sim. A plataforma foi pensada para funcionar no celular de forma simples e prática." />
            <FAQItem question="Posso usar mesmo se já estiver com vários meses?" answer="Sim. Você pode usar em diferentes fases da gravidez." />
            <FAQItem question="Serve para quem acabou de descobrir a gravidez?" answer="Sim. O Gravidez Organizada ajuda desde o início a acompanhar a gravidez com mais clareza." />
            <FAQItem question="Isso substitui acompanhamento médico?" answer="Não. O Gravidez Organizada é uma ferramenta de apoio e organização. Não substitui acompanhamento médico profissional." />
            <FAQItem question="O pagamento é mensal?" answer="Não. O pagamento é único." />
            <FAQItem question="Recebo acesso logo após a compra?" answer="Sim. O acesso é liberado após a confirmação do pagamento." />
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* SEÇÃO 12 — CTA FINAL */}
      {/* ========================================== */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle>
            Tenha sua gravidez mais clara, organizada e acompanhada em um só lugar
          </SectionTitle>
          
          <p className="text-base md:text-lg text-brand-text-muted mb-8 max-w-2xl mx-auto">
            Se você quer entender melhor cada etapa da gravidez, acompanhar o desenvolvimento do bebê e visualizar o que realmente importa agora com mais praticidade, o Gravidez Organizada foi feito para isso.
          </p>
          
          <Button onClick={() => handleCTAClick('Lead')} className="w-full max-w-sm mx-auto">
            QUERO MEU GPS DA GESTAÇÃO AGORA
          </Button>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm font-medium text-brand-text-muted">
            <span>Compra Segura</span>
            <span className="w-1 h-1 rounded-full bg-[#8B5CF6]/40" />
            <span>Acesso Mobile</span>
            <span className="w-1 h-1 rounded-full bg-[#8B5CF6]/40" />
            <span>Pagamento único</span>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* RODAPÉ */}
      {/* ========================================== */}
      <footer className="py-8 px-4 bg-[#F8F7FF] border-t border-[#8B5CF6]/10 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 bg-[#8B5CF6] rounded-lg flex items-center justify-center">
            <Heart className="text-white w-4 h-4" fill="currentColor" />
          </div>
          <span className="font-bold text-brand-text">Gravidez Organizada</span>
        </div>
        <p className="text-xs md:text-sm text-brand-text-muted max-w-lg mx-auto">
          © 2026 Gravidez Organizada. Todos os direitos reservados.<br/>
          O Gravidez Organizada é uma ferramenta de apoio e organização da gravidez. Não substitui acompanhamento médico profissional.
        </p>
      </footer>
    </div>
  );
}
