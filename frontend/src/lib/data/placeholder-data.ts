import type { DataQueryResult, DocumentQueryResult, RecentQuery, SavedPrompt } from "../types"

export const sampleDataQuestions = [
  "What were our total sales last quarter?",
  "Show me the top 10 customers by revenue",
  "How many orders were placed in the last 30 days?",
  "What is the average order value by region?",
  "List products with inventory below 100 units"
]

export const sampleDocumentQuestions = [
  "What is our return policy?",
  "How do I request time off?",
  "What are the security protocols for data access?",
  "Explain the onboarding process for new employees",
  "What are the guidelines for expense reimbursement?"
]

export const placeholderDataResult: DataQueryResult = {
  summary: "The total sales for Q4 2025 amounted to $2,847,392 across 1,247 orders. This represents a 15% increase compared to Q3 2025. The top performing category was Electronics with $892,000 in sales, followed by Home & Garden at $567,000.",
  sql: `SELECT 
  DATE_TRUNC('month', order_date) as month,
  SUM(total_amount) as total_sales,
  COUNT(*) as order_count
FROM orders
WHERE order_date >= '2025-10-01' 
  AND order_date < '2026-01-01'
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month;`,
  columns: ["month", "total_sales", "order_count", "avg_order_value"],
  data: [
    { month: "October 2025", total_sales: "$892,145", order_count: 412, avg_order_value: "$2,166" },
    { month: "November 2025", total_sales: "$1,023,847", order_count: 487, avg_order_value: "$2,102" },
    { month: "December 2025", total_sales: "$931,400", order_count: 348, avg_order_value: "$2,676" }
  ]
}

export const placeholderDocumentResult: DocumentQueryResult = {
  question: "What is our return policy?",
  answer: "Our return policy allows customers to return most items within 30 days of purchase for a full refund. Items must be in their original packaging and in unused condition. Some exceptions apply:\n\n• Electronics must be returned within 15 days\n• Clearance items are final sale\n• Custom orders cannot be returned\n\nTo initiate a return, customers can use the self-service portal or contact customer support. Refunds are processed within 5-7 business days after the item is received.",
  metadata: {
    model: "GPT-4 Turbo",
    responseTime: "1.2s",
    confidence: "High"
  },
  sources: [
    {
      id: "src-1",
      label: "Return Policy Guidelines.pdf",
      score: 0.95,
      chunkText: "Standard return window is 30 days from purchase date. Items must be unused and in original packaging. Electronics have a reduced 15-day return window due to rapid depreciation and technology updates.",
      metadata: {
        department: "Customer Service",
        lastUpdated: "2025-01-15",
        version: "2.3"
      }
    },
    {
      id: "src-2",
      label: "Customer FAQ Database",
      score: 0.87,
      chunkText: "Q: How do I return an item? A: Visit our self-service portal at returns.company.com or contact customer support at 1-800-RETURNS. Have your order number ready for faster processing.",
      metadata: {
        department: "Support",
        lastUpdated: "2025-02-01",
        version: "1.8"
      },
      imageUrl: "/placeholder.svg?height=150&width=200"
    },
    {
      id: "src-3",
      label: "Refund Processing Manual",
      score: 0.82,
      chunkText: "Refund timeline: Once an item is received at our warehouse, quality inspection takes 1-2 business days. Approved refunds are processed within 3-5 business days after inspection.",
      metadata: {
        department: "Finance",
        lastUpdated: "2024-12-10",
        version: "3.1"
      }
    }
  ]
}

export const placeholderRecentQueries: RecentQuery[] = [
  { id: "rq-1", query: "Total revenue by product category", type: "data", timestamp: new Date(Date.now() - 3600000) },
  { id: "rq-2", query: "What is the vacation policy?", type: "document", timestamp: new Date(Date.now() - 7200000) },
  { id: "rq-3", query: "Orders pending shipment", type: "data", timestamp: new Date(Date.now() - 86400000) },
  { id: "rq-4", query: "IT security guidelines", type: "document", timestamp: new Date(Date.now() - 172800000) }
]

export const placeholderSavedPrompts: SavedPrompt[] = [
  { id: "sp-1", name: "Monthly Sales Report", prompt: "Show monthly sales totals for the current year", type: "data" },
  { id: "sp-2", name: "HR Policies", prompt: "What are the key HR policies I should know?", type: "document" },
  { id: "sp-3", name: "Inventory Check", prompt: "List all products with low inventory levels", type: "data" }
]

export const usageTips = [
  "Be specific with dates and time ranges for better results",
  "Use natural language - the system understands context",
  "Save frequently used queries for quick access",
  "Check source confidence scores for document answers"
]
