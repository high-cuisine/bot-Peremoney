export interface LeadGenerationWithUser {
    id: number;
    userId: number;
    companyNameForCalling: string;
    projectName: string;
    competitorId: number;
    maxCount: number;
    dailyCount: number;
    auto: boolean;
    calling: boolean;
    telegramInviting: boolean;
    telegramMailing: boolean;
    user: {
        telegramId: bigint;
        username: string;
    }
}
