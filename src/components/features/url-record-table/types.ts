export type SortDirection = 'asc' | 'desc';

export type TableHeaderWidth = 'small' | 'medium' | 'large' | 'xl';

export type SortableFields = 'createdAt' | 'lastVisitedAt' | 'visitCount' | 'expiresAt';

export type TableHeader = { id: string; isSortable: boolean; label: string; width: TableHeaderWidth };
