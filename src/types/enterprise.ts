export type PixStatus = "paid" | "pending" | "expired" | "canceled";

export interface PixTransaction {
  id: string;
  txid: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  amount: number;
  status: PixStatus;
  qrCodeUrl: string;
  copyPasteCode: string;
  createdAt: string;
  expiresAt: string;
  paidAt?: string;
  origin: string;
  campaign: string;
  product: string;
  provider: string;
}

export type LeadStage = "lead" | "qualified" | "opportunity" | "pix_generated" | "won" | "lost";

export interface CrmLead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  stage: LeadStage;
  value: number;
  score: number;
  owner: string;
  origin: string;
  campaign: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  lastInteraction: string;
  pixCount?: number;
}

export interface WorkflowNode {
  id: string;
  label: string;
  type: "trigger" | "condition" | "action" | "integration";
  service: "n8n" | "pix" | "crm" | "ai" | "email";
  status: "ok" | "pending" | "failed";
  x: number;
  y: number;
  description?: string;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  trigger: string;
  status: "active" | "inactive" | "error";
  executionsCount: number;
  successRate: number;
  avgDurationMs: number;
  lastExecution: string;
  nodes: WorkflowNode[];
}

export type AgentRole = "sales" | "support" | "finance" | "recovery" | "scheduling" | "manager";

export interface CognitiveAgent {
  id: string;
  role: AgentRole;
  name: string;
  title: string;
  description: string;
  activeConversations: number;
  resolvedToday: number;
  accuracyRate: number;
  status: "idle" | "active" | "busy";
  authorizedTools: string[];
}

export interface CognitiveMessage {
  id: string;
  agentId: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  toolUsed?: string;
}