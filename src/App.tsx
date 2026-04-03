import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ChevronDown, 
  Baby, 
  ClipboardList, 
  ShieldCheck, 
  Heart, 
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
  MapPin,
  Sparkles,
  ListChecks,
  Lock,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import './index.css';

const CHECKOUT_URL = 'https://pay.cakto.com.br/koqudon_817260';

const IMG_MOCKUP = 'https://res.cloudinary.com/dynjqdxw8/image/upload/v1775175702/Screenshot_2026-04-01-12-54-03-294_com.google.android.googlequicksearchbox-edit_fnu9vc.webp';
const IMG_LIFESTYLE = 'https://res.cloudinary.com/dynjqdxw8/image/upload/v1775175704/1775051796297_cbugpx.webp';
const IMG_SELO = 'https://res.cloudinary.com/dynjqdxw8/image/upload/v1773801684/ChatGPT_Image_17_de_mar._de_2026__22_41_10-removebg-preview_cau976.webp';

const getUrlParams = () => {
  const params = new URLSearchParams(window.location.search);
  const trackingParams = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 
    'fbclid', 'gclid', 'ttclid', 'utm_id'
  ];
  const filteredParams = new URLSearchParams();
  trackingParams.forEach(param => {
    const value = params.get(param);
    if (value) filteredParams.set(param, value);
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
  size?: 'default' | 'lg';
}

const Button = ({ children, className = "", onClick, size = 'default' }: ButtonProps) => (
  <button 
    onClick={onClick}
    className={`
      rounded-full font-black tracking-wide transition-all duration-300 transform 
      active:scale-95 btn-pulse bg-[#00A63E] text-white hover:bg-[#008f35] shadow-lg hover:shadow-xl
      ${size === 'lg' ? 'px-10 py-5 text-base md:text-lg' : 'px-8 py-4 text-sm md:text-base'}
      ${className}
    `}
  >
    {children}
  </button>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#8B5CF6]/15 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left gap-4"
      >
        <span className={`text-base font-semibold ${isOpen ? 'text-[#8B5CF6]' : 'text-brand-text'}`}>{question}</span>
        <ChevronDown className={`w-5 h-5 text-[#8B5CF6] transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
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
            <p className="pb-5 text-brand-text-muted leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block bg-[#8B5CF6]/10 text-[#8B5CF6] text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">
    {children}
  </span>
);

export default function App() {
  const handleCTAClick = (eventName: string) => {
    trackEvent(eventName, { value: 19.90, currency: 'BRL' });
    window.location.href = getCheckoutUrl();
  };

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/5531992440099?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20o%20Gravidez%20Organizada"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl z-50 hover:scale-110 transition-all"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* ============================================================ */}
      {/* SEÇÃO 1 — HERO PRINCIPAL */}
      {/* ============================================================ */}
      <section className="pt-10 pb-12 md:pt-16 md:pb-20 px-4 bg-gradient-to-b from-white via-[#FAFAFF] to-[#F4F2FF]">
        <div className="max-w-5xl mx-auto">

          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-9 h-9 bg-[#8B5CF6] rounded-xl flex items-center justify-center shadow-md">
              <Heart className="text-white w-4 h-4" fill="currentColor" />
            </div>
            <span className="text-base font-bold text-brand-text tracking-tight">Gravidez Organizada</span>
          </div>

          {/* Layout hero: texto + imagem */}
          <div className="flex flex-col md:flex-row md:items-center md:gap-12 lg:gap-16">

            {/* Coluna de texto */}
            <div className="flex-1 text-center md:text-left order-1">
              <Badge>Seu GPS da Gestação</Badge>

              <h1 className="mt-4 text-3xl md:text-5xl font-black text-brand-text leading-[1.1] tracking-tight mb-5">
                Pare de abrir 1.000 abas no Google.<br />
                <span className="text-[#8B5CF6]">Acompanhe sua gravidez em um só lugar.</span>
              </h1>

              <p className="text-base md:text-lg text-brand-text-muted mb-7 max-w-lg md:mx-0 mx-auto leading-relaxed">
                Um app simples e prático que mostra exatamente em que fase você está, o que está acontecendo com o bebê, o que merece sua atenção agora e quais são os próximos passos. Tudo no celular, sem confusão.
              </p>

              {/* Bullets */}
              <div className="grid grid-cols-2 gap-2 mb-8 max-w-sm md:mx-0 mx-auto">
                {[
                  "Semana atual da gravidez",
                  "Desenvolvimento do bebê",
                  "O que merece atenção agora",
                  "Próximos passos organizados"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-brand-text">
                    <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" onClick={() => handleCTAClick('Lead')} className="w-full md:w-auto">
                QUERO MEU GPS DA GESTAÇÃO AGORA
              </Button>

              {/* Microprovas */}
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1 mt-5 text-xs font-medium text-brand-text-muted">
                <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Compra segura</span>
                <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Acesso imediato</span>
                <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Pagamento único</span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Garantia de 7 dias</span>
              </div>
            </div>

            {/* Mockup do app — imagem real */}
            <div className="order-2 md:order-2 flex justify-center mt-8 md:mt-0 flex-shrink-0">
              <div className="relative">
                {/* Glow de fundo */}
                <div className="absolute inset-0 bg-[#8B5CF6]/20 rounded-3xl blur-3xl scale-110 -z-10" />
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#8B5CF6]/10 max-w-[280px] md:max-w-[300px]">
                  {/* Barra de status mockup */}
                  <div className="bg-[#8B5CF6] px-4 py-3 flex items-center justify-between">
                    <span className="text-white text-xs font-bold">Gravidez Organizada</span>
                    <Heart className="w-4 h-4 text-white/80" fill="currentColor" />
                  </div>
                  <img
                    src={IMG_MOCKUP}
                    alt="Tela do app Gravidez Organizada mostrando desenvolvimento do bebê, exames e próximos passos"
                    className="w-full object-cover"
                    loading="eager"
                  />
                </div>
                {/* Badge flutuante */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-2 shadow-lg border border-[#8B5CF6]/10 flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#00A63E]/10 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#00A63E]" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-brand-text">Acesso Imediato</div>
                    <div className="text-[10px] text-brand-text-muted">após a compra</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SEÇÃO 2 — DOR / AGITAÇÃO */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 px-4 bg-[#8B5CF6]">
        <div className="max-w-3xl mx-auto text-center">
          <Badge>O problema real</Badge>
          <h2 className="mt-4 text-2xl md:text-4xl font-black text-white leading-tight mb-5">
            A gravidez já traz mudanças demais. Você não precisa carregar também o peso de mil informações soltas.
          </h2>
          <p className="text-base md:text-lg text-white/80 mb-4 leading-relaxed">
            Entre exames, consultas, sintomas, preparativos e tanto conteúdo espalhado, muitas gestantes ficam mentalmente sobrecarregadas, sem saber exatamente o que merece atenção em cada fase.
          </p>
          <p className="text-lg md:text-xl font-bold text-white mb-2">
            O problema não é falta de informação.
          </p>
          <p className="text-2xl font-black text-white mb-6">
            É excesso.
          </p>
          <p className="text-base text-white/70 mb-12">
            E quando tudo parece solto, vem a sensação de confusão, insegurança e medo de deixar passar algo importante.
          </p>
        </div>

        {/* 3 Cards de dor */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-4">
          {[
            { icon: Brain, title: "Informação demais", desc: "Você pesquisa, salva conteúdo, recebe conselho de todo mundo — e ainda assim continua com dúvidas." },
            { icon: AlertCircle, title: "Peso mental", desc: "Exames, consultas, sintomas e preparativos ficam todos acumulados na sua cabeça, sem organização." },
            { icon: Eye, title: "Medo de esquecer algo", desc: "É difícil saber o que é prioridade agora e o que pode esperar. A sensação de 'imprevisto' não vai embora." }
          ].map((item, i) => (
            <div key={i} className="bg-white/12 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/15">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-black text-white mb-2">{item.title}</h3>
              <p className="text-sm text-white/75 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SEÇÃO 3 — APRESENTAÇÃO DA SOLUÇÃO */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-14">

            {/* Imagem lifestyle */}
            <div className="flex-shrink-0 flex justify-center">
              <div className="relative max-w-[280px] w-full">
                <div className="absolute inset-0 bg-[#8B5CF6]/10 rounded-3xl blur-2xl scale-110 -z-10" />
                <img
                  src={IMG_LIFESTYLE}
                  alt="Gestante usando o app Gravidez Organizada no celular com praticidade e clareza"
                  className="w-full rounded-3xl shadow-xl object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Texto */}
            <div className="flex-1 text-center md:text-left">
              <Badge>A solução</Badge>
              <h2 className="mt-4 text-2xl md:text-4xl font-black text-brand-text leading-tight mb-5">
                Foi para isso que criamos o <span className="text-[#8B5CF6]">Gravidez Organizada.</span>
              </h2>
              <p className="text-base md:text-lg text-brand-text-muted mb-5 leading-relaxed">
                Um app simples que reúne em um só lugar o que você realmente precisa: entender a fase atual, acompanhar o desenvolvimento do bebê, saber o que merece sua atenção agora e visualizar os próximos passos.
              </p>
              <p className="text-base text-brand-text-muted mb-8 leading-relaxed">
                Sem conteúdo espalhado. Sem sobrecarga. Sem confusão. <strong className="text-brand-text">Tudo simples, claro e fácil de usar no celular.</strong>
              </p>
              <Button onClick={() => handleCTAClick('Lead')}>
                QUERO TER MAIS CLAREZA NA MINHA GRAVIDEZ
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SEÇÃO 4 — MECANISMO ÚNICO — GPS DA GESTAÇÃO */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 px-4 bg-[#F4F2FF]">
        <div className="max-w-4xl mx-auto text-center">
          <Badge>Como funciona</Badge>
          <h2 className="mt-4 text-2xl md:text-4xl font-black text-brand-text leading-tight mb-3">
            Seu GPS da Gestação em 4 pontos simples
          </h2>
          <p className="text-base md:text-lg text-brand-text-muted mb-10 max-w-xl mx-auto leading-relaxed">
            Uma forma prática de acompanhar sua gravidez sem depender de informações espalhadas.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              { num: "01", icon: MapPin, title: "Onde você está agora", desc: "Veja exatamente em que semana e fase da gravidez você está, com contexto claro e direto." },
              { num: "02", icon: Baby, title: "O que está acontecendo com o bebê", desc: "Entenda o desenvolvimento do bebê na fase atual de forma simples e acessível." },
              { num: "03", icon: Sparkles, title: "O que merece sua atenção agora", desc: "Saiba o que observar, acompanhar e organizar neste momento — sem precisar pesquisar em outros lugares." },
              { num: "04", icon: ArrowRight, title: "O que vem a seguir", desc: "Visualize os próximos passos com clareza, sem ansiedade e sem aquela sensação de estar no improviso." }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-left border border-[#8B5CF6]/10 shadow-sm flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#8B5CF6] rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-black text-[#8B5CF6] tracking-widest uppercase">{item.num}</span>
                  <h3 className="font-black text-brand-text mb-1 mt-0.5">{item.title}</h3>
                  <p className="text-sm text-brand-text-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SEÇÃO 5 — O QUE VOCÊ ENCONTRA NO PRODUTO */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <Badge>O que está incluído</Badge>
            <h2 className="mt-4 text-2xl md:text-4xl font-black text-brand-text leading-tight mb-3">
              Tudo o que você encontra no Gravidez Organizada
            </h2>
            <p className="text-base md:text-lg text-brand-text-muted max-w-xl mx-auto leading-relaxed">
              Um painel no celular pensado para ajudar você a acompanhar a gravidez com mais clareza e muito menos confusão.
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">

            {/* Cards de features */}
            <div className="flex-1 grid grid-cols-1 gap-3">
              {[
                { icon: Calendar, title: "Semana atual da gravidez", desc: "Saiba exatamente em que fase você está, com orientação clara e contextualizada." },
                { icon: Baby, title: "Desenvolvimento do bebê", desc: "Entenda o que está acontecendo com o bebê em cada etapa da gestação." },
                { icon: Compass, title: "O que merece sua atenção agora", desc: "Veja o que é importante no momento atual, sem precisar filtrar sozinha." },
                { icon: Stethoscope, title: "Exames e consultas", desc: "Organize e acompanhe seus exames e consultas de forma prática." },
                { icon: ListChecks, title: "Próximos passos", desc: "Visualize o que vem à frente sem se sentir perdida ou sobrecarregada." },
                { icon: ClipboardList, title: "Checklists práticos", desc: "Apoio para você não deixar passar pontos importantes da sua gravidez." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 bg-[#F8F7FF] rounded-xl p-4 border border-[#8B5CF6]/8">
                  <div className="w-10 h-10 bg-[#8B5CF6] rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-brand-text text-sm mb-0.5">{item.title}</h3>
                    <p className="text-xs text-brand-text-muted leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mockup do app ao lado */}
            <div className="flex-shrink-0 flex justify-center md:justify-end">
              <div className="relative max-w-[240px] w-full">
                <div className="absolute inset-0 bg-[#8B5CF6]/15 rounded-3xl blur-2xl scale-110 -z-10" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#8B5CF6]/10">
                  <div className="bg-[#8B5CF6] px-4 py-2.5 flex items-center justify-between">
                    <span className="text-white text-xs font-bold">Gravidez Organizada</span>
                    <Heart className="w-3.5 h-3.5 text-white/80" fill="currentColor" />
                  </div>
                  <img
                    src={IMG_MOCKUP}
                    alt="App Gravidez Organizada mostrando o painel completo da gestação"
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="mt-10 text-center">
            <Button size="lg" onClick={() => handleCTAClick('Lead')}>
              QUERO ACESSAR AGORA — R$ 19,90
            </Button>
            <p className="mt-3 text-xs text-brand-text-muted">Acesso imediato • Pagamento único • Garantia de 7 dias</p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SEÇÃO 6 — COMPARATIVO */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 px-4 bg-[#F2F2F5]">
        <div className="max-w-4xl mx-auto text-center">
          <Badge>Por que é diferente</Badge>
          <h2 className="mt-4 text-2xl md:text-4xl font-black text-brand-text leading-tight mb-10">
            Por que não é a mesma coisa que buscar informações soltas na internet?
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Coluna negativa */}
            <div className="bg-white rounded-2xl p-6 text-left shadow-sm border border-red-100">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-red-100">
                <div className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-400 text-sm font-black">✕</span>
                </div>
                <h3 className="font-black text-red-500">Informações soltas</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Conteúdo espalhado em vários lugares",
                  "Dúvidas conflitantes a todo momento",
                  "Você não sabe o que é prioridade",
                  "Precisa filtrar tudo sozinha",
                  "Mais confusão e mais carga mental"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 bg-red-50 rounded-lg px-3 py-2.5 text-sm text-red-500">
                    <span className="font-black flex-shrink-0 mt-0.5">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna positiva */}
            <div className="bg-white rounded-2xl p-6 text-left shadow-md border-2 border-[#8B5CF6]">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-[#8B5CF6]/15">
                <div className="w-7 h-7 bg-[#8B5CF6] rounded-lg flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-black text-[#8B5CF6]">Gravidez Organizada</h3>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Fase atual em um único lugar, com clareza",
                  "Desenvolvimento do bebê explicado de forma simples",
                  "Você sabe o que importa agora",
                  "Próximos passos organizados e acessíveis",
                  "Mais leveza mental e praticidade no dia a dia"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 bg-[#F4F2FF] rounded-lg px-3 py-2.5 text-sm text-brand-text">
                    <CheckCircle2 className="w-4 h-4 text-[#8B5CF6] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-white inline-block rounded-2xl px-8 py-5 shadow-sm border border-[#8B5CF6]/10">
            <p className="text-xl font-black text-brand-text">Mais clareza. Menos confusão.</p>
            <p className="text-xl font-black text-[#8B5CF6]">Mais organização. Menos carga mental.</p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SEÇÃO 7 — PARA QUEM É */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-14">

            <div className="flex-1 text-center md:text-left">
              <Badge>Para quem é</Badge>
              <h2 className="mt-4 text-2xl md:text-4xl font-black text-brand-text leading-tight mb-6">
                Ideal para a gestante que quer clareza — sem depender de mil abas abertas no Google
              </h2>
              <div className="space-y-3">
                {[
                  "Quer entender melhor a fase atual da gravidez",
                  "Sente que tem informação demais e direção de menos",
                  "Quer acompanhar o desenvolvimento do bebê com mais clareza",
                  "Quer organizar exames, consultas e próximos passos",
                  "Quer praticidade e organização no celular"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-[#F8F7FF] rounded-xl px-4 py-3 border border-[#8B5CF6]/8">
                    <div className="w-8 h-8 bg-[#8B5CF6] rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-brand-text font-medium text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Imagem lifestyle */}
            <div className="flex-shrink-0 flex justify-center">
              <div className="relative max-w-[260px] w-full">
                <div className="absolute inset-0 bg-[#8B5CF6]/10 rounded-3xl blur-2xl scale-110 -z-10" />
                <img
                  src={IMG_LIFESTYLE}
                  alt="Gestante usando o aplicativo no celular com praticidade"
                  className="w-full rounded-3xl shadow-xl object-cover"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SEÇÃO 8 — BÔNUS */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 px-4 bg-[#F4F2FF]">
        <div className="max-w-4xl mx-auto text-center">
          <Badge>Bônus exclusivos</Badge>
          <h2 className="mt-4 text-2xl md:text-4xl font-black text-brand-text leading-tight mb-3">
            Três bônus para deixar sua rotina ainda mais tranquila
          </h2>
          <p className="text-base text-brand-text-muted mb-10 max-w-xl mx-auto">
            Incluídos gratuitamente no seu acesso ao Gravidez Organizada.
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Stethoscope,
                label: "Bônus 1",
                title: "Checklist da Consulta Pré-Natal",
                desc: "Um guia direto para você chegar em cada consulta mais preparada, sem esquecer perguntas e pontos importantes."
              },
              {
                icon: ShoppingBag,
                label: "Bônus 2",
                title: "Checklist da Maternidade",
                desc: "Uma lista prática e objetiva para ajudar você a se preparar para o grande momento sem o peso de ter que lembrar de tudo sozinha."
              },
              {
                icon: MessageCircleQuestion,
                label: "Bônus 3",
                title: "Perguntas para levar ao obstetra",
                desc: "Um material de apoio com perguntas úteis para esclarecer dúvidas importantes nas suas consultas."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#8B5CF6]/15 shadow-sm text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#8B5CF6] rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-black text-[#8B5CF6] uppercase tracking-widest">{item.label}</span>
                </div>
                <h3 className="font-black text-brand-text mb-2 text-base">{item.title}</h3>
                <p className="text-sm text-brand-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SEÇÃO 9 — OFERTA */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 px-4 bg-[#8B5CF6]">
        <div className="max-w-3xl mx-auto text-center">

          {/* Título */}
          <h2 className="text-2xl md:text-4xl font-black text-white mb-3 leading-tight">
            Acesso completo ao Gravidez Organizada por pagamento único
          </h2>
          <p className="text-white/80 mb-8 text-base">
            Sem mensalidade. Sem assinatura. Uma única compra, acesso imediato.
          </p>

          {/* Box de oferta */}
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl mb-6">

            {/* O que está incluído */}
            <p className="text-sm font-black text-[#8B5CF6] uppercase tracking-widest mb-4">O que você recebe:</p>
            <ul className="space-y-2.5 mb-6">
              {[
                "Ver sua fase atual da gravidez com clareza",
                "Acompanhar o desenvolvimento do bebê semana a semana",
                "Saber o que merece sua atenção agora",
                "Organizar exames e consultas",
                "Visualizar os próximos passos sem ansiedade"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 bg-[#F8F7FF] rounded-xl px-4 py-2.5 text-sm text-brand-text text-left">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#8B5CF6] rounded-full flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>

            {/* Bônus dentro da oferta */}
            <div className="bg-[#00A63E]/8 border border-[#00A63E]/25 rounded-2xl p-4 mb-6">
              <p className="text-xs font-black text-[#00A63E] uppercase tracking-widest mb-3">+ 3 Bônus incluídos:</p>
              <ul className="space-y-2">
                {[
                  "Checklist da Consulta Pré-Natal",
                  "Checklist da Maternidade",
                  "Perguntas para levar ao obstetra"
                ].map((bonus, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="flex-shrink-0 w-5 h-5 bg-[#00A63E] rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </span>
                    <span className="text-sm font-semibold text-brand-text">{bonus}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preço */}
            <div className="mb-5">
              <p className="text-xs font-bold text-brand-text-muted uppercase tracking-widest mb-1">Condição especial de hoje</p>
              <p className="text-brand-text-muted line-through text-base">De R$ 37,90</p>
              <div className="flex items-baseline justify-center gap-1 mt-1">
                <span className="text-lg font-bold text-brand-text-muted">por apenas</span>
                <span className="text-5xl font-black text-[#8B5CF6]">R$ 19,90</span>
              </div>
              <p className="text-xs text-brand-text-muted mt-1">Pagamento único · Acesso imediato</p>
            </div>

            <Button size="lg" onClick={() => handleCTAClick('InitiateCheckout')} className="w-full">
              QUERO ACESSAR AGORA
            </Button>

            <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-brand-text-muted">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Compra segura</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Garantia de 7 dias</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Acesso imediato</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SEÇÃO 10 — GARANTIA */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#F8F7FF] rounded-3xl p-8 md:p-10 text-center border border-[#8B5CF6]/15 shadow-sm">
            <div className="mx-auto mb-6 flex items-center justify-center">
              <img
                src={IMG_SELO}
                alt="Selo de Garantia 7 dias — Gravidez Organizada"
                className="w-[264px] h-[264px] object-contain"
                loading="lazy"
              />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-brand-text mb-4">
              Você tem 7 dias de garantia para conhecer o Gravidez Organizada com tranquilidade
            </h2>
            <p className="text-brand-text-muted mb-3 leading-relaxed">
              Entre, explore e veja se ele faz sentido para este momento da sua gravidez.
            </p>
            <p className="text-brand-text-muted leading-relaxed">
              Se dentro de 7 dias você entender que o Gravidez Organizada não é para você, pode solicitar o reembolso conforme as condições informadas na plataforma.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-semibold text-[#8B5CF6]">
              <span>✓ Acesso imediato no celular</span>
              <span>✓ Garantia de 7 dias</span>
              <span>✓ Pagamento único</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SEÇÃO 11 — FAQ */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 px-4 bg-[#F8F7FF]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <Badge>Dúvidas</Badge>
            <h2 className="mt-4 text-2xl md:text-4xl font-black text-brand-text leading-tight">
              Perguntas frequentes
            </h2>
          </div>
          <div className="bg-white rounded-2xl px-6 shadow-sm border border-[#8B5CF6]/8">
            <FAQItem question="Como recebo o acesso?" answer="O acesso é liberado imediatamente após a confirmação da compra. Você receberá as instruções por e-mail." />
            <FAQItem question="Preciso baixar um aplicativo?" answer="Não necessariamente. O acesso pode ser feito de forma prática direto pelo navegador do celular, sem precisar instalar nada." />
            <FAQItem question="Funciona em qualquer celular?" answer="Sim. A plataforma foi desenvolvida para funcionar bem em qualquer celular, de forma simples e prática." />
            <FAQItem question="Posso usar mesmo estando com vários meses de gravidez?" answer="Sim. Você pode usar em qualquer fase da gravidez e acompanhar a partir de onde você está agora." />
            <FAQItem question="Serve para quem acabou de descobrir a gravidez?" answer="Sim. O Gravidez Organizada ajuda desde o início da gestação a acompanhar cada etapa com mais clareza." />
            <FAQItem question="Isso substitui o acompanhamento médico?" answer="Não. O Gravidez Organizada é uma ferramenta de apoio e organização pessoal. Ele não substitui o acompanhamento médico profissional." />
            <FAQItem question="O pagamento é mensal?" answer="Não. O pagamento é único. Você paga uma vez e acessa sem cobranças recorrentes." />
            <FAQItem question="Recebo acesso logo após a compra?" answer="Sim. O acesso é liberado automaticamente após a confirmação do pagamento." />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SEÇÃO 12 — CTA FINAL */}
      {/* ============================================================ */}
      <section className="py-14 md:py-20 px-4 bg-gradient-to-b from-white to-[#F4F2FF]">
        <div className="max-w-2xl mx-auto text-center">
          <Badge>Comece agora</Badge>
          <h2 className="mt-4 text-2xl md:text-4xl font-black text-brand-text leading-tight mb-5">
            Sua gravidez mais clara, organizada e acompanhada — tudo em um único lugar
          </h2>
          <p className="text-base md:text-lg text-brand-text-muted mb-8 leading-relaxed">
            Se você quer entender melhor cada etapa da gravidez, acompanhar o desenvolvimento do bebê e saber o que realmente importa agora — com praticidade e sem sobrecarga, o Gravidez Organizada foi feito para você.
          </p>

          <Button size="lg" onClick={() => handleCTAClick('Lead')} className="w-full max-w-sm mx-auto">
            QUERO MEU GPS DA GESTAÇÃO AGORA
          </Button>

          <div className="flex flex-wrap justify-center gap-4 mt-5 text-xs font-medium text-brand-text-muted">
            <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Compra segura</span>
            <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Acesso imediato</span>
            <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Pagamento único</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Garantia 7 dias</span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* RODAPÉ */}
      {/* ============================================================ */}
      <footer className="py-8 px-4 bg-[#F8F7FF] border-t border-[#8B5CF6]/10 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-7 h-7 bg-[#8B5CF6] rounded-lg flex items-center justify-center">
            <Heart className="text-white w-3.5 h-3.5" fill="currentColor" />
          </div>
          <span className="font-black text-brand-text text-sm">Gravidez Organizada</span>
        </div>
        <p className="text-xs text-brand-text-muted max-w-lg mx-auto leading-relaxed">
          © 2026 Gravidez Organizada. Todos os direitos reservados.<br />
          O Gravidez Organizada é uma ferramenta de apoio e organização pessoal da gestação. Não substitui o acompanhamento médico profissional.
        </p>
      </footer>

    </div>
  );
}
