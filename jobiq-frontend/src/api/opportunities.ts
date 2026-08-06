import { apiGet } from "./client";

export type Opportunity = {
  id: number;
  title: string;
  company: string;
  location?: string;
  description?: string;
  source_url?: string;
};

export async function getOpportunities() {
  return apiGet<{ items: Opportunity[] }>("/opportunities");
}
