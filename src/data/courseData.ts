export interface Plan {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  tagline: string;
  priceMonthly: number;
  priceAnnualTotal: number;
  installments: string;
  features: string[];
  notIncluded?: string[];
  targetAudience: string;
  colorAccent: string;
}

export interface ModuleItem {
  id: number;
  title: string;
  duration: string;
  lessonsCount: number;
  description: string;
  lessons: { title: string; duration: string; completed?: boolean }[];
}

export interface LiveSession {
  id: string;
  title: string;
  instructor: string;
  date: string;
  time: string;
  status: 'upcoming' | 'live' | 'recorded';
  recordingUrl?: string;
  description: string;
  attendeesCount: number;
}

export interface StudyMaterial {
  id: string;
  title: string;
  type: 'PDF' | 'PRESET' | 'TEMPLATE' | 'CHECKLIST';
  size: string;
  category: string;
  downloadsCount: number;
  description: string;
}

export interface ConsultingSlot {
  id: string;
  studentName: string;
  studentEmail: string;
  date: string;
  time: string;
  topic: string;
  status: 'confirmed' | 'pending' | 'completed';
  notes?: string;
  portfolioLink?: string;
}

export const COURSE_PLANS: Plan[] = [
  {
    id: 'essencial',
    name: 'Plano Essencial',
    tagline: 'Para quem quer aprender no seu próprio ritmo com base sólida.',
    priceMonthly: 49.90,
    priceAnnualTotal: 497.00,
    installments: '12x de R$ 49,90',
    features: [
      'Acesso completo a +80 aulas gravadas em 4K',
      'Acesso por 12 meses na plataforma',
      'Materiais teóricos em PDF e guias de campo',
      'Pack com 15 Presets autorais Lightroom',
      'Exercícios práticos com gabaritos comentados',
      'Certificado de Conclusão reconhecido (60h)'
    ],
    notIncluded: [
      'Encontros ao vivo semanais',
      'Análise de fotos nas aulas ao vivo',
      'Consultoria individual 1-a-1'
    ],
    targetAudience: 'Iniciantes que buscam autonomia e querem dominar a câmera e a luz.',
    colorAccent: '#64748b'
  },
  {
    id: 'pro',
    name: 'Plano Pro Master',
    badge: 'Mais Escolhido',
    popular: true,
    tagline: 'O combo perfeito: aulas gravadas + mentoria em grupo ao vivo toda semana.',
    priceMonthly: 89.90,
    priceAnnualTotal: 897.00,
    installments: '12x de R$ 89,90',
    features: [
      'Tudo do Plano Essencial',
      'Aulas Ao Vivo Semanais pelo Zoom (com gravação salva)',
      'Análise de Portfólio ao vivo em grupo com o professor',
      'Comunidade VIP no Discord / WhatsApp para feedback',
      'Pack completo com +40 Presets & LUTs de vídeo',
      'Aulas exclusivas de Negócios, Vendas e Contratos',
      'Desafios práticos mensais com premiações'
    ],
    notIncluded: [
      'Consultoria particular exclusiva 1-a-1'
    ],
    targetAudience: 'Fotógrafos que querem acelerar resultados e ter contato direto com o mentor.',
    colorAccent: '#f59e0b'
  },
  {
    id: 'mentorship',
    name: 'Plano Master & Consultoria',
    badge: 'Vagas Limitadas (Apenas 10)',
    tagline: 'Aceleração máxima com 4 consultorias individuais exclusivas 1-a-1.',
    priceMonthly: 169.00,
    priceAnnualTotal: 1790.00,
    installments: '12x de R$ 169,00',
    features: [
      'Tudo do Plano Pro Master com acesso estendido de 2 anos',
      '4 Consultorias Individuais 1-a-1 de 60 min com o Fotógrafo',
      'Diagnóstico profundo do seu portfólio e posicionamento',
      'Plano de Ação de Carreira e Precificação personalizada',
      'Acesso direto no WhatsApp pessoal do mentor por 6 meses',
      'Revisão dos seus contratos e fluxo de trabalho comercial',
      'Indicação para freelas e rede de clientes parceiros'
    ],
    targetAudience: 'Profissionais ou aspirantes que desejam viver de fotografia e cobrar alto.',
    colorAccent: '#10b981'
  }
];

