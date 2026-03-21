"use client"

import { Lightbulb } from "lucide-react"
import { Button } from "../ui/button"

interface SampleQuestionsProps {
  questions: string[]
  onSelect: (question: string) => void
  disabled?: boolean
}

export function SampleQuestions({ questions, onSelect, disabled }: SampleQuestionsProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Lightbulb className="h-4 w-4" />
        <span>Try a sample question</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {questions.slice(0, 4).map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="h-auto whitespace-normal py-2 text-left text-xs"
            onClick={() => onSelect(question)}
            disabled={disabled}
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  )
}
