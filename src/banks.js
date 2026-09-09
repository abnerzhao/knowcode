export const BANKS = [
  { id: 'hot100', name: 'HOT 100', count: 100, file: 'questions.json', plan: 'top-100-liked' },
  { id: 'interview150', name: '面试经典 150', count: 150, file: 'interview150.json', plan: 'top-interview-150' },
  { id: 'offer', name: '剑指 Offer', count: 75, file: 'offer.json', plan: 'coding-interviews' },
  { id: 'scenarios', name: '场景实战', count: 20, file: 'scenarios.json', kind: 'discussion' },
  { id: 'system-design', name: '系统设计', count: 20, file: 'system-design.json', kind: 'discussion' },
  { id: 'devops-sre', name: 'DevOps / SRE', count: 61, file: 'devops-sre.json', kind: 'discussion' },
  { id: 'data-middleware', name: '数据与中间件', count: 80, file: 'data-middleware.json', kind: 'discussion' },
  { id: 'os-network', name: '操作系统与网络', count: 60, file: 'os-network.json', kind: 'discussion' },
];

export function bankById(id) {
  return BANKS.find(bank => bank.id === id);
}

export function storageKey(bankId) {
  return bankId === 'hot100' ? 'hot100-review:v1' : `hot100-review:v1:${bankId}`;
}
