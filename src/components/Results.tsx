import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

interface ResultsProps {
  finalAmount?: number;
  monthlyAmount?: number;
  payOffDate?: {
    month: number;
    year: number;
  };
  message?: string;
  disclaimer?: string;
}

export function Results({
  finalAmount,
  monthlyAmount,
  payOffDate,
  message,
  disclaimer,
}: ResultsProps) {
  return (
    <div className="flex justify-center mt-6">
      <Card className="w-fit max-w-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-center">Results</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {payOffDate ? (
            <div className="text-center">
              <p className="text-sm">You will pay off your loan in:</p>
              <p className="text-lg font-bold">
                {payOffDate.month}/{payOffDate.year}
              </p>
            </div>
          ) : (
            <div className="text-center">
              {message && <p className="text-sm">{message}</p>}
              {finalAmount !== undefined && (
                <p className="text-lg font-bold">
                  ${finalAmount.toLocaleString()}
                </p>
              )}
              {monthlyAmount !== undefined && (
                <>
                  <p className="text-sm mt-2">Monthly you need to save:</p>
                  <p className="text-lg font-bold">
                    ${monthlyAmount.toLocaleString()}
                  </p>
                </>
              )}
              {disclaimer && (
                <p className="text-xs text-gray-500 mt-2">{disclaimer}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
