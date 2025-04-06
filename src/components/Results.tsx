import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

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
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle className="text-xl text-center">Results</CardTitle>
      </CardHeader>
      <CardContent>
        {payOffDate ? (
          <div className="text-center space-y-2">
            <p className="text-base">You will pay off your loan in:</p>
            <p className="text-xl font-bold">
              {payOffDate.month}/{payOffDate.year}
            </p>
          </div>
        ) : (
          <div className="text-center space-y-2">
            <p className="text-base">{message}</p>
            <p className="text-xl font-bold">
              ${finalAmount?.toLocaleString()}
            </p>
            {monthlyAmount !== undefined && (
              <>
                <p className="text-base mt-4">Monthly you need to save:</p>
                <p className="text-xl font-bold">
                  ${monthlyAmount.toLocaleString()}
                </p>
              </>
            )}
            {disclaimer && (
              <p className="text-xs text-gray-500 mt-4">{disclaimer}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}