export const COURSE_MODULES: ModuleItem[] = [
  {
    id: 1,
    title: 'Módulo 1: Fundamentos & Desvendando a Câmera',
    duration: '4h 30min',
    lessonsCount: 8,
    description: 'Entenda de vez o triângulo de exposição (ISO, Abertura, Velocidade), fotometria, foco dinâmico e RAW.',
    lessons: [
      { title: 'Introdução e Configurações Otimizadas da Câmera', duration: '18:40', completed: true },
      { title: 'O Triângulo da Exposição sem Segredos', duration: '28:15', completed: true },
      { title: 'Lentes e Distâncias Focais: Como escolher o seu olhar', duration: '22:10', completed: true },
      { title: 'Modos de Fotometria e Histograma na Prática', duration: '25:40', completed: true },
      { title: 'Profundidade de Campo e o Bokeh Perfeito', duration: '20:15', completed: false }
    ]
  },
  {
    id: 2,
    title: 'Módulo 2: Domínio Absoluto da Luz (Natural e Artificial)',
    duration: '6h 15min',
    lessonsCount: 10,
    description: 'Como ler a luz natural, Golden Hour, luz dura de meio-dia, flashes speedlite, tochas e modificadores.',
    lessons: [
      { title: 'A Qualidade, Direção e Temperatura da Luz', duration: '31:00', completed: false },
      { title: 'Ensaio Externo: Dominando o Sol do Meio-Dia', duration: '42:20', completed: false },
      { title: 'Fotografia com Flash Dedicado (TTL vs Manual)', duration: '35:50', completed: false },
      { title: 'Esquemas de Iluminação de 1, 2 e 3 Pontos em Estúdio', duration: '48:10', completed: false }
    ]
  },
  {
    id: 3,
    title: 'Módulo 3: Composição, Narrativa Visual e Direção',
    duration: '5h 45min',
    lessonsCount: 9,
    description: 'Técnicas avançadas de enquadramento, psicologia das cores e como dirigir pessoas tímidas com naturalidade.',
    lessons: [
      { title: 'Regra dos Terços, Linhas-Guia e Espaço Negativo', duration: '26:30', completed: false },
      { title: 'Direção de Modelos e Clientes Não-Profissionais', duration: '39:15', completed: false },
      { title: 'Storytelling Visual: Contando Histórias em uma Sequência', duration: '33:45', completed: false }
    ]
  },
  {
    id: 4,
    title: 'Módulo 4: Pós-Produção de Alto Nível (Lightroom & Photoshop)',
    duration: '8h 20min',
    lessonsCount: 14,
    description: 'Fluxo profissional de importação, curadoria rápida, color grading autoral, separação de frequências e retoque de pele.',
    lessons: [
      { title: 'Fluxo de Curadoria e Catálogo no Lightroom', duration: '34:10', completed: false },
      { title: 'Color Grading: Criando sua Identidade de Cores', duration: '46:00', completed: false },
      { title: 'Retoque de Pele Comercial no Photoshop sem perder textura', duration: '52:30', completed: false }
    ]
  },
  {
    id: 5,
    title: 'Módulo 5: O Negócio da Fotografia (Precificação e Vendas)',
    duration: '5h 10min',
    lessonsCount: 8,
    description: 'Como atrair clientes ideais no Instagram, precificar por valor, redigir propostas irresistíveis e contratos blindados.',
    lessons: [
      { title: 'Como Calcular sua Hora Técnica e Margem de Lucro', duration: '38:00', completed: false },
      { title: 'Construção de Portfólio que Vende Sozinho', duration: '29:40', completed: false },
      { title: 'O Contrato Ideal: Evitando Dores de Cabeça', duration: '31:20', completed: false }
    ]
  }
];

export const UPCOMING_LIVES: LiveSession[] = [
  {
    id: 'live-1',
    title: 'Masterclass Ao Vivo: Análise de Fotos dos Alunos & Feedback Crucial',
    instructor: 'Lucas Andrade (Mentor)',
    date: 'Quarta-feira, 05 de Novembro',
    time: '20:00 (Horário de Brasília)',
    status: 'upcoming',
    description: 'Envie sua melhor foto da semana no grupo para ser analisada ao vivo na tela grande com correções de enquadramento e cor.',
    attendeesCount: 94
  },
  {
    id: 'live-2',
    title: 'Workshop Ao Vivo: Iluminação de Ensaio Feminino em Ambientes Fechados',
    instructor: 'Lucas Andrade & Convidada Especial',
    date: 'Quinta-feira, 13 de Novembro',
    time: '19:30 (Horário de Brasília)',
    status: 'upcoming',
    description: 'Transmissão direta do estúdio com duas câmeras mostrando a modelo e o setup de tochas e luz contínua.',
    attendeesCount: 128
  },
  {
    id: 'live-3',
    title: 'Gravação: Como Fechar Contratos de R$ 3.000 a R$ 8.000 em Eventos',
    instructor: 'Lucas Andrade',
    date: '28 de Outubro',
    time: 'Gravada',
    status: 'recorded',
    recordingUrl: '#',
    description: 'Sessão profunda sobre negociação, atendimento a noivas e clientes corporativos de alto padrão.',
    attendeesCount: 156
  }
];

