// types/letter.types.ts
export interface LetterType {
    id: string;
    title: string;
    description: string;
    estimatedTime: string;
    icon?: React.ReactNode;
}

export interface LetterSubmission {
    letterTypeId: string;
    purpose: string;
    additionalInfo: string;
    notes: string;
}
