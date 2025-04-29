import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Results } from "./Results";

const formSchema = z.object({
  loanBalance: z.string(),
  payment: z.string(),
  interest: z.string(),
});

export default function LoanCalculator() {
  const [result, setResult] = React.useState<{
    payOffDate: { month: number; year: number };
  } | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loanBalance: "",
      payment: "",
      interest: "",
    },
  });

  function getMonthAndYear(months: number) {
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    currentMonth += months;
    currentYear += Math.floor(currentMonth / 12);
    currentMonth = currentMonth % 12;
    return {
      month: Math.round(currentMonth + 1),
      year: currentYear,
    };
  }

  function calculateLoan(values: z.infer<typeof formSchema>) {
    try {
      const m = parseInt(values.payment);
      const R = parseFloat(values.interest);
      const p = parseInt(values.loanBalance);
      const r = R / 12 / 100;

      let n = Math.log(m / (m - p * r)) / Math.log(1 + r);

      const futureDate = getMonthAndYear(n);

      setResult({
        payOffDate: futureDate,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    calculateLoan(values);
  }

  return (
    <div className="w-full py-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Loan Calculator
          </CardTitle>
          <CardDescription className="text-center">
            Calculate when you will pay off your loan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="loanBalance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is the remaining loan balance?</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter balance"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="payment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is your monthly payment?</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What is your interest rate (%)?</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="Enter interest rate"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Calculate
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result !== null && (
        <Results finalAmount={0} payOffDate={result.payOffDate} />
      )}
    </div>
  );
}
