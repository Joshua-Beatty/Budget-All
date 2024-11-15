type Transaction = {
    account_id: string; // The id of the account that the transaction belongs to
    amount: string; // The signed amount of the transaction as a string
    date: string; // The ISO 8601 date of the transaction
    description: string; // The unprocessed transaction description as it appears on the bank statement
    details: {
      processing_status: 'pending' | 'complete'; // Indicates the transaction enrichment processing status
      category?: string | null; // The category that the transaction belongs to
      counterparty?: {
        name?: string | null; // The processed counterparty name
        type?: 'organization' | 'person' | null; // The counterparty type
      };
    };
    status: 'posted' | 'pending'; // The transaction's status
    id: string; // The id of the transaction itself
    links: {
      self: string; // A self link to the transaction
      account: string; // A link to the account that the transaction belongs to
    };
    running_balance?: string | null; // The running balance of the account that the transaction belongs to
    type: string; // The type code of the transaction, e.g., card_payment
  };

  type TransactionFlat = {
    account_id: string;
    amount: string;
    date: string;
    description: string;
    "details.processing_status": 'pending' | 'complete';
    "details.category"?: string | null;
    "details.counterparty.name"?: string | null;
    "details.counterparty.type"?: 'organization' | 'person' | null;
    status: 'posted' | 'pending';
    id: string;
    "links.self": string;
    "links.account": string;
    "running_balance"?: string | null;
    type: string;
  };
  