export const STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-1',
    title: 'Guia de Bolso: O Triângulo de Exposição e Fotometria Rápida',
    type: 'PDF',
    size: '14.2 MB',
    category: 'Material Teórico',
    downloadsCount: 1420,
    description: 'Diagrama ilustrado com tabelas de correspondência para consultar no celular durante seus ensaios.'
  },
  {
    id: 'mat-2',
    title: 'Pack de Presets Lumina Signature (Lightroom & Camera Raw)',
    type: 'PRESET',
    size: '4.8 MB',
    category: 'Edição & Cores',
    downloadsCount: 2310,
    description: '15 presets autorais para pele natural, tons dourados em externas e preto & branco contrastado.'
  },
  {
    id: 'mat-3',
    title: 'Modelo de Contrato de Prestação de Serviços Fotográficos',
    type: 'TEMPLATE',
    size: '1.2 MB',
    category: 'Negócios & Jurídico',
    downloadsCount: 890,
    description: 'Documento editável em Word elaborado por advogados especializados em direito autoral e imagem.'
  },
  {
    id: 'mat-4',
    title: 'Checklist Pré-Ensaio: Equipamentos, Baterias e Direção',
    type: 'CHECKLIST',
    size: '2.1 MB',
    category: 'Produção',
    downloadsCount: 1150,
    description: 'Lista essencial para nunca mais esquecer cartões formatados, pilhas extras ou combinados com o cliente.'
  }
];

export const CONSULTING_SESSIONS: ConsultingSlot[] = [
  {
    id: 'c-1',
    studentName: 'Mariana Silveira',
    studentEmail: 'mariana.foto@gmail.com',
    date: '06/11/2026',
    time: '14:00 - 15:00',
    topic: 'Transição de Carreira para Fotografia de Família e Parto',
    status: 'confirmed',
    notes: 'Precisa definir tabela de preços e rever 20 fotos selecionadas do primeiro ensaio.',
    portfolioLink: 'https://instagram.com/marianafotografia'
  },
  {
    id: 'c-2',
    studentName: 'Rafael Guimarães',
    studentEmail: 'rafa.guimaraes@outlook.com',
    date: '07/11/2026',
    time: '10:00 - 11:00',
    topic: 'Setup de Iluminação de Estúdio & Color Grading Comercial',
    status: 'confirmed',
    notes: 'Comprou tochas Godox recentemente e quer montar esquemas de beleza/editorial.',
    portfolioLink: 'https://behance.net/rafaelguimaraes'
  },
  {
    id: 'c-3',
    studentName: 'Camila Albuquerque',
    studentEmail: 'camila.albuquerque@yahoo.com',
    date: '10/11/2026',
    time: '16:30 - 17:30',
    topic: 'Estratégia de Marketing e Propostas para Casamentos 2027',
    status: 'pending',
    notes: 'Quer dobrar o ticket médio de seus pacotes atuais.',
    portfolioLink: 'https://camilaalbuquerque.com.br'
  }
];

export const STUDENTS_LIST = [
  {
    id: 'std-101',
    name: 'Mariana Silveira',
    email: 'mariana.foto@gmail.com',
    plan: 'Plano Master & Consultoria',
    progress: 74,
    joinedDate: '15/09/2026',
    status: 'Ativo',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    consultingsUsed: 2,
    consultingsTotal: 4
  },
  {
    id: 'std-102',
    name: 'Rafael Guimarães',
    email: 'rafa.guimaraes@outlook.com',
    plan: 'Plano Master & Consultoria',
    progress: 58,
    joinedDate: '02/10/2026',
    status: 'Ativo',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    consultingsUsed: 1,
    consultingsTotal: 4
  },
  {
    id: 'std-103',
    name: 'Beatriz Fontes',
    email: 'beatriz.fontes@gmail.com',
    plan: 'Plano Pro Master',
    progress: 92,
    joinedDate: '18/08/2026',
    status: 'Ativo',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    consultingsUsed: 0,
    consultingsTotal: 0
  },
  {
    id: 'std-104',
    name: 'Thiago Mendes',
    email: 'thiago.mendes.photo@gmail.com',
    plan: 'Plano Pro Master',
    progress: 43,
    joinedDate: '24/10/2026',
    status: 'Ativo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    consultingsUsed: 0,
    consultingsTotal: 0
  },
  {
    id: 'std-105',
    name: 'Camila Albuquerque',
    email: 'camila.albuquerque@yahoo.com',
    plan: 'Plano Master & Consultoria',
    progress: 65,
    joinedDate: '12/10/2026',
    status: 'Ativo',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    consultingsUsed: 1,
    consultingsTotal: 4
  },
  {
    id: 'std-106',
    name: 'Lucas Vianna',
    email: 'lucas.vianna.f@gmail.com',
    plan: 'Plano Essencial',
    progress: 88,
    joinedDate: '05/07/2026',
    status: 'Ativo',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    consultingsUsed: 0,
    consultingsTotal: 0
  }
];

