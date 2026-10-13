interface DemoLeadEvent {
  id: string;
  type: string;
  createdAt: string;
}

const STORAGE_KEY = 'vera_estates_demo_events';

/** Record only that a demo form was tested. Never persist names, emails, phone numbers, or messages. */
export function saveDemoLead(type: string): boolean {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const existing: DemoLeadEvent[] = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(existing)) return false;
    existing.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      type,
      createdAt: new Date().toISOString(),
    });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    return true;
  } catch {
    return false;
  }
}
