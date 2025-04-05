"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Results } from "./Results"

const formSchema = z.object({
  spend: z.string(),
  years: z.string(),
  saved: z.string(),
})

export default function NeedCalculator() {
  const [result, setResult] = React.useState<{ finalAmount: number; monthlyAmount: number } | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      years: "",
      saved: "",
      spend: "",
    },
  })

  function calculateNeeded(values: z.infer<typeof formSchema>) {
    try {
      const m = parseInt(values.spend) // Monthly spending
      const n = parseInt(values.years) // Years until retirement
      const p = parseInt(values.saved) // Current savings
      const i = 8/100

      // Calculate total needed at retirement (monthly spending * 12.5)
      const final = m * 12.5

      // Calculate monthly interest rate
      const one = i/12
      const two = 1 + one
      const three = n * 12
      const four = two ** three
      const five = p * four
      const six = final - five
      const seven = six * one
      const eight = four - 1
      const nine = seven / eight
      let R = nine

      // Ensure monthly amount is not negative
      if (R < 0) {
        R = 0
      }

      setResult({
        finalAmount: final,
        monthlyAmount: R
      })
    } catch (error) {
      console.error(error)
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    calculateNeeded(values)
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">How Much Do I Need?</CardTitle>
        </CardHeader>
        <CardDescription className="text-center">Calculate how much you will need during retirement</CardDescription>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="spend"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How much will you spend in retirement (Monthly)?</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter monthly spending" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="years"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How many years until you retire?</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter years" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="saved"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>How much do you have saved so far?</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter current savings" {...field} />
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
        <Results 
          finalAmount={result.finalAmount}
          monthlyAmount={result.monthlyAmount}
          message="If you invest in S&P 500, at retirement you will need:"
          disclaimer="*Disclaimer: This value is an estimate based on an average 8% return rate. Actual returns, may vary."
        />
      )}
    </div>
  )
}