export interface MonthFinancialRecord {
  month: string;
  fullName: string;
  revenue: number;
  newStudents: number;
  cancellations: number;
  refunds: number;
  netStudents: number;
  activeStudentsTotal: number;
  churnRate: number;
  mrr: number;
  adSpend: number;
  netProfit: number;
  profitMargin: number;
  roas: number;
}

export const FINANCIAL_MONTHLY_DATA: MonthFinancialRecord[] = [
  {
    month: 'Jan',
    fullName: 'Janeiro 2026',
    revenue: 38200,
    newStudents: 28,
    cancellations: 4,
    refunds: 1,
    netStudents: 24,
    activeStudentsTotal: 1210,
    churnRate: 1.8,
    mrr: 32100,
    adSpend: 6800,
    netProfit: 27900,
    profitMargin: 73.0,
    roas: 5.6
  },
  {
    month: 'Fev',
    fullName: 'Fevereiro 2026',
    revenue: 39800,
    newStudents: 30,
    cancellations: 3,
    refunds: 1,
    netStudents: 27,
    activeStudentsTotal: 1237,
    churnRate: 1.5,
    mrr: 34200,
    adSpend: 7100,
    netProfit: 29200,
    profitMargin: 73.4,
    roas: 5.6
  },
  {
    month: 'Mar',
    fullName: 'Março 2026',
    revenue: 42500,
    newStudents: 34,
    cancellations: 5,
    refunds: 2,
    netStudents: 29,
    activeStudentsTotal: 1266,
    churnRate: 1.9,
    mrr: 37100,
    adSpend: 7500,
    netProfit: 31500,
    profitMargin: 74.1,
    roas: 5.7
  },
  {
    month: 'Abr',
    fullName: 'Abril 2026',
    revenue: 44100,
    newStudents: 36,
    cancellations: 4,
    refunds: 1,
    netStudents: 32,
    activeStudentsTotal: 1298,
    churnRate: 1.7,
    mrr: 39800,
    adSpend: 7900,
    netProfit: 32900,
    profitMargin: 74.6,
    roas: 5.6
  },
  {
    month: 'Mai',
    fullName: 'Maio 2026',
    revenue: 46900,
    newStudents: 39,
    cancellations: 5,
    refunds: 2,
    netStudents: 34,
    activeStudentsTotal: 1332,
    churnRate: 1.9,
    mrr: 42600,
    adSpend: 8200,
    netProfit: 35100,
    profitMargin: 74.8,
    roas: 5.7
  },
  {
    month: 'Jun',
    fullName: 'Junho 2026',
    revenue: 48900,
    newStudents: 41,
    cancellations: 6,
    refunds: 2,
    netStudents: 35,
    activeStudentsTotal: 1367,
    churnRate: 2.1,
    mrr: 45400,
    adSpend: 8500,
    netProfit: 36800,
    profitMargin: 75.3,
    roas: 5.8
  },
  {
    month: 'Jul',
    fullName: 'Julho 2026',
    revenue: 50400,
    newStudents: 38,
    cancellations: 5,
    refunds: 1,
    netStudents: 33,
    activeStudentsTotal: 1400,
    churnRate: 1.8,
    mrr: 48100,
    adSpend: 8600,
    netProfit: 38200,
    profitMargin: 75.8,
    roas: 5.9
  },
  {
    month: 'Ago',
    fullName: 'Agosto 2026',
    revenue: 51800,
    newStudents: 40,
    cancellations: 6,
    refunds: 2,
    netStudents: 34,
    activeStudentsTotal: 1434,
    churnRate: 2.0,
    mrr: 50800,
    adSpend: 8900,
    netProfit: 39400,
    profitMargin: 76.1,
    roas: 5.8
  },
  {
    month: 'Set',
    fullName: 'Setembro 2026',
    revenue: 53600,
    newStudents: 45,
    cancellations: 7,
    refunds: 2,
    netStudents: 38,
    activeStudentsTotal: 1472,
    churnRate: 2.2,
    mrr: 53100,
    adSpend: 9100,
    netProfit: 40900,
    profitMargin: 76.3,
    roas: 5.9
  },
  {
    month: 'Out',
    fullName: 'Outubro 2026 (Atual)',
    revenue: 54820,
    newStudents: 42,
    cancellations: 5,
    refunds: 1,
    netStudents: 37,
    activeStudentsTotal: 1509,
    churnRate: 1.9,
    mrr: 54820,
    adSpend: 9240,
    netProfit: 42150,
    profitMargin: 76.9,
    roas: 5.93
  }
];

