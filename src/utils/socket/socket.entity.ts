export class NewMessageDTO {
    receiver_id: number;
    sender_id: number;
    message: string;
    session_id?: number;
    newChat: boolean;
}
export class TreatmentDTO {
    name: string;
    description: string;
    id: number;
    icon: string;
    selected: boolean;
    status: number;
    user_id: number;
}
export class PendingPaymentDTO {
    user_id: number;
}