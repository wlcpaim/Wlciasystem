export type UserRole = "admin" | "manager" | "cashier";

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  lastLogin: string;
}

export type DbStatus = "connected" | "connecting" | "offline" | "syncing";

export interface DatabaseConfig {
  provider: "Lovable Cloud" | "Supabase" | "PostgreSQL" | "Local SQLite";
  endpoint: string;
  databaseName: string;
  ssl: boolean;
  status: DbStatus;
  latencyMs: number;
  autoSync: boolean;
  lastSync: string;
  tables: {
    name: string;
    rowCount: number;
    sizeKb: number;
  }[];
}

export interface PdvProduct {
  id: string;
  sku: string;
  name: string;
  category: "Software" | "Licença" | "Terminal" | "Serviço" | "Hardware";
  price: number;
  stock: number;
  description: string;
  badge?: string;
}

export interface CartItem {
  product: PdvProduct;
  quantity: number;
  discountPercent?: number;
}

export type PaymentMethod = "pix" | "credit" | "debit" | "cash";

export interface PdvSale {
  id: string;
  code: string;
  date: string;
  cashierName: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: "completed" | "processing" | "refunded";
  cashReceived?: number;
  changeGiven?: number;
  customerDocument?: string;
}

export interface SaasSubscription {
  id: string;
  customerName: string;
  customerEmail: string;
  plan: "Starter" | "Professional" | "Enterprise";
  mrr: number;
  status: "active" | "trial" | "past_due" | "cancelled";
  billingCycle: "monthly" | "yearly";
  nextBillingDate: string;
}