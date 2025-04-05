"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ResultsProps {
  finalAmount?: number
  monthlyAmount?: number
  payOffDate?: {
    month: number
    year: number
  }
  message?: string
  disclaimer?: string
}

export function Results({ finalAmount, monthlyAmount, payOffDate, message, disclaimer }: ResultsProps) {
  return (
    <Card className="w-full max-w-lg mt-4">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Results</CardTitle>
      </CardHeader>
      <CardContent>
        {payOffDate ? (
          <div className="text-center space-y-2">
            <p className="text-lg">You will pay off your loan in:</p>
            <p className="text-2xl font-bold">
              {payOffDate.month}/{payOffDate.year}
            </p>
          </div>
        ) : (
          <div className="text-center space-y-2">
            <p className="text-lg">{message}</p>
            <p className="text-2xl font-bold">
              ${finalAmount?.toLocaleString()}
            </p>
            {monthlyAmount !== undefined && (
              <>
                <p className="text-lg mt-4">Monthly you need to save:</p>
                <p className="text-2xl font-bold">
                  ${monthlyAmount.toLocaleString()}
                </p>
              </>
            )}
            {disclaimer && (
              <p className="text-sm text-gray-500 mt-4">{disclaimer}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
} 