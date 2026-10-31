'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { COURSE_PLANS, Plan } from '@/data/courseData';
import {
  ShieldCheck,
  Check,
  CreditCard,
  QrCode,
  FileText,
  Lock,
  ArrowLeft,
  Sparkles,
  Award,
  CheckCircle2
} from 'lucide-react';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plano') || 'pro';

  const selectedPlan: Plan = COURSE_PLANS.find((p) => p.id === planParam) || COURSE_PLANS[1];

  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'pix' | 'boleto'>('credit_card');
  const [installments, setInstallments] = useState('12');
  const [success, setSuccess] = useState(false);

  // Mock Form fields
  const [name, setName] = useState('Mariana Silveira');
  const [email, setEmail] = useState('mariana.foto@gmail.com');
  const [phone, setPhone] = useState('(11) 98765-4321');
  const [cpf, setCpf] = useState('321.654.987-00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div style={{ background: '#07090d', minHeight: '100vh', color: '#f8fafc', padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        {/* Back Link */}
        <Link
          href="/#planos"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#94a3b8',
            fontSize: '0.88rem',
            marginBottom: '28px',
          }}
        >
          <ArrowLeft size={16} />
          Voltar para os Planos
        </Link>

        {success ? (
          <div className="glass-panel" style={{ padding: '60px 32px', textAlign: 'center', borderRadius: '24px' }}>
            <CheckCircle2 size={64} color="#10b981" style={{ margin: '0 auto 20px' }} />
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
              Parabéns! Sua Matrícula foi Confirmada
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 28px', lineHeight: 1.6 }}>
              Enviamos os dados de acesso imediatos para o seu e-mail (<strong>{email}</strong>). Você já pode entrar na Área do Aluno e começar sua primeira aula gravada em 4K.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/aluno" className="btn-primary" style={{ padding: '14px 28px' }}>
                <span>Entrar na Área do Aluno Agora</span>
              </Link>
              <Link href="/" className="btn-secondary" style={{ padding: '14px 24px' }}>
                Voltar à Página Inicial
              </Link>
            </div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 380px',
            gap: '32px',
          }} className="checkout-grid">
            {/* Left: Checkout Form */}
            <div>
              <div style={{ marginBottom: '24px' }}>
                <span className="badge badge-gold" style={{ marginBottom: '8px' }}>
                  FINALIZAR MATRÍCULA COM DESCONTO
                </span>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
                  Inscrição no {selectedPlan.name}
                </h1>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  Preencha seus dados para liberar acesso imediato à plataforma e aos materiais.
                </p>
              </div>

              {/* Personal Data */}
              <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#f59e0b',
                    color: '#07090d',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>1</span>
                  Dados Cadastrais
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>
                      Nome Completo:
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>
                      E-mail (para receber o acesso):
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>
                      WhatsApp com DDD:
                    </label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#f59e0b',
                    color: '#07090d',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>2</span>
                  Forma de Pagamento
                </h3>

                {/* Tabs for payment options */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credit_card')}
                    style={{
                      padding: '12px 10px',
                      borderRadius: '10px',
                      background: paymentMethod === 'credit_card' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.04)',
                      border: paymentMethod === 'credit_card' ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.08)',
                      color: paymentMethod === 'credit_card' ? '#fbbf24' : '#cbd5e1',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}
                  >
                    <CreditCard size={18} />
                    <span>Cartão de Crédito</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    style={{
                      padding: '12px 10px',
                      borderRadius: '10px',
                      background: paymentMethod === 'pix' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.04)',
                      border: paymentMethod === 'pix' ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.08)',
                      color: paymentMethod === 'pix' ? '#34d399' : '#cbd5e1',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}
                  >
                    <QrCode size={18} />
                    <span>PIX (Imediato)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('boleto')}
                    style={{
                      padding: '12px 10px',
                      borderRadius: '10px',
                      background: paymentMethod === 'boleto' ? 'rgba(96, 165, 250, 0.15)' : 'rgba(255,255,255,0.04)',
                      border: paymentMethod === 'boleto' ? '1px solid #60a5fa' : '1px solid rgba(255,255,255,0.08)',
                      color: paymentMethod === 'boleto' ? '#60a5fa' : '#cbd5e1',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}
                  >
                    <FileText size={18} />
                    <span>Boleto Bancário</span>
                  </button>
                </div>

                {/* Credit Card Form Fields */}
                {paymentMethod === 'credit_card' && (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>
                        Número do Cartão:
                      </label>
                      <input
                        type="text"
                        placeholder="•••• •••• •••• 4242"
                        required
                        defaultValue="5502 8812 3491 8844"
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          borderRadius: '8px',
                          color: '#ffffff',
                          fontFamily: 'var(--font-mono)'
                        }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>
                          Validade (MM/AA):
                        </label>
                        <input
                          type="text"
                          placeholder="11/29"
                          required
                          defaultValue="10/28"
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: '8px',
                            color: '#ffffff',
                            fontFamily: 'var(--font-mono)'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>
                          CVV:
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          required
                          defaultValue="882"
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: '8px',
                            color: '#ffffff',
                            fontFamily: 'var(--font-mono)'
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>
                        Opções de Parcelamento:
                      </label>
                      <select
                        value={installments}
                        onChange={(e) => setInstallments(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          background: '#0d1117',
                          border: '1px solid rgba(255,255,255,0.12)',
                          borderRadius: '8px',
                          color: '#ffffff',
                          fontSize: '0.9rem'
                        }}
                      >
                        <option value="1">1x de R$ {selectedPlan.priceAnnualTotal.toFixed(2)} à vista</option>
                        <option value="3">3x de R$ {(selectedPlan.priceAnnualTotal / 3).toFixed(2)} sem juros</option>
                        <option value="6">6x de R$ {(selectedPlan.priceAnnualTotal / 6).toFixed(2)} sem juros</option>
                        <option value="12">12x de R$ {(selectedPlan.priceAnnualTotal / 12).toFixed(2)} (Recomendado)</option>
                      </select>
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '10px', padding: '14px' }}>
                      <Lock size={16} />
                      <span>Concluir Matrícula com Segurança</span>
                    </button>
                  </form>
                )}

                {paymentMethod === 'pix' && (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <div style={{
                      width: '140px',
                      height: '140px',
                      margin: '0 auto 16px',
                      background: '#ffffff',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '10px'
                    }}>
                      <QrCode size={110} color="#000000" />
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '14px' }}>
                      Escaneie o QR Code no app do seu banco ou use a chave Pix Copia e Cola abaixo:
                    </p>
                    <div style={{
                      padding: '10px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: '#fbbf24',
                      wordBreak: 'break-all',
                      marginBottom: '16px'
                    }}>
                      00020126580014BR.GOV.BCB.PIX0136lumina.master.academy.curso@pix.com520400005303986
                    </div>
                    <button onClick={() => setSuccess(true)} className="btn-primary" style={{ width: '100%' }}>
                      <span>Já Realizei o Pagamento via Pix</span>
                    </button>
                  </div>
                )}

                {paymentMethod === 'boleto' && (
                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <FileText size={42} color="#60a5fa" style={{ margin: '0 auto 12px' }} />
                    <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '16px' }}>
                      O boleto bancário será gerado e poderá levar até 2 dias úteis para compensação.
                    </p>
                    <button onClick={() => setSuccess(true)} className="btn-primary" style={{ width: '100%' }}>
                      <span>Gerar Boleto Bancário</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Order Summary */}
            <div>
              <div className="glass-panel" style={{ padding: '24px', borderRadius: '16px', position: 'sticky', top: '70px' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
                  Resumo do Pedido
                </h3>

                <div style={{ paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '16px' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fbbf24', marginBottom: '4px' }}>
                    {selectedPlan.name}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    {selectedPlan.tagline}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', marginBottom: '20px' }}>
                  {selectedPlan.features.slice(0, 4).map((feat, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                      <Check size={14} color="#10b981" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div style={{
                  padding: '16px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  fontSize: '0.85rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#94a3b8' }}>
                    <span>Valor original:</span>
                    <span style={{ textDecoration: 'line-through' }}>R$ {(selectedPlan.priceAnnualTotal * 1.4).toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#10b981' }}>
                    <span>Desconto turma atual:</span>
                    <span>- R$ {(selectedPlan.priceAnnualTotal * 0.4).toFixed(2)}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '8px',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    color: '#ffffff'
                  }}>
                    <span>Total:</span>
                    <span style={{ color: '#fbbf24' }}>R$ {selectedPlan.priceAnnualTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem', color: '#94a3b8' }}>
                  <ShieldCheck size={20} color="#10b981" style={{ flexShrink: 0 }} />
                  <span>Ambiente criptografado SSL 256-bit com 7 dias de garantia incondicional.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 850px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center', color: '#ffffff' }}>Carregando checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
