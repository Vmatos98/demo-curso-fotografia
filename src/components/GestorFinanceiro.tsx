'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  UserMinus,
  UserPlus,
  CreditCard,
  Percent,
  ShieldCheck,
  Target,
  Download,
  BarChart3,
  PieChart,
  HelpCircle,
  AlertCircle,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Zap,
  Filter
} from 'lucide-react';
import { FINANCIAL_MONTHLY_DATA, MonthFinancialRecord } from '@/data/courseData';

export default function GestorFinanceiro() {
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(FINANCIAL_MONTHLY_DATA.length - 1);
  const [viewMode, setViewMode] = useState<'grafico' | 'tabela'>('grafico');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [targetGrowth, setTargetGrowth] = useState<number>(20); // Simulação de crescimento %

  const currentMonthData = FINANCIAL_MONTHLY_DATA[selectedMonthIndex];

  // Totais do ano acumulados
  const totalAnnualRevenue = FINANCIAL_MONTHLY_DATA.reduce((acc, m) => acc + m.revenue, 0);
  const totalNewStudents = FINANCIAL_MONTHLY_DATA.reduce((acc, m) => acc + m.newStudents, 0);
  const totalCancellations = FINANCIAL_MONTHLY_DATA.reduce((acc, m) => acc + m.cancellations, 0);
  const totalNetStudents = totalNewStudents - totalCancellations;
  const avgChurnRate = (
    FINANCIAL_MONTHLY_DATA.reduce((acc, m) => acc + m.churnRate, 0) / FINANCIAL_MONTHLY_DATA.length
  ).toFixed(2);
  const totalProfit = FINANCIAL_MONTHLY_DATA.reduce((acc, m) => acc + m.netProfit, 0);
  const avgProfitMargin = (
    FINANCIAL_MONTHLY_DATA.reduce((acc, m) => acc + m.profitMargin, 0) / FINANCIAL_MONTHLY_DATA.length
  ).toFixed(1);

  // Valor máximo de receita para normalizar as barras do gráfico
  const maxRevenue = Math.max(...FINANCIAL_MONTHLY_DATA.map((m) => m.revenue));

  const handleExportCSV = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  // Projeção calculada para o simulador
  const projectedRevenue = Math.round(currentMonthData.revenue * (1 + targetGrowth / 100));
  const projectedStudents = Math.round(currentMonthData.newStudents * (1 + targetGrowth / 100));
  const additionalProfit = Math.round((projectedRevenue - currentMonthData.revenue) * 0.76);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header do Painel Financeiro */}
      <div
        className="glass-panel"
        style={{
          padding: '28px',
          background: 'linear-gradient(180deg, rgba(16, 22, 34, 0.85) 0%, rgba(10, 14, 22, 0.95) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
              Saúde Financeira & Unit Economics
            </h2>
            <span
              style={{
                fontSize: '0.72rem',
                padding: '3px 10px',
                borderRadius: '9999px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <ShieldCheck size={14} /> Score 94/100 · Altamente Saudável
            </span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.86rem', marginTop: '4px' }}>
            Acompanhamento histórico mês a mês de MRR, aquisição de novos alunos, cancelamentos (churn) e margens operacionais.
          </p>
        </div>

        {/* Ações de Relatório */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontSize: '0.84rem',
              color: '#cbd5e1',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Calendar size={15} style={{ color: '#f59e0b' }} />
            Exercício: 2026 (Jan - Out)
          </div>

          <button
            onClick={handleExportCSV}
            className="btn-secondary btn-sm"
            style={{
              padding: '8px 16px',
              fontSize: '0.82rem',
              gap: '6px',
              background: downloadSuccess ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.06)',
              color: downloadSuccess ? '#10b981' : '#ffffff',
              border: downloadSuccess ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.12)'
            }}
          >
            {downloadSuccess ? <CheckCircle2 size={16} /> : <Download size={16} />}
            <span>{downloadSuccess ? 'Relatório Baixado (CSV)' : 'Exportar DRE Financeiro'}</span>
          </button>
        </div>
      </div>

      {/* 2. Top 6 Cards de Indicadores Financeiros */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '18px'
        }}
      >
        {/* Faturamento Anual Acumulado */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>FATURAMENTO ANUAL (YTD)</span>
            <div style={{ padding: '7px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              <DollarSign size={17} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
            R$ {totalAnnualRevenue.toLocaleString('pt-BR')}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={14} /> +34.2% em relação a 2025
          </div>
        </div>

        {/* MRR Atual */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>MRR ATUAL (MENSAL)</span>
            <div style={{ padding: '7px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
              <CreditCard size={17} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
            R$ {currentMonthData.mrr.toLocaleString('pt-BR')}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#f59e0b' }}>
            +R$ 1.720 adicionados este mês
          </div>
        </div>

        {/* Aquisição Líquida de Alunos */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>SALDO LÍQUIDO DE ALUNOS</span>
            <div style={{ padding: '7px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
              <UserPlus size={17} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
            +{totalNetStudents}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
            <span style={{ color: '#10b981', fontWeight: 600 }}>+{totalNewStudents}</span> novas matrículas / <span style={{ color: '#ef4444' }}>-{totalCancellations}</span> saídas
          </div>
        </div>

        {/* Churn Rate Mensal */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>TAXA DE CHURN MÉDIA</span>
            <div style={{ padding: '7px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.15)', color: '#f87171' }}>
              <UserMinus size={17} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
            {avgChurnRate}% <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>/mês</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#10b981' }}>
            Excelente: mercado oscila entre 5% a 8%
          </div>
        </div>

        {/* LTV vs CAC */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>LTV / CAC (RETORNO)</span>
            <div style={{ padding: '7px', borderRadius: '8px', background: 'rgba(167, 139, 250, 0.15)', color: '#a78bfa' }}>
              <Target size={17} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
            5.8x
          </div>
          <div style={{ fontSize: '0.78rem', color: '#a78bfa' }}>
            LTV: R$ 1.280 · CAC: R$ 220
          </div>
        </div>

        {/* Lucro Líquido Acumulado */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>LUCRO LÍQUIDO ACUMULADO</span>
            <div style={{ padding: '7px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
              <Percent size={17} />
            </div>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
            R$ {totalProfit.toLocaleString('pt-BR')}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#06b6d4' }}>
            Margem Líquida Média de {avgProfitMargin}%
          </div>
        </div>
      </div>

      {/* 3. Seção Mês a Mês: Gráfico Interativo ou Tabela Comparativa */}
      <div className="glass-panel" style={{ padding: '28px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            marginBottom: '24px'
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>
              Evolução Mensal de Receita & Aquisição de Alunos
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: '2px' }}>
              Clique em qualquer mês para analisar o raio-X completo com novas matrículas e cancelamentos.
            </p>
          </div>

          {/* Toggle Gráfico vs Tabela */}
          <div
            style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '10px',
              padding: '3px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <button
              onClick={() => setViewMode('grafico')}
              style={{
                padding: '7px 14px',
                borderRadius: '7px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: viewMode === 'grafico' ? '#ffffff' : '#94a3b8',
                background: viewMode === 'grafico' ? 'rgba(16, 185, 129, 0.3)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s'
              }}
            >
              <BarChart3 size={15} />
              Gráfico Visual
            </button>
            <button
              onClick={() => setViewMode('tabela')}
              style={{
                padding: '7px 14px',
                borderRadius: '7px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: viewMode === 'tabela' ? '#ffffff' : '#94a3b8',
                background: viewMode === 'tabela' ? 'rgba(16, 185, 129, 0.3)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s'
              }}
            >
              <Calendar size={15} />
              Tabela Mês a Mês
            </button>
          </div>
        </div>

        {/* MODO 1: GRÁFICO INTERATIVO DE BARRAS */}
        {viewMode === 'grafico' && (
          <div>
            {/* Visual Bar Chart */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${FINANCIAL_MONTHLY_DATA.length}, 1fr)`,
                gap: '12px',
                alignItems: 'flex-end',
                height: '240px',
                padding: '20px 10px 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                marginBottom: '14px'
              }}
            >
              {FINANCIAL_MONTHLY_DATA.map((record, idx) => {
                const heightPercent = (record.revenue / maxRevenue) * 100;
                const isSelected = idx === selectedMonthIndex;

                return (
                  <div
                    key={record.month}
                    onClick={() => setSelectedMonthIndex(idx)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      height: '100%',
                      justifyContent: 'flex-end',
                      cursor: 'pointer',
                      gap: '8px'
                    }}
                  >
                    {/* Floating Value on Top */}
                    <div
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: isSelected ? '#10b981' : '#94a3b8',
                        fontFamily: 'monospace',
                        transition: 'color 0.2s'
                      }}
                    >
                      {(record.revenue / 1000).toFixed(1)}k
                    </div>

                    {/* Bar Pill */}
                    <div
                      style={{
                        width: '100%',
                        maxWidth: '46px',
                        height: `${heightPercent}%`,
                        borderRadius: '8px 8px 3px 3px',
                        background: isSelected
                          ? 'linear-gradient(180deg, #10b981 0%, #059669 100%)'
                          : 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                        boxShadow: isSelected ? '0 0 18px rgba(16, 185, 129, 0.45)' : 'none',
                        border: isSelected ? '1px solid #34d399' : '1px solid rgba(255, 255, 255, 0.06)',
                        transition: 'all 0.2s ease',
                        position: 'relative'
                      }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Month Labels Axis */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${FINANCIAL_MONTHLY_DATA.length}, 1fr)`,
                gap: '12px',
                textAlign: 'center'
              }}
            >
              {FINANCIAL_MONTHLY_DATA.map((record, idx) => {
                const isSelected = idx === selectedMonthIndex;
                return (
                  <button
                    key={record.month}
                    onClick={() => setSelectedMonthIndex(idx)}
                    style={{
                      padding: '6px 0',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: isSelected ? '#ffffff' : '#64748b',
                      background: isSelected ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                      border: isSelected ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
                      transition: 'all 0.2s'
                    }}
                  >
                    {record.month}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MODO 2: TABELA FINANCEIRA DETALHADA */}
        {viewMode === 'tabela' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8', fontSize: '0.78rem' }}>
                  <th style={{ padding: '12px 14px' }}>MÊS</th>
                  <th style={{ padding: '12px 14px' }}>FATURAMENTO</th>
                  <th style={{ padding: '12px 14px' }}>NOVOS ALUNOS</th>
                  <th style={{ padding: '12px 14px' }}>CANCELAMENTOS</th>
                  <th style={{ padding: '12px 14px' }}>SALDO LÍQUIDO</th>
                  <th style={{ padding: '12px 14px' }}>CHURN</th>
                  <th style={{ padding: '12px 14px' }}>TRÁFEGO (CAC)</th>
                  <th style={{ padding: '12px 14px' }}>LUCRO LÍQUIDO</th>
                  <th style={{ padding: '12px 14px' }}>MARGEM</th>
                </tr>
              </thead>
              <tbody>
                {FINANCIAL_MONTHLY_DATA.map((record, idx) => {
                  const isSelected = idx === selectedMonthIndex;
                  return (
                    <tr
                      key={record.month}
                      onClick={() => setSelectedMonthIndex(idx)}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                        background: isSelected ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                        cursor: 'pointer',
                        fontSize: '0.84rem',
                        transition: 'background 0.15s'
                      }}
                    >
                      <td style={{ padding: '14px', fontWeight: 700, color: isSelected ? '#10b981' : '#ffffff' }}>
                        {record.fullName}
                      </td>
                      <td style={{ padding: '14px', fontWeight: 700, color: '#f8fafc', fontFamily: 'monospace' }}>
                        R$ {record.revenue.toLocaleString('pt-BR')}
                      </td>
                      <td style={{ padding: '14px', color: '#10b981', fontWeight: 600 }}>
                        +{record.newStudents}
                      </td>
                      <td style={{ padding: '14px', color: '#f87171', fontWeight: 600 }}>
                        -{record.cancellations}
                      </td>
                      <td style={{ padding: '14px', fontWeight: 700, color: '#38bdf8' }}>
                        +{record.netStudents}
                      </td>
                      <td style={{ padding: '14px', color: '#cbd5e1' }}>
                        {record.churnRate}%
                      </td>
                      <td style={{ padding: '14px', color: '#94a3b8', fontFamily: 'monospace' }}>
                        R$ {record.adSpend.toLocaleString('pt-BR')}
                      </td>
                      <td style={{ padding: '14px', color: '#10b981', fontWeight: 700, fontFamily: 'monospace' }}>
                        R$ {record.netProfit.toLocaleString('pt-BR')}
                      </td>
                      <td style={{ padding: '14px', color: '#fbbf24', fontWeight: 600 }}>
                        {record.profitMargin}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* 4. Deep Dive do Mês Selecionado */}
        <div
          style={{
            marginTop: '28px',
            padding: '22px',
            borderRadius: '14px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} style={{ color: '#f59e0b' }} />
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                Detalhamento Operacional: {currentMonthData.fullName}
              </h4>
            </div>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              Alunos Ativos Acumulados no Mês: <strong style={{ color: '#ffffff' }}>{currentMonthData.activeStudentsTotal}</strong>
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px'
            }}
          >
            {/* Box Faturamento do Mês */}
            <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Receita Bruta</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
                R$ {currentMonthData.revenue.toLocaleString('pt-BR')}
              </div>
              <span style={{ fontSize: '0.72rem', color: '#10b981' }}>MRR: R$ {currentMonthData.mrr.toLocaleString('pt-BR')}</span>
            </div>

            {/* Box Novas Matrículas */}
            <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <span style={{ fontSize: '0.74rem', color: '#a7f3d0' }}>Novos Alunos</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981', marginTop: '2px' }}>
                +{currentMonthData.newStudents} alunos
              </div>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Ticket Médio: R$ 386</span>
            </div>

            {/* Box Cancelamentos & Churn */}
            <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <span style={{ fontSize: '0.74rem', color: '#fca5a5' }}>Cancelamentos</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f87171', marginTop: '2px' }}>
                -{currentMonthData.cancellations} ({currentMonthData.churnRate}%)
              </div>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{currentMonthData.refunds} reembolso solicitado</span>
            </div>

            {/* Box Gasto com Tráfego & ROAS */}
            <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <span style={{ fontSize: '0.74rem', color: '#fde68a' }}>Investimento em Tráfego</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fbbf24', marginTop: '2px' }}>
                R$ {currentMonthData.adSpend.toLocaleString('pt-BR')}
              </div>
              <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>ROAS: {currentMonthData.roas}x</span>
            </div>

            {/* Box Lucro Líquido */}
            <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.06)', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
              <span style={{ fontSize: '0.74rem', color: '#a5f3fc' }}>Lucro Líquido Real</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#22d3ee', marginTop: '2px' }}>
                R$ {currentMonthData.netProfit.toLocaleString('pt-BR')}
              </div>
              <span style={{ fontSize: '0.72rem', color: '#fbbf24' }}>Margem: {currentMonthData.profitMargin}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Composição de Receita por Plano & Análise dos Motivos de Cancelamento */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px'
        }}
      >
        {/* Distribuição de Faturamento por Plano */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
            <PieChart size={18} style={{ color: '#f59e0b' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
              Composição da Receita por Plano
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span style={{ color: '#f8fafc', fontWeight: 600 }}>Plano Pro Master (Recorrência R$ 89,90)</span>
                <strong style={{ color: '#f59e0b' }}>R$ 70.122 / mês (55%)</strong>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: '55%', height: '100%', background: '#f59e0b' }}></div>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Maior LTV e engajamento devido às lives semanais.</span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span style={{ color: '#f8fafc', fontWeight: 600 }}>Plano Essencial (Acesso Completo R$ 497)</span>
                <strong style={{ color: '#64748b' }}>R$ 43.344 / mês (34%)</strong>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: '34%', height: '100%', background: '#64748b' }}></div>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Excelente porta de entrada para fotógrafos iniciantes.</span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span style={{ color: '#f8fafc', fontWeight: 600 }}>Plano Master & Consultoria 1-a-1 (R$ 1.790)</span>
                <strong style={{ color: '#10b981' }}>R$ 14.020 / mês (11%)</strong>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: '11%', height: '100%', background: '#10b981' }}></div>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Alta margem (92%) com mentoria executiva individual.</span>
            </div>
          </div>
        </div>

        {/* Análise de Cancelamentos (Churn Analysis & Motivos) */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserMinus size={18} style={{ color: '#ef4444' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
                Motivos de Cancelamento (Churn)
              </h3>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '6px' }}>
              Retenção de 98.1%
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span style={{ color: '#cbd5e1' }}>Falta de tempo na rotina diária para praticar</span>
                <span style={{ color: '#ef4444', fontWeight: 700 }}>42% dos casos</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px' }}>
                <div style={{ width: '42%', height: '100%', background: '#ef4444', borderRadius: '9999px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span style={{ color: '#cbd5e1' }}>Dificuldade financeira temporária</span>
                <span style={{ color: '#f59e0b', fontWeight: 700 }}>28% dos casos</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px' }}>
                <div style={{ width: '28%', height: '100%', background: '#f59e0b', borderRadius: '9999px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span style={{ color: '#cbd5e1' }}>Mudança de foco profissional / transição</span>
                <span style={{ color: '#64748b', fontWeight: 700 }}>18% dos casos</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px' }}>
                <div style={{ width: '18%', height: '100%', background: '#64748b', borderRadius: '9999px' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span style={{ color: '#cbd5e1' }}>Outros motivos / imprevistos com equipamento</span>
                <span style={{ color: '#64748b', fontWeight: 700 }}>12% dos casos</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '9999px' }}>
                <div style={{ width: '12%', height: '100%', background: '#64748b', borderRadius: '9999px' }}></div>
              </div>
            </div>

            <div
              style={{
                marginTop: '10px',
                padding: '12px',
                borderRadius: '8px',
                background: 'rgba(16, 185, 129, 0.06)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                fontSize: '0.78rem',
                color: '#a7f3d0'
              }}
            >
              🛡️ <strong>Ação Anti-Churn Ativa:</strong> A opção de pausa temporária de 30 dias na assinatura resgatou 38% dos alunos que pretendiam cancelar este trimestre.
            </div>
          </div>
        </div>
      </div>

      {/* 6. Simulador de Crescimento & Forecast Q4 */}
      <div
        className="glass-panel"
        style={{
          padding: '28px',
          background: 'linear-gradient(135deg, rgba(20, 28, 42, 0.9) 0%, rgba(13, 18, 27, 0.95) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.2)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} style={{ color: '#f59e0b' }} />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
                Simulador de Escala & Projeção Financeira
              </h3>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: '2px' }}>
              Simule o impacto de novas campanhas de tráfego na receita mensal e no faturamento do curso.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {[10, 20, 35, 50].map((pct) => (
              <button
                key={pct}
                onClick={() => setTargetGrowth(pct)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  background: targetGrowth === pct ? '#f59e0b' : 'rgba(255, 255, 255, 0.05)',
                  color: targetGrowth === pct ? '#07090d' : '#cbd5e1',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.2s'
                }}
              >
                +{pct}%
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Resultados da Simulação */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
          }}
        >
          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Receita Mensal Projetada</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
              R$ {projectedRevenue.toLocaleString('pt-BR')}
            </div>
            <span style={{ fontSize: '0.74rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
              <ArrowUpRight size={13} /> +R$ {(projectedRevenue - currentMonthData.revenue).toLocaleString('pt-BR')} adicionais
            </span>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Novos Alunos / Mês</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>
              {projectedStudents} matrículas
            </div>
            <span style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '2px' }}>
              +{projectedStudents - currentMonthData.newStudents} acima da média atual
            </span>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Lucro Líquido Adicional</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
              +R$ {additionalProfit.toLocaleString('pt-BR')}
            </div>
            <span style={{ fontSize: '0.74rem', color: '#10b981', marginTop: '2px' }}>
              Mantendo margem operacional de 76%
            </span>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Investimento em Ads Sugerido</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#60a5fa', marginTop: '4px' }}>
              R$ {Math.round(currentMonthData.adSpend * (1 + targetGrowth / 100)).toLocaleString('pt-BR')}
            </div>
            <span style={{ fontSize: '0.74rem', color: '#60a5fa', marginTop: '2px' }}>
              ROAS projetado sustentável em ~5.8x